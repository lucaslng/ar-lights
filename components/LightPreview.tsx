'use client';

import React from 'react';
import Bulb from './Bulb';
import LightStrand from './LightStrand';

const LightPreview: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Light Examples</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Individual Bulbs */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-3 text-white">Individual Bulbs</h4>
          <div className="relative h-32 bg-gray-600 rounded">
            <Bulb
              id="demo-bulb-1"
              color="#ff0000"
              size={25}
              x={40}
              y={40}
            />
            <Bulb
              id="demo-bulb-2"
              color="#00ff00"
              size={20}
              x={80}
              y={60}
            />
            <Bulb
              id="demo-bulb-3"
              color="#0000ff"
              size={30}
              x={120}
              y={80}
            />
            <Bulb
              id="demo-bulb-4"
              color="#ffff00"
              size={22}
              x={160}
              y={50}
            />
          </div>
        </div>

        {/* Light Strands */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-3 text-white">Light Strands</h4>
          <div className="relative h-32 bg-gray-600 rounded">
            <LightStrand
              id="demo-strand-1"
              x={30}
              y={40}
              length={6}
              pattern="alternating"
              colors={['#ff0000', '#00ff00']}
            />
            <LightStrand
              id="demo-strand-2"
              x={30}
              y={80}
              length={8}
              pattern="rainbow"
              colors={['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff']}
            />
          </div>
        </div>

        {/* Color Patterns */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-3 text-white">Color Patterns</h4>
          <div className="relative h-32 bg-gray-600 rounded">
            <LightStrand
              id="demo-pattern-1"
              x={40}
              y={40}
              length={10}
              pattern="custom"
              colors={['#ff0000', '#00ff00', '#0000ff']}
            />
            <LightStrand
              id="demo-pattern-2"
              x={40}
              y={80}
              length={8}
              pattern="custom"
              colors={['#ff00ff', '#00ffff', '#ffff00']}
            />
          </div>
        </div>

        {/* Size Variations */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-3 text-white">Size Variations</h4>
          <div className="relative h-32 bg-gray-600 rounded">
            <Bulb
              id="demo-size-1"
              color="#ff0000"
              size={15}
              x={40}
              y={40}
            />
            <Bulb
              id="demo-size-2"
              color="#00ff00"
              size={25}
              x={80}
              y={40}
            />
            <Bulb
              id="demo-size-3"
              color="#0000ff"
              size={35}
              x={120}
              y={40}
            />
            <Bulb
              id="demo-size-4"
              color="#ffff00"
              size={45}
              x={160}
              y={40}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-900 rounded-lg">
        <h4 className="text-lg font-medium mb-2 text-white">💡 Tips</h4>
        <ul className="text-sm text-blue-100 space-y-1">
          <li>• Mix different bulb sizes for visual interest</li>
          <li>• Use alternating patterns for classic Christmas looks</li>
          <li>• Create rainbow patterns for festive celebrations</li>
          <li>• Combine individual bulbs with strands for variety</li>
        </ul>
      </div>
    </div>
  );
};

export default LightPreview;
