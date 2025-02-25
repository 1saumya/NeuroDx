import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const generateShapes = () => {
  return [...Array(30)].map((_, i) => ({
    id: i,
    size: Math.random() * 80 + 30,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 6,
    type: Math.random() > 0.5 ? "circle" : "square",
  }));
};

const App = () => {
  const [symptoms, setSymptoms] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [section, setSection] = useState("symptoms");
  const [errorMessage, setErrorMessage] = useState("");

  const neonGlow = "shadow-[0_0_15px_#0ff,0_0_30px_#0ff]";
  const transitionEffect = { type: "spring", stiffness: 100, damping: 10 };

  const handleSymptomSubmit = async () => {
    if (!symptoms) {
      setErrorMessage("Enter symptoms to predict disease.");
      return;
    }
    setErrorMessage(""); // Clear any previous error messages
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict-symptoms/", { symptoms });
      setResult(response.data.disease);
    } catch (error) {
      setResult("Error predicting disease.");
    }
  };

  const handleImageSubmit = async () => {
    if (!image) {
      setErrorMessage("Select an image to analyze.");
      return;
    }
    setErrorMessage(""); // Clear any previous error messages
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict-image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.disease);
    } catch (error) {
      setResult("Error predicting disease.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Machine-like Background Animation */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {generateShapes().map((shape) => (
          <motion.div
            key={shape.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.7, 0],
              x: [`${shape.x}vw`, `${shape.x + Math.random() * 10 - 5}vw`],
              y: [`${shape.y}vh`, `${shape.y + Math.random() * 10 - 5}vh`],
              rotate: shape.type === "square" ? [0, 360] : 0,
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute ${shape.type === "square" ? "bg-green-400" : "bg-blue-500"} ${
              shape.type === "square" ? "rounded-lg" : "rounded-full"
            } blur-lg`}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-black to-blue-900 opacity-80 z-[-1]">
        {[...Array(144)].map((_, i) => (
          <div key={i} className="text-4xl font-bold text-cyan-400 mt-6 tracking-wide neon-text" />
        ))}
      </div>

      {/* Heading Logo */}
      <motion.h1 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      className="text-4xl font-bold text-white flex items-center gap-3 cursor-pointer hover:text-cyan-400 transition duration-300 my-4"
      onClick={() => navigate("/")}
    >  
      🩺NeuroDx Predictor
    </motion.h1>
      
      {/* Navbar with Floating Effect and Neon Glow */}
      <motion.nav 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full p-4 bg-gradient-to-r from-cyan-500 to-blue-900 flex justify-around text-xl border-b border-cyan-400 shadow-lg z-10 rounded-lg"
      >
        {[["symptoms", "Symptoms"], ["image", "X-ray Analysis"], ["data", "Patient Data"]].map(([key, label]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setSection(key); setResult(""); setErrorMessage(""); }}
            className={`hover:text-cyan-300 transition duration-300 px-4 py-2 rounded ${section === key ? neonGlow : ""}`}
          >
            {label}
          </motion.button>
        ))}
      </motion.nav>

      {/* <p className="text-4xl mt-15 text-align-center text-gray-300">
      Welcome to🩺NeuroDx Predictor</p> */}

      {/* Main Content with Neon Effects */}
      <div className="flex flex-col items-center justify-center min-h-[65vh] w-full">
      <div className={`flex flex-col p-15 items-center mt-1 p-6 w-100% bg-gray-900 shadow-lg rounded-lg border border-cyan-500 ${neonGlow} z-10`}> 
        {section === "symptoms" && (
          <div>
            <h2 className="text-2xl mb-4 py-5">Predict Disease from Symptoms</h2>
            <input
        
              type="text"
              className="p-2 rounded bg-gray-700 border border-gray-500 focus:border-cyan-400 focus:ring focus:ring-cyan-300"
              placeholder="Enter symptoms (comma separated)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
            />
            <button
              className={`ml-4 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 rounded shadow-lg transition duration-300 ${neonGlow}`}
              onClick={handleSymptomSubmit}
            >
              Predict
            </button>
          </div>
        )}

        {section === "image" && (
          <div>
            <h2 className="text-2xl mb-4">Analyze Chest X-ray</h2>
            <input
              type="file"
              className="p-2 rounded bg-gray-800 border border-transparent focus:border-cyan-400 focus:ring focus:ring-cyan-300 focus:bg-gradient-to-r from-gray-700 to-black"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <button
              className={`ml-4 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 rounded shadow-lg transition duration-300 ${neonGlow}`}
              onClick={handleImageSubmit}
            >
              Analyze
            </button>
          </div>
        )}

        {section === "data" && (
          <div>
            <h2 className="text-2xl mb-4">Patient Data (Coming Soon)</h2>
          </div>
        )}

        {/* Error Message Section */}
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={transitionEffect}
            className="mt-4 p-4 bg-red-600 rounded border border-red-400 shadow-lg text-center"
          >
            <p className="text-white font-bold">{errorMessage}</p>
          </motion.div>
        )}

        {/* Result Section with Animated Glow */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={transitionEffect}
            className={`mt-6 p-4 bg-gray-700 rounded border border-cyan-400 shadow-lg text-center ${neonGlow}`}
          >
            <h3 className="text-xl">Result:</h3>
            <p className="text-cyan-400 font-bold text-lg animate-pulse">{result}</p>
          </motion.div>
          
        )}
      </div>
      </div>

  
    </div>
  );
};



export default App;