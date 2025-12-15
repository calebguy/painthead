'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';

export default function PH13() {
  const { audioRef } = useAudio();
  const dims = useCanvasDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const dimsRef = useRef(dims);

  dimsRef.current = dims;

  useEffect(() => {
    if (!containerRef.current) return;
    if (p5Ref.current) p5Ref.current.remove();

    const sketch = (p: p5) => {
      let img: p5.Image;

      p.preload = () => {
        img = p.loadImage('/photos/7no_white.jpg');
      };

      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight);
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol } = audioRef.current;
        const isDark = document.body.classList.contains('dark-mode');
        p.background(isDark ? 0 : 255);
        p.image(
          img,
          d.imgMainPosX - 3200 * micLevel * vol,
          d.imgMainPosY - 4400 * micLevel * vol,
          d.nonPaintWidth / d.divideCanvasWidth,
          d.nonPaintHeight / d.divideCanvasHeight
        );
      };
    };

    p5Ref.current = new p5(sketch, containerRef.current);

    return () => {
      p5Ref.current?.remove();
      p5Ref.current = null;
    };
  }, [audioRef]);

  return <div ref={containerRef} />;
}
