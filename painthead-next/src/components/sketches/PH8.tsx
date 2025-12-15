'use client';

import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';
import p5 from 'p5';
import { useEffect, useRef } from 'react';

export default function PH8() {
  const { audioRef } = useAudio();
  const dims = useCanvasDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const dimsRef = useRef(dims);

  dimsRef.current = dims;
  const mRef = useRef(0);
  const randoRef = useRef(0);
  const upFlagRef = useRef(1);

  useEffect(() => {
    let currentTimer: NodeJS.Timeout | null = null;

    const countUp = () => {
      mRef.current += 1;
      randoRef.current = Math.random() * 200 - 100;
    };

    const countDown = () => {
      mRef.current -= 1;
      randoRef.current = Math.random() * 200 - 100;
    };

    const mainInterval = setInterval(() => {
      if (currentTimer) clearInterval(currentTimer);

      if (upFlagRef.current === 0) {
        currentTimer = setInterval(countUp, 60);
        upFlagRef.current = 1;
      } else {
        currentTimer = setInterval(countDown, 60);
        upFlagRef.current = 0;
      }
    }, 1000);

    return () => {
      clearInterval(mainInterval);
      if (currentTimer) clearInterval(currentTimer);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (p5Ref.current) p5Ref.current.remove();

    const sketch = (p: p5) => {
      let img: p5.Image;
      let comma: p5.Geometry;
      let dearlove: p5.Geometry;
      let icantthink: p5.Geometry;

      p.preload = () => {
        img = p.loadImage('/photos/zebraPrint02.jpg');
        comma = p.loadModel('/models/3DComma.obj');
        dearlove = p.loadModel('/models/dearlove.obj');
        icantthink = p.loadModel('/models/icantthink.obj');
      };

      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight, p.WEBGL);
        p.noStroke();
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol, volspec, multMain3 } = audioRef.current;
        p.background('#c3f2cf');

        // Comma
        p.push();
        p.translate(
          d.ph8_1x - micLevel * 300 * volspec,
          d.ph8_1y,
          d.ph8_1z + micLevel * 100
        );
        p.rotateX(Math.PI);
        p.rotateY(0.78539 + p.frameCount * 0.05);
        p.texture(img);
        p.scale(d.commaScale + multMain3 * micLevel);
        p.model(comma);
        p.pop();

        // Dear love
        p.push();
        p.translate(
          d.ph8_2x + 2000 * micLevel * vol,
          d.ph8_2y + 3400 * micLevel * vol,
          d.ph8_2z - 1000 * micLevel * vol
        );
        const rot = p.map(mRef.current, -50, 50, -20, 30);
        p.rotateX(3.12 + rot / 10);
        p.texture(img);
        p.scale(d.dearloveScale);
        p.model(dearlove);
        p.pop();

        // I can't think
        p.push();
        p.translate(
          d.ph8_3x - 3500 * micLevel * vol,
          d.ph8_3y - 2200 * micLevel * vol,
          d.ph8_3z + 2000 * micLevel * vol
        );
        p.rotateX(3.14 + randoRef.current / 500);
        p.rotateY(randoRef.current / 150);
        p.texture(img);
        p.scale(d.cantthinkScale);
        p.model(icantthink);
        p.pop();
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
