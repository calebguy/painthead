'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface AudioValues {
  micLevel: number;
  vol: number;
  volspec: number;
  multMain200: number;
  multMain500: number;
  multMain1500: number;
  multMain3: number;
}

interface AudioContextType {
  audioRef: React.MutableRefObject<AudioValues>;
  isListening: boolean;
  startListening: () => Promise<void>;
}

const AudioCtx = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isListening, setIsListening] = useState(false);

  const audioRef = useRef<AudioValues>({
    micLevel: 0,
    vol: 0,
    volspec: 0,
    multMain200: 0,
    multMain500: 0,
    multMain1500: 0,
    multMain3: 0,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const updateAudioLevels = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average volume (0-1 range)
    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const normalizedLevel = average / 255;

    // Update ref values directly (no re-renders needed)
    const values = audioRef.current;
    values.micLevel = normalizedLevel;

    // Update multipliers based on mic level (matching original logic)
    if (normalizedLevel < 0.03) {
      values.vol = 0;
      values.volspec = 0;
      values.multMain1500 = 0;
      values.multMain200 = 0;
      values.multMain500 = 0;
      values.multMain3 = 0;
    } else if (normalizedLevel > 0.03 && normalizedLevel < 0.3) {
      values.vol = 0.8;
      values.volspec = 0.8;
      values.multMain1500 = 0;
      values.multMain200 = 0;
      values.multMain500 = 0;
      values.multMain3 = 0;
    } else {
      values.vol = 500;
      values.volspec = 1;
      values.multMain1500 = 1500;
      values.multMain200 = 200;
      values.multMain500 = 500;
      values.multMain3 = 2.5;
    }

    animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
  }, []);

  const startListening = useCallback(async () => {
    if (isListening) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      setIsListening(true);
      updateAudioLevels();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, [isListening, updateAudioLevels]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <AudioCtx.Provider
      value={{
        audioRef,
        isListening,
        startListening,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioCtx);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
