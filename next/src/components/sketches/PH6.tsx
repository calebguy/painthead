'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';

export default function PH6() {
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
      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight);
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol, volspec, multMain200 } = audioRef.current;
        p.background('#ffffcc');
        p.textFont('Helvetica');
        p.textSize(12);
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(0);

        const cx = d.centerX;
        const cy = d.centerY;

        p.text('today i wanted to ride my bike', cx - 1000 * micLevel * vol, cy - 130 - 1000 * micLevel * vol);
        p.text('so fast and so far', cx - 2000 * micLevel * vol, cy - 120 + 3000 * micLevel * vol);
        p.text('that the g-force would rip me out of my skin', cx - 2500 * micLevel * vol, cy - 110 - 1000 * micLevel * vol);
        p.text('today i wanted to ride my bike', cx - 2000 * micLevel * vol, cy - 100 + 2500 * micLevel * vol);
        p.text('so fast and so far', cx - 1500 * micLevel * vol, cy - 90 + 2500 * micLevel * vol);
        p.text('that the g-force would rip me out of my skin', cx - 3400 * micLevel * vol, cy - 80 + 2200 * micLevel * vol);
        p.text('peel me, like a banana', cx + 3500 * micLevel * vol, cy - 70 - 1000 * micLevel * vol);
        p.text('and i would keep riding on as a grinning skeleton', cx + 3100 * micLevel * vol, cy - 60 - 3000 * micLevel * vol);
        p.text('and people would stare and mutter incredulously', cx + 3100 * micLevel * vol, cy - 50 - 1200 * micLevel * vol);
        p.text('under their breath and go to work confused or maybe', cx - 2100 * micLevel * vol, cy - 40 + 4500 * micLevel * vol);
        p.text('call in sick and go home and lie down on their', cx - 1100 * micLevel * vol, cy - 30 - 2400 * micLevel * vol);
        p.text('couches and wonder if they were become senile or', cx + 2100 * micLevel * vol, cy - 20 - 2100 * micLevel * vol);
        p.text('contracting some early form of dementia', cx + 2200 * micLevel * vol, cy - 10 + 1100 * micLevel * vol);
        p.text('and eventually i would ride under a clothesline and', cx + 2100 * micLevel * vol, cy - 2200 * micLevel * vol);
        p.text('acquire a new skin; a better one', cx - 3100 * micLevel * vol, cy + 10 + 3300 * micLevel * vol);
        p.text("i'd also bump my", cx - 90 - 1000 * micLevel * vol, cy + 20 + 1900 * micLevel * vol);
        p.textSize(12 + multMain200 * micLevel);
        p.text('head', cx - 29 + micLevel * 100 * volspec, cy + 20 + micLevel * 100 * volspec);
        p.textSize(12);
        p.text('on a low-hanging street lamp', cx + 65 - 2700 * micLevel * vol, cy + 20 + 2300 * micLevel * vol);
        p.text('and my brain would fall out with a resigned squelch', cx + 4000 * micLevel * vol, cy + 30 - 6100 * micLevel * vol);
        p.text('and along the way i would pick up a new brain from a', cx - 3600 * micLevel * vol, cy + 40 - 2200 * micLevel * vol);
        p.text('black market organ dealer in chicago', cx + 3330 * micLevel * vol, cy + 50 - 2200 * micLevel * vol);
        p.text('a smarter brain; one that is not broken like the old one', cx - 4300 * micLevel * vol, cy + 60 + 2000 * micLevel * vol);
        p.text('and i would keep riding my bike', cx - 1500 * micLevel * vol, cy + 70 - 4100 * micLevel * vol);
        p.text('tilting my head up at the sky every so often to scream', cx - 5000 * micLevel * vol, cy + 80 - 1000 * micLevel * vol);
        p.text('joyously', cx + 2100 * micLevel * vol, cy + 90 - 2100 * micLevel * vol);
        p.text('because things were okay', cx - 3200 * micLevel * vol, cy + 100 + 1600 * micLevel * vol);
        p.text('and things were going to be okay', cx - 2500 * micLevel * vol, cy + 110 + 3500 * micLevel * vol);
        p.text('and i was going to be okay', cx - 5300 * micLevel * vol, cy + 120 - 3200 * micLevel * vol);
        p.fill('#f8cfb1');
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
