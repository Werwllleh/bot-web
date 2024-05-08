import React, { useEffect, useRef } from 'react';

const NoisyCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const getRandom = () => {
      return Math.random() * 255;
    };

    const render = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const color = getRandom();
        imageData.data[i] = color;
        imageData.data[i + 1] = color;
        imageData.data[i + 2] = color;
        imageData.data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(render);
    };

    const updateCanvasSize = () => {
      ctx.canvas.height = canvas.offsetHeight;
      ctx.canvas.width = canvas.offsetWidth;
    };

    const main = () => {
      window.addEventListener('resize', updateCanvasSize);
      updateCanvasSize();
      render();
    };

    main();

    // Clean-up function to remove event listener
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  return <canvas id="noisy-canvas" ref={canvasRef} />;
};

export default NoisyCanvas;