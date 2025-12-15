'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';

export default function PH4() {
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
      let SkinCrawler: p5.Image;
      let TextUnder: p5.Image;
      let BackgroundText: p5.Image;
      let TextOver: p5.Image;

      p.preload = () => {
        SkinCrawler = p.loadImage('/photos/SkinCrawlerNo_white.jpg');
        TextUnder = p.loadImage('/photos/TextUnderNo_white.jpg');
        BackgroundText = p.loadImage('/photos/BackgroundTextNo_white.jpg');
        TextOver = p.loadImage('/photos/TextOverNo_white.jpg');
      };

      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight);
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol, volspec, multMain200 } = audioRef.current;
        p.background('#bcf5ee');
        p.image(
          BackgroundText,
          d.ph4_1x - micLevel * 2500 * vol,
          d.ph4_1y - micLevel * 3000 * vol,
          d.nonPaintWidth / d.div4_1w,
          d.nonPaintHeight / d.div4_1h
        );
        p.image(
          SkinCrawler,
          d.ph4_2x + micLevel * 4300 * vol,
          d.ph4_2y + micLevel * 5200 * vol,
          d.nonPaintWidth / d.div4_2w,
          d.nonPaintHeight / d.div4_2h
        );
        p.image(
          TextUnder,
          d.ph4_3x + micLevel * 2500 * vol,
          d.ph4_3y - micLevel * 3200 * vol,
          d.nonPaintWidth / d.div4_3w,
          d.nonPaintHeight / d.div4_3h
        );
        p.image(
          TextOver,
          d.ph4_4x - micLevel * 500 * volspec,
          d.ph4_4y - micLevel * 400 * volspec,
          d.nonPaintWidth / d.div4_4w + multMain200 * micLevel,
          d.nonPaintHeight / d.div4_4h + multMain200 * micLevel
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
