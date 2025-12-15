'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';

export default function PH12() {
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
      let main: p5.Image;
      let takemy: p5.Image;
      let identity: p5.Image;

      p.preload = () => {
        main = p.loadImage('/photos/identity_noWhite.png');
        takemy = p.loadImage('/photos/takemy_noWhite.png');
        identity = p.loadImage('/photos/identityword_noWhite.png');
      };

      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight);
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol, volspec, multMain200 } = audioRef.current;
        p.background('#f7c1e6');
        p.image(
          main,
          d.ph12_1x - 1200 * micLevel * vol,
          d.ph12_1y + 2600 * micLevel * vol,
          d.nonPaintWidth / d.ph12_1w,
          d.nonPaintHeight / d.ph12_1h
        );
        p.image(
          takemy,
          d.ph12_2x + 3700 * micLevel * vol,
          d.ph12_2y + 4900 * micLevel * vol,
          d.nonPaintWidth / d.ph12_2w,
          d.nonPaintHeight / d.ph12_2h
        );
        p.image(
          identity,
          d.ph12_3x - 10 * micLevel * volspec,
          d.ph12_3y - 150 * micLevel * volspec,
          d.nonPaintWidth / d.ph12_3w + 2 * multMain200 * micLevel,
          d.nonPaintHeight / d.ph12_3h + multMain200 * micLevel
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
