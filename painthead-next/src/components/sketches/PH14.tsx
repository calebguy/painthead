'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';

export default function PH14() {
  const { audioRef } = useAudio();
  const dims = useCanvasDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const dimsRef = useRef(dims);

  dimsRef.current = dims;
  const latRef = useRef<number | null>(null);
  const longRef = useRef<number | null>(null);
  const issXRef = useRef(0);
  const issYRef = useRef(0);

  useEffect(() => {
    const fetchISSPosition = async () => {
      try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        latRef.current = data.latitude;
        longRef.current = data.longitude;
      } catch (error) {
        console.error('Error fetching ISS position:', error);
      }
    };

    fetchISSPosition();
    const interval = setInterval(fetchISSPosition, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (p5Ref.current) p5Ref.current.remove();

    const sketch = (p: p5) => {
      let iss: p5.Image;

      p.preload = () => {
        iss = p.loadImage('/photos/cartooniss.png');
      };

      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight);
        issXRef.current = -(d.nonPaintWidth / d.ph14_5w);
        issYRef.current = d.canvasHeight - d.canvasHeight / 1.5;
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol, volspec, multMain200 } = audioRef.current;
        p.background('#fff1e1');
        p.textStyle(p.BOLD);
        p.fill('#ce2b3b');
        p.textSize(d.canvasWidth / 6.8 + multMain200 * micLevel);
        p.text(
          'IS',
          d.ph14_1x + 300 * micLevel * volspec,
          d.ph14_1y + 400 * micLevel * volspec
        );
        p.textSize(d.canvasWidth / 6.8);
        p.text(
          'S',
          d.ph14_1x + d.canvasWidth / 7.5 - 3400 * micLevel * vol,
          d.ph14_1y + 400 * micLevel * vol
        );
        p.text(
          'POSITION',
          d.ph14_2x + 2000 * micLevel * vol,
          d.ph14_1y + 2500 * micLevel * vol
        );
        p.fill('#fce2c5');
        p.textSize(d.canvasWidth / 20);
        p.textStyle(p.NORMAL);
        p.text(
          'Lat: ',
          d.ph14_1x - 2200 * micLevel * vol,
          d.ph14_3y + 2200 * micLevel * vol
        );
        p.text(
          'Long: ',
          d.ph14_1x - 1800 * micLevel * vol,
          d.ph14_4y - 2300 * micLevel * vol
        );

        p.image(
          iss,
          issXRef.current - 2300 * vol * micLevel,
          issYRef.current + 1500 * vol * micLevel,
          d.nonPaintWidth / d.ph14_5w,
          d.nonPaintHeight / d.ph14_5h
        );

        // Move ISS
        issXRef.current += 3;
        const dat = 0.5 * p.sin(p.frameCount * 0.1) + p.random(-5, 5);
        issYRef.current += dat;

        if (issXRef.current > d.canvasWidth) {
          issXRef.current = -(d.nonPaintWidth / d.ph14_5w);
          issYRef.current = d.canvasHeight - d.canvasHeight / 1.5;
        }

        if (latRef.current !== null && longRef.current !== null) {
          p.text(
            latRef.current.toFixed(4),
            d.ph14_1x + d.canvasWidth / 11.5 - 1300 * micLevel * vol,
            d.ph14_3y + 1200 * micLevel * vol
          );
          p.text(
            longRef.current.toFixed(4),
            d.ph14_1x + d.canvasWidth / 7.8 + 2400 * micLevel * vol,
            d.ph14_4y + 2200 * micLevel * vol
          );
        }
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
