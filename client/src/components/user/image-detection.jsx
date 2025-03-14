
import React, { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const ImageDetection = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      console.log('Model loaded');
    };
    loadModel();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

     
      const maxWidth = 800;
      const maxHeight = 800;
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      if (model) {
        const preds = await model.detect(img);
        setPredictions(preds);
        preds.forEach(pred => {
          const [x, y, w, h] = pred.bbox;
          ctx.beginPath();
          ctx.rect(x, y, w, h);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#10B981';
          ctx.stroke();
          ctx.fillStyle = '#10B981';
          ctx.fillText(`${pred.class} (${Math.round(pred.score * 100)}%)`, x, y > 10 ? y - 5 : 10);
        });
      }
    };
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Scrap Image Detection</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="w-full p-2 border rounded"
      />
      <canvas ref={canvasRef} className="mt-4 border border-gray-300" />
      {predictions.length > 0 && (
        <div className="mt-4">
          {predictions.map((pred, index) => (
            <p key={index} className="text-gray-700">
              {pred.class} - Confidence: {Math.round(pred.score * 100)}%
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDetection;
