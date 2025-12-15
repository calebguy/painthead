'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';

export default function PH2() {
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
      let backGround: p5.Image;
      let paintWord: p5.Image;

      p.preload = () => {
        backGround = p.loadImage('/photos/PaintWordUnder.png');
        paintWord = p.loadImage('/photos/PaintOnTop.png');
      };

      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight);
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol, volspec, multMain1500 } = audioRef.current;
        p.background('#f99991');
        p.image(
          backGround,
          d.ph2_1x - micLevel * 2000 * vol,
          d.ph2_1y + micLevel * 1000 * vol,
          d.nonPaintWidth / d.div2_1w,
          d.nonPaintHeight / d.div2_1h
        );
        p.image(
          paintWord,
          d.ph2_2x + micLevel * 150 * volspec,
          d.ph2_2y + micLevel * 350 * volspec,
          d.nonPaintWidth / d.div2_2w + multMain1500 * micLevel,
          d.nonPaintHeight / d.div2_2h + multMain1500 * micLevel
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
