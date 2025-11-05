
import React, { useMemo } from 'react';

interface Firework {
  id: number;
  x: string;
  y: string;
  delay: string;
  hue: number;
  particleCount: number;
}

const Fireworks: React.FC = () => {
  const fireworks = useMemo(() => {
    const NUM_FIREWORKS = 25;
    const PARTICLE_COUNT = 40;

    return Array.from({ length: NUM_FIREWORKS }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 90 + 5}%`,
      y: `${Math.random() * 40 + 20}%`,
      delay: `${Math.random() * 3.5}s`,
      hue: Math.floor(Math.random() * 360),
      particleCount: PARTICLE_COUNT,
    }));
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="absolute w-1 h-1"
          style={{
            left: fw.x,
            top: fw.y,
          }}
        >
          {Array.from({ length: fw.particleCount }).map((_, pIndex) => (
            <div
              key={pIndex}
              className="absolute w-full h-full animate-[firework-burst_1s_ease-out_forwards]"
              style={{
                transform: `rotate(${(360 / fw.particleCount) * pIndex}deg) translateX(60px) scale(1)`,
                animationDelay: fw.delay,
              }}
            >
              <div
                className="w-1 h-1 rounded-full"
                style={{
                  backgroundColor: `hsl(${fw.hue}, 100%, 65%)`,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Fireworks;
