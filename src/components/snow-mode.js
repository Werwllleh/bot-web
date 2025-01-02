import React, { useEffect, useRef } from 'react';

const SnowMode = () => {
  const canvasRef = useRef(null);

  const baseSnowCount = 120; // Default number of snowflakes
  const snowColor = 'rgba(0,128,255,0.5)';
  const horizontalDrift = 0.8; // Maximum horizontal drift per frame

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let snowCount = width < 768 ? baseSnowCount / 2 : baseSnowCount; // Adjust snowflakes count
    let raf;
    const snowflakes = [];
    const gravity = 0.2; // Speed of downward movement

    for (let i = 0; i <= snowCount; i++) {
      snowflakes.push({
        x: Math.random() * width, // Random horizontal position
        y: Math.random() * height, // Random vertical position
        radius: Math.random() * 5 + 2,
        opacity: 0.8,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        drift: (Math.random() - 0.5) * horizontalDrift, // Random drift per frame
      });
    }

    const drawSnowflake = (x, y, radius, angle) => {
      const branches = 6; // Number of branches for the snowflake
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      for (let i = 0; i < branches; i++) {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius);
        ctx.translate(0, -radius / 2);

        // Add smaller branches
        ctx.moveTo(0, 0);
        ctx.lineTo(-radius / 4, -radius / 4);
        ctx.moveTo(0, 0);
        ctx.lineTo(radius / 4, -radius / 4);

        ctx.translate(0, radius / 2);
        ctx.rotate((Math.PI * 2) / branches);
      }
      ctx.strokeStyle = snowColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < snowflakes.length; i++) {
        const f = snowflakes[i];
        drawSnowflake(f.x, f.y, f.radius, f.angle);
      }
    };

    const move = () => {
      for (let i = 0; i < snowflakes.length; i++) {
        const f = snowflakes[i];

        // Move downward and apply horizontal drift
        f.x += f.drift;
        f.y += (f.radius / 2) * gravity;

        // Reset position when snowflake exits the canvas
        if (f.y > height) {
          f.x = Math.random() * width;
          f.y = 0;
        }
        if (f.x > width || f.x < 0) {
          f.x = Math.random() * width;
        }
      }
    };

    const update = () => {
      move();
      draw();
      raf = window.requestAnimationFrame(update);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Adjust snowflakes count on resize
      snowCount = width < 768 ? baseSnowCount / 2 : baseSnowCount;

      // Reset snowflakes array
      snowflakes.length = 0;
      for (let i = 0; i <= snowCount; i++) {
        snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 5 + 2,
          opacity: 0.8,
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: Math.random() * 0.02 - 0.01,
          drift: (Math.random() - 0.5) * horizontalDrift,
        });
      }
    };

    window.addEventListener('resize', resize);
    update();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="snow-mode"
    ></canvas>
  );
};

export default SnowMode;
