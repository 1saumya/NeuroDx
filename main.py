print("Starting the script...")
import warnings
warnings.filterwarnings("ignore", category=UserWarning, message=".*weights.*")
import os
import pandas as pd
import joblib
from fastapi import FastAPI, UploadFile, File
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
from fastapi.responses import JSONResponse
import numpy as np
from PIL import Image
import torch
import torchvision.transforms as transforms
from torchvision import models
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change to frontend URL for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load the trained Random Forest model for symptoms-based prediction
rf_model = joblib.load("rf_model.pkl")  # Random Forest model for symptoms
label_encoder = joblib.load("label_encoder.pkl")  # The label encoder for diseases
vectorizer = joblib.load("vectorizer.pkl")  # The vectorizer (CountVectorizer)

# Load the trained CNN model for image-based prediction
cnn_model = models.resnet18(pretrained=True)
cnn_model.fc = torch.nn.Linear(cnn_model.fc.in_features, 2)  # Adjust the output layer for 2 classes (normal, pneumonia)

# Load the pre-trained weights of the CNN model
cnn_model.load_state_dict(torch.load('cnn_model.pth', map_location=torch.device('cpu')))  # Ensure model is loaded correctly
cnn_model.eval()

# Define image transformation for CNN input
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Diagnostic Assistant API!"}

# Define input schema for symptoms
class SymptomInput(BaseModel):
    symptoms: str  

@app.post("/predict-symptoms/")
async def predict_symptoms(data: SymptomInput):
    symptoms = data.symptoms

    # Vectorize the input symptoms
    symptoms_vec = vectorizer.transform([symptoms]).toarray()
    
    # Predict the disease using the Random Forest model
    disease_prediction = rf_model.predict(symptoms_vec)
    
    # Decode the disease label
    disease_name = label_encoder.inverse_transform(disease_prediction)[0]
    
    return {"disease": disease_name}

@app.post("/predict-image/")
async def predict_image(file: UploadFile = File(...)):
    # Save the uploaded image temporarily
    image_path = f"temp_{file.filename}"
    with open(image_path, "wb") as f:
        f.write(file.file.read())

    # Open and transform the image
    img = Image.open(image_path)
    img_tensor = transform(img).unsqueeze(0)  # Add batch dimension
    
    # Make the prediction using the CNN model
    with torch.no_grad():
        output = cnn_model(img_tensor)
    
    # Get the predicted class
    _, predicted_class = torch.max(output, 1)
    
    # Mapping the output class to disease
    diseases = ['normal', 'pneumonia']
    predicted_disease = diseases[predicted_class.item()]

    # Clean up the temporary image file
    os.remove(image_path)
    
    return {"disease": predicted_disease}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
