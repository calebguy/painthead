'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';

export default function PH15() {
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
        img = p.loadImage('/photos/8no_white.png');
      };

      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight);
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol } = audioRef.current;
        p.background(255);
        p.image(
          img,
          d.imgMainPosX2 - 6700 * micLevel * vol,
          d.imgMainPosY2 - 2200 * micLevel * vol,
          d.nonPaintWidth / d.divideCanvasWidth2,
          d.nonPaintHeight / d.divideCanvasHeight2
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
