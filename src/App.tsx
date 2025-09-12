
import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">DocLumen</h1>
        <p className="text-xl text-center mb-8">AI-Powered Health Analytics Platform</p>
        <div className="text-center">
          <a 
            href="/auth" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
