import React, { useState } from 'react';
import ManufacturingWindow from './components/ManufacturingWindow';
import { DataProvider } from './context/DataContext';
import './App.css';

function App() {
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const openWindow = () => setIsWindowOpen(true);
  const closeWindow = () => setIsWindowOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-green-500 to-blue-900">
      {/* Landing Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Indian Manufacturing Growth
          </h1>
          <p className="text-xl text-white mb-8 max-w-md mx-auto">
            Track India's manufacturing revolution with real-time growth data, sector insights, and state-wise performance metrics.
          </p>
          
          <button
            onClick={openWindow}
            className="inline-flex items-center px-8 py-4 font-semibold text-white bg-amber-500 rounded-full hover:bg-amber-600 transition-all transform hover:scale-105 shadow-lg"
          >
            📊 View Manufacturing Dashboard
          </button>
        </div>
      </section>

      {/* Manufacturing Window */}
      <DataProvider>
        <ManufacturingWindow 
          isOpen={isWindowOpen} 
          onClose={closeWindow}
        />
      </DataProvider>
    </div>
  );
}

export default App;
