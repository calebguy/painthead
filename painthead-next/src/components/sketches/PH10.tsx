'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useAudio } from '@/context/AudioContext';
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions';

export default function PH10() {
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
      let mainchar: p5.Image;
      let mor: p5.Image;
      let mol: p5.Image;
      let cl1: p5.Image;
      let cl2: p5.Image;
      let cr: p5.Image;
      let ivegot: p5.Image;
      let my: p5.Image;

      p.preload = () => {
        mainchar = p.loadImage('/photos/mainchar_noWhite.png');
        mor = p.loadImage('/photos/mouthoverlayright_noWhite.png');
        mol = p.loadImage('/photos/mouthoverlayleft_noWhite.png');
        cl1 = p.loadImage('/photos/cornleft1_noWhite.png');
        cl2 = p.loadImage('/photos/cornleft2_noWhite.png');
        cr = p.loadImage('/photos/cornright_noWhite.png');
        ivegot = p.loadImage('/photos/ivegot_noWhite.png');
        my = p.loadImage('/photos/my_noWhite.png');
      };

      p.setup = () => {
        const d = dimsRef.current;
        p.createCanvas(d.canvasWidth, d.canvasHeight);
      };

      p.draw = () => {
        const d = dimsRef.current;
        const { micLevel, vol, volspec, multMain200 } = audioRef.current;
        p.background('#bfecff');
        p.fill('#9e41c6');
        p.image(
          mainchar,
          d.ph10_1x + 1500 * micLevel * vol,
          d.ph10_1y - 2100 * micLevel * vol,
          d.nonPaintWidth / d.ph10_1w,
          d.nonPaintHeight / d.ph10_1h
        );
        p.image(
          cl1,
          d.ph10_2x + 3300 * micLevel * vol,
          d.ph10_2y - 2200 * micLevel * vol,
          d.nonPaintWidth / d.ph10_2w,
          d.nonPaintHeight / d.ph10_2h
        );
        p.image(
          cl2,
          d.ph10_3x - 2500 * micLevel * vol,
          d.ph10_3y + 5200 * micLevel * vol,
          d.nonPaintWidth / d.ph10_3w,
          d.nonPaintHeight / d.ph10_3h
        );
        p.image(
          cr,
          d.ph10_4x + 2000 * micLevel * vol,
          d.ph10_4y + 1500 * micLevel * vol,
          d.nonPaintWidth / d.ph10_4w,
          d.nonPaintHeight / d.ph10_4h
        );
        p.image(
          mor,
          d.ph10_5x + 1500 * micLevel * vol,
          d.ph10_5y - 2100 * micLevel * vol,
          d.nonPaintWidth / d.ph10_5w,
          d.nonPaintHeight / d.ph10_5h
        );
        p.image(
          mol,
          d.ph10_6x + 1500 * micLevel * vol,
          d.ph10_6y - 2100 * micLevel * vol,
          d.nonPaintWidth / d.ph10_6w,
          d.nonPaintHeight / d.ph10_6h
        );
        p.image(
          ivegot,
          d.ph10_7x - 2700 * micLevel * vol,
          d.ph10_7y + 2700 * micLevel * vol,
          d.nonPaintWidth / d.ph10_7w,
          d.nonPaintHeight / d.ph10_7h
        );
        p.image(
          my,
          d.ph10_8x + 100 * micLevel * volspec,
          d.ph10_8y - 500 * micLevel * volspec,
          d.nonPaintWidth / d.ph10_8w + multMain200 * micLevel,
          d.nonPaintHeight / d.ph10_8h + multMain200 * micLevel
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
