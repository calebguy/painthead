'use client';

import dynamic from 'next/dynamic';
import { useAudio, AudioProvider } from '@/context/AudioContext';

// Dynamically import all sketches with no SSR (p5.js requires window)
const PH1 = dynamic(() => import('@/components/sketches/PH1'), { ssr: false });
const PH2 = dynamic(() => import('@/components/sketches/PH2'), { ssr: false });
const PH3 = dynamic(() => import('@/components/sketches/PH3'), { ssr: false });
const PH4 = dynamic(() => import('@/components/sketches/PH4'), { ssr: false });
const PH5 = dynamic(() => import('@/components/sketches/PH5'), { ssr: false });
const PH6 = dynamic(() => import('@/components/sketches/PH6'), { ssr: false });
const PH7 = dynamic(() => import('@/components/sketches/PH7'), { ssr: false });
const PH8 = dynamic(() => import('@/components/sketches/PH8'), { ssr: false });
const PH9 = dynamic(() => import('@/components/sketches/PH9'), { ssr: false });
const PH10 = dynamic(() => import('@/components/sketches/PH10'), { ssr: false });
const PH11 = dynamic(() => import('@/components/sketches/PH11'), { ssr: false });
const PH12 = dynamic(() => import('@/components/sketches/PH12'), { ssr: false });
const PH13 = dynamic(() => import('@/components/sketches/PH13'), { ssr: false });
const PH14 = dynamic(() => import('@/components/sketches/PH14'), { ssr: false });
const PH15 = dynamic(() => import('@/components/sketches/PH15'), { ssr: false });
const PH16 = dynamic(() => import('@/components/sketches/PH16'), { ssr: false });
const PH17 = dynamic(() => import('@/components/sketches/PH17'), { ssr: false });

function PaintheadContent() {
  const { isListening, startListening } = useAudio();

  return (
    <main className="painthead-main">
      <div id="paintInfo">
        view by yourself<br />
        scream until one word is left
        {!isListening && (
          <button onClick={startListening} className="start-button">
            click to begin
          </button>
        )}
      </div>

      <div id="paintContent">
        <div className="container"><PH1 /></div>
        <div className="container"><PH2 /></div>
        <div className="container"><PH3 /></div>
        <div className="container"><PH4 /></div>
        <div className="container"><PH5 /></div>
        <div className="container"><PH6 /></div>
        <div className="container"><PH7 /></div>
        <div className="container"><PH8 /></div>
        <div className="container"><PH9 /></div>
        <div className="container"><PH10 /></div>
        <div className="container"><PH11 /></div>
        <div className="container"><PH12 /></div>
        <div className="container"><PH13 /></div>
        <div className="container"><PH14 /></div>
        <div className="container"><PH15 /></div>
        <div className="container"><PH16 /></div>
        <div className="container"><PH17 /></div>

        <div id="credits">
          paint - microsoft paint<br />
          skin crawler - shel silverstein<br />
          words - mark baldyga<br />
          calvin and hobbes - bill watterson
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <AudioProvider>
      <PaintheadContent />
    </AudioProvider>
  );
}
