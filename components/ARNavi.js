import React, { useState, useEffect } from 'react';

const ARNavi = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setIsAnimated(true), 100);
    setTimeout(() => setShowButtons(true), 800);
  }, []);

  // Function to open gallery (works in web browsers)
  const openGallery = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        alert(`Selected ${files.length} image(s) from gallery!`);
        console.log('Gallery files:', files);
      }
    };
    input.click();
  };

  // Function to open camera
  const openCamera = () => {
    alert('Camera functionality would open device camera in mobile app');
  };

  // Function to open maps
  const openMaps = () => {
    window.open('https://maps.google.com/?q=parks+near+me', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center p-6">
      <div 
        className={`text-center transition-all duration-1000 transform ${
          isAnimated ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-12 opacity-0 scale-90'
        }`}
      >
        {/* App Icon and Title */}
        <div className="mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 transition-all duration-800 ${
            isAnimated ? 'rotate-0 scale-100' : 'rotate-12 scale-75'
          }`}>
            <span className="text-4xl">🌲</span>
          </div>
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            ParkVisions
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            AR-based navigation system for parking lots. Discover and explore parks near you with advanced AR technology.
          </p>
        </div>

        {/* Feature Description */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-lg mx-auto shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            AR Navigation Features
          </h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Unity AR Foundation framework</li>
            <li>• Real-time pathfinding with NavMesh</li>
            <li>• 3D environment navigation</li>
            <li>• Offline AR experiences</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div 
          className={`space-y-4 transition-all duration-500 ${
            showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={openGallery}
            className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
          >
            <span>📷</span>
            Open Gallery
          </button>
          
          <button
            onClick={openCamera}
            className="w-full max-w-xs border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <span>📸</span>
            Open Camera
          </button>
          
          <button
            onClick={openMaps}
            className="w-full max-w-xs border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <span>🗺️</span>
            Find Parks
          </button>
        </div>

        {/* Testing Note */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Gallery button opens file selector for testing</p>
        </div>
      </div>
    </div>
  );
};

export default ARNavi;