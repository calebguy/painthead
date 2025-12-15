'use client';

import { useState, useEffect, useMemo } from 'react';

function detectMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 800 && window.innerHeight <= 700;
}

export function useCanvasDimensions() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 600,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dimensions = useMemo(() => {
    const isMobile = detectMobile();

    if (isMobile) {
      const canvasWidth = windowSize.width;
      const canvasHeight = windowSize.height;
      const nonPaintWidth = windowSize.width;
      const nonPaintHeight = windowSize.width * (1 / 0.6);

      return {
        isMobile,
        canvasWidth,
        canvasHeight,
        centerX: canvasWidth / 2,
        centerY: canvasHeight / 2,
        nonPaintWidth,
        nonPaintHeight,
        divideCanvasWidth: 2.4,
        divideCanvasHeight: 2.75,
        divideCanvasWidth2: 1,
        divideCanvasHeight2: 2.75,
        imgMainPosX: canvasWidth / 2 - nonPaintWidth / 2.4 / 2,
        imgMainPosY: canvasHeight / 2 - nonPaintHeight / 2.75 / 2,
        imgMainPosX2: 0,
        imgMainPosY2: canvasHeight / 2 - nonPaintHeight / 2.75 / 2,
        // PH2 positions
        div2_1w: 1.2,
        div2_1h: 3,
        div2_2w: 2,
        div2_2h: 3,
        ph2_1x: nonPaintWidth - nonPaintWidth / 1.09,
        ph2_1y: canvasHeight / 2 - nonPaintHeight / 3 / 2,
        ph2_2x: canvasWidth - canvasWidth / 1.085,
        ph2_2y: canvasHeight / 2 - nonPaintHeight / 3 / 1.98,
        // PH4 positions
        ph4_1x: canvasWidth - canvasWidth / 1.07,
        ph4_1y: canvasHeight - canvasHeight / 1.07,
        ph4_2x: canvasWidth - canvasWidth / 1.27,
        ph4_2y: canvasHeight - canvasHeight / 1.25,
        ph4_3x: canvasWidth - canvasWidth / 1.45,
        ph4_3y: canvasHeight - canvasHeight / 6,
        ph4_4x: canvasWidth - canvasWidth / 3.4,
        ph4_4y: canvasHeight - canvasHeight / 6.4,
        div4_1w: 2.1,
        div4_1h: 2,
        div4_2w: 2.5,
        div4_2h: 2.2,
        div4_3w: 1.8,
        div4_3h: 25,
        div4_4w: 16.7,
        div4_4h: 35,
        // PH8 positions
        ph8_1x: 170,
        ph8_1y: -30,
        ph8_1z: 40,
        commaScale: canvasWidth / 900,
        ph8_2x: -18,
        ph8_2y: -50,
        ph8_2z: 0,
        dearloveScale: canvasWidth / 650,
        ph8_3x: -185,
        ph8_3y: 100,
        ph8_3z: 0,
        cantthinkScale: canvasWidth / 40,
        // PH10 positions
        ph10_1x: 0,
        ph10_1y: 0,
        ph10_2x: nonPaintWidth - nonPaintWidth / 1.47,
        ph10_2y: nonPaintHeight - nonPaintHeight / 1.383,
        ph10_3x: nonPaintWidth - nonPaintWidth / 1.45,
        ph10_3y: nonPaintHeight - nonPaintHeight / 1.387,
        ph10_4x: nonPaintWidth - nonPaintWidth / 1.57,
        ph10_4y: nonPaintHeight - nonPaintHeight / 1.43,
        ph10_5x: nonPaintWidth - nonPaintWidth / 1.453,
        ph10_5y: nonPaintHeight - nonPaintHeight / 1.279,
        ph10_6x: nonPaintWidth - nonPaintWidth / 1.44,
        ph10_6y: nonPaintHeight - nonPaintHeight / 1.278,
        ph10_7x: nonPaintWidth - nonPaintWidth / 1.5,
        ph10_7y: nonPaintHeight - nonPaintHeight / 2.4,
        ph10_8x: nonPaintWidth - nonPaintWidth / 1.925,
        ph10_8y: nonPaintHeight - nonPaintHeight / 2.95,
        ph10_1w: 1.3,
        ph10_1h: 1.8,
        ph10_2w: 28,
        ph10_2h: 35,
        ph10_3w: 28,
        ph10_3h: 38,
        ph10_4w: 28,
        ph10_4h: 38,
        ph10_5w: 7.2,
        ph10_5h: 8.5,
        ph10_6w: 6.5,
        ph10_6h: 8.6,
        ph10_7w: 1.7,
        ph10_7h: 7.5,
        ph10_8w: 10.4,
        ph10_8h: 23,
        // PH12 positions
        ph12_1w: 1.1,
        ph12_1h: 2.1,
        ph12_2w: 13,
        ph12_2h: 30,
        ph12_3w: 8,
        ph12_3h: 35,
        ph12_1x: 0,
        ph12_1y: canvasHeight - nonPaintHeight / 2.1,
        ph12_2x: nonPaintWidth - nonPaintWidth / 4.5,
        ph12_2y: canvasHeight - nonPaintHeight / 3,
        ph12_3x: nonPaintWidth - nonPaintWidth / 2,
        ph12_3y: canvasHeight - nonPaintHeight / 3.5,
        // PH14 positions
        ph14_1x: canvasWidth - canvasWidth / 1.02,
        ph14_1y: canvasWidth / 8,
        ph14_2x: canvasWidth - canvasWidth / 1.38,
        ph14_3x: 0,
        ph14_3y: canvasWidth / 9,
        ph14_4y: canvasWidth / 5,
        ph14_5w: 2,
        ph14_5h: 4.5,
        ph14_5x: -(nonPaintWidth / 2),
        ph14_5y: canvasHeight - canvasHeight / 1.5,
        // PH16 positions
        ph16_1w: 1,
        ph16_1h: 5,
        ph16_2w: 22,
        ph16_2h: 65,
        ph16_3w: 1,
        ph16_3h: 5,
        ph16_4w: 2,
        ph16_4h: 4.7,
        ph16_1x: 0,
        ph16_1y: 0,
        ph16_2x: canvasWidth - nonPaintWidth / 1.02,
        ph16_2y: canvasWidth - nonPaintWidth / 1.03,
        ph16_3x: 0,
        ph16_3y: canvasHeight - nonPaintHeight / 5,
        ph16_4x: canvasWidth / 2 - (1 / 2) * (nonPaintWidth / 2),
        ph16_4y: canvasHeight / 2 - (1 / 2) * (nonPaintHeight / 4.7),
      };
    } else {
      // Desktop dimensions
      const canvasWidth = windowSize.width / 1.7;
      const canvasHeight = (windowSize.width / 1.7) * 0.6;
      const nonPaintWidth = windowSize.width / 1.7;
      const nonPaintHeight = (windowSize.width / 1.7) * 0.6;

      return {
        isMobile,
        canvasWidth,
        canvasHeight,
        centerX: canvasWidth / 2,
        centerY: canvasHeight / 2,
        nonPaintWidth,
        nonPaintHeight,
        divideCanvasWidth: 5,
        divideCanvasHeight: 2.3,
        divideCanvasWidth2: 2.2,
        divideCanvasHeight2: 2.4,
        imgMainPosX: canvasWidth / 2 - canvasWidth / 5 / 2,
        imgMainPosY: canvasHeight / 2 - canvasHeight / 2.3 / 2,
        imgMainPosX2: canvasWidth / 2 - canvasWidth / 2.2 / 2,
        imgMainPosY2: canvasHeight / 2 - nonPaintHeight / 2.4 / 2,
        // PH2 positions
        div2_1w: 2,
        div2_1h: 2,
        div2_2w: 3,
        div2_2h: 2,
        ph2_1x: canvasWidth - canvasWidth / 1.335,
        ph2_1y: canvasHeight - canvasHeight / 1.293,
        ph2_2x: canvasWidth - canvasWidth / 1.32,
        ph2_2y: canvasHeight - canvasHeight / 1.287,
        // PH4 positions
        ph4_1x: canvasWidth / 7.1,
        ph4_1y: canvasHeight / 2 - canvasHeight / 1.3 / 2,
        ph4_2x: canvasWidth / 4.3,
        ph4_2y: canvasHeight / 2 - canvasHeight / 1.9 / 2,
        ph4_3x: canvasWidth / 1.7,
        ph4_3y: canvasHeight / 1.5,
        ph4_4x: canvasWidth / 1.265,
        ph4_4y: canvasHeight / 1.47,
        div4_1w: 3.8,
        div4_1h: 1.3,
        div4_2w: 4.8,
        div4_2h: 1.9,
        div4_3w: 3.5,
        div4_3h: 17,
        div4_4w: 31,
        div4_4h: 28,
        // PH8 positions
        ph8_1x: canvasWidth - canvasWidth / 1.32,
        ph8_1y: canvasHeight - canvasHeight / 0.98,
        ph8_1z: 100,
        commaScale: canvasWidth / 1500,
        ph8_2x: canvasWidth - canvasWidth / 0.93,
        ph8_2y: canvasHeight - canvasHeight / 0.9,
        ph8_2z: 35,
        dearloveScale: canvasWidth / 900,
        ph8_3x: canvasWidth - canvasWidth / 0.88,
        ph8_3y: canvasHeight - canvasHeight / 1.4,
        ph8_3z: 25,
        cantthinkScale: canvasWidth / 80,
        // PH10 positions
        ph10_1x: 0,
        ph10_1y: 0,
        ph10_2x: canvasWidth - canvasWidth / 1.29,
        ph10_2y: canvasHeight - canvasHeight / 2.08,
        ph10_3x: canvasWidth - canvasWidth / 1.279,
        ph10_3y: canvasHeight - canvasHeight / 2.03,
        ph10_4x: canvasWidth - canvasWidth / 1.335,
        ph10_4y: canvasHeight - canvasHeight / 2.16,
        ph10_5x: canvasWidth - canvasWidth / 1.28,
        ph10_5y: canvasHeight - canvasHeight / 1.65,
        ph10_6x: canvasWidth - canvasWidth / 1.28,
        ph10_6y: canvasHeight - canvasHeight / 1.65,
        ph10_7x: canvasWidth - canvasWidth / 1.7,
        ph10_7y: canvasHeight - canvasHeight / 3.3,
        ph10_8x: canvasWidth - canvasWidth / 1.965,
        ph10_8y: canvasHeight - canvasHeight / 4.8,
        ph10_1w: 1.9,
        ph10_1h: 1,
        ph10_2w: 36,
        ph10_2h: 20,
        ph10_3w: 36,
        ph10_3h: 20,
        ph10_4w: 39,
        ph10_4h: 20,
        ph10_5w: 11.5,
        ph10_5h: 4.8,
        ph10_6w: 11.5,
        ph10_6h: 4.8,
        ph10_7w: 3,
        ph10_7h: 6,
        ph10_8w: 18,
        ph10_8h: 16,
        // PH12 positions
        ph12_1w: 1.5,
        ph12_1h: 1.5,
        ph12_2w: 13,
        ph12_2h: 9,
        ph12_3w: 8,
        ph12_3h: 13,
        ph12_1x: 0,
        ph12_1y: canvasHeight - nonPaintHeight / 1.5,
        ph12_2x: canvasWidth - canvasWidth / 2,
        ph12_2y: canvasHeight - canvasHeight / 1.8,
        ph12_3x: canvasWidth - canvasWidth / 1.6,
        ph12_3y: canvasHeight - canvasHeight / 2.3,
        // PH14 positions
        ph14_1x: canvasWidth - canvasWidth / 1.02,
        ph14_1y: canvasHeight - canvasHeight / 1.25,
        ph14_2x: canvasWidth - canvasWidth / 1.38,
        ph14_3x: 0,
        ph14_3y: canvasHeight - canvasHeight / 1.17,
        ph14_4y: canvasHeight - canvasHeight / 1.3,
        ph14_5w: 3.3,
        ph14_5h: 3,
        ph14_5x: -(nonPaintWidth / 3.3),
        ph14_5y: canvasHeight - canvasHeight / 1.5,
        // PH16 positions
        ph16_1x: canvasWidth - canvasWidth / 1.1,
        ph16_1y: 0,
        ph16_2x: canvasWidth - canvasWidth / 1.12,
        ph16_2y: canvasHeight - canvasHeight / 1.03,
        ph16_3x: 0,
        ph16_3y: canvasHeight - canvasHeight / 2.9,
        ph16_4x: canvasWidth - canvasWidth / 1.55,
        ph16_4y: canvasHeight - canvasHeight / 1.6,
        ph16_1w: 1.1,
        ph16_1h: 2.9,
        ph16_2w: 26,
        ph16_2h: 38,
        ph16_3w: 1.1,
        ph16_3h: 2.9,
        ph16_4w: 3.7,
        ph16_4h: 4.1,
      };
    }
  }, [windowSize]);

  return dimensions;
}
