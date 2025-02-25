import React from "react";
import { useNavigate } from "react-router-dom";
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


const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 text-white p-2 ">
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                  {generateShapes().map((shape) => (
                    <motion.div
                      key={shape.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: [0, 0.35, 0],
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
            {/* Header Section */}
            <div className="text-center ">
                <h1
                    className="w-full p-4 bg-gradient-to-r from-blue-900 to-cyan-500 flex justify-around text-4xl border-b border-cyan-400 shadow-lg z-10 rounded-lg px-5 py-5"
                    onClick={() => navigate("/")}
                >
                    🩺NeuroDx
                </h1>
                <p className="mt-4 text-4xl font-bold text-white mt-25">
                    Welcome to 
                    🩺NeuroDx!
                </p>
                <p className="mt-4 text-lg text-gray-300">
                    AI-Powered Diagnostic Assistant for Smart Healthcare
                </p>
                <motion.button 
                    className="mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-3 cursor-pointer rounded-xl text-black text-xl font-bold font-bold hover:from-blue-500 hover:to-cyan-400 transition"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => navigate('/predict')}
                >
                    Predict Now
                </motion.button>
            </div>
            
            {/* Key Statistics */}
            <div className="flex justify-center gap-6 mt-12">
                <motion.div 
                    className="bg-gradient-to-br from-cyan-900 to-blue-900 p-6 rounded-xl w-1/4 text-center"
                    whileHover={{ scale: 1.05 }}
                >
                    <h2 className="text-3xl font-bold">96%</h2>
                    <p>AI Prediction Accuracy</p>
                </motion.div>
                <motion.div 
                    className="bg-gradient-to-br from-cyan-900 to-blue-900 p-6 rounded-xl w-1/4 text-center"
                    whileHover={{ scale: 1.05 }}
                >
                    <h2 className="text-3xl font-bold">100+</h2>
                    <p>Diagnoses Made</p>
                </motion.div>
                <motion.div 
                    className="bg-gradient-to-br from-cyan-900 to-blue-900 p-6 rounded-xl w-1/4 text-center"
                    whileHover={{ scale: 1.05 }}
                >
                    <h2 className="text-3xl font-bold">80%</h2>
                    <p>Reduction in Misdiagnosis</p>
                </motion.div>
            </div>
            
            {/* Features Section */}
            <h2 className="text-center text-4xl font-bold mt-16">Why Choose NeuroDx?</h2>
            <div className="grid grid-cols-2 gap-6 mt-8">
                <motion.div className="bg-gray-800 p-6 rounded-xl flex gap-4 items-center hover:bg-gray-700 transition">
                    <span className="text-blue-400 text-3xl">🔬</span>
                    <div>
                        <h3 className="font-bold text-lg">AI-Powered Diagnosis</h3>
                        <p className="text-gray-400">Advanced AI algorithms ensure accurate disease prediction.</p>
                    </div>
                </motion.div>
                <motion.div className="bg-gray-800 p-6 rounded-xl flex gap-4 items-center hover:bg-gray-700 transition">
                    <span className="text-green-400 text-3xl">👨‍⚕️</span>
                    <div>
                        <h3 className="font-bold text-lg">Doctor Consultation</h3>
                        <p className="text-gray-400">Connect with top specialists instantly.</p>
                    </div>
                </motion.div>
                <motion.div className="bg-gray-800 p-6 rounded-xl flex gap-4 items-center hover:bg-gray-700 transition">
                    <span className="text-yellow-400 text-3xl">📊</span>
                    <div>
                        <h3 className="font-bold text-lg">Data-Driven Insights</h3>
                        <p className="text-gray-400">Receive AI-based suggestions for better healthcare.</p>
                    </div>
                </motion.div>
                <motion.div className="bg-gray-800 p-6 rounded-xl flex gap-4 items-center hover:bg-gray-700 transition">
                    <span className="text-pink-400 text-3xl">🧑‍💻</span>
                    <div>
                        <h3 className="font-bold text-lg">24/7 AI Assistance</h3>
                        <p className="text-gray-400">Get instant diagnosis anytime, anywhere.</p>
                    </div>
                </motion.div>
            </div>
            {/* Footer Section */}
            <footer className="bg-gradient-to-br from-cyan-900 to-blue-900 text-white text-center py-4 mt-16">
                🩺 NeuroDx © 2025
            </footer>
        </div>
    );
};

export default Home;
