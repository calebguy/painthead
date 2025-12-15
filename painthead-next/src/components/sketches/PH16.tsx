'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';

export default function PH16() {
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
      let strip1: p5.Image;
      let strip2: p5.Image;
      let dead: p5.Image;
      let bird: p5.Image;

      p.preload = () => {
        strip1 = p.loadImage('/photos/calvinStrip1_noWhite.png');
        strip2 = p.loadImage('/photos/calvinStrip2_noWhite.png');
        dead = p.loadImage('/photos/calvinDEAD_noWhite.png');
        bird = p.loadImage('/photos/calvinBird_noWhite.png');
      };

      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight);
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol, volspec, multMain500 } = audioRef.current;
        p.background('#d6fff0');
        p.image(
          strip1,
          d.ph16_1x - 3500 * micLevel * vol,
          d.ph16_1y - 2200 * micLevel * vol,
          d.nonPaintWidth / d.ph16_1w,
          d.nonPaintHeight / d.ph16_1h
        );
        p.image(
          dead,
          d.ph16_2x + 200 * micLevel * volspec,
          d.ph16_2y + 200 * micLevel * volspec,
          d.nonPaintWidth / d.ph16_2w + 2 * multMain500 * micLevel,
          d.nonPaintHeight / d.ph16_2h + multMain500 * micLevel
        );
        p.image(
          strip2,
          d.ph16_3x + 3600 * micLevel * vol,
          d.ph16_3y + 4300 * micLevel * vol,
          d.nonPaintWidth / d.ph16_3w,
          d.nonPaintHeight / d.ph16_3h
        );
        p.image(
          bird,
          d.ph16_4x - 5300 * micLevel * vol,
          d.ph16_4y - 2300 * micLevel * vol,
          d.nonPaintWidth / d.ph16_4w,
          d.nonPaintHeight / d.ph16_4h
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
