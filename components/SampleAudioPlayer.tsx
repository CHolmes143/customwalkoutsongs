"use client";

import { Ear } from "lucide-react";
import { useRef, useState } from "react";
import { defaultSampleTrack, sampleTracks } from "@/lib/sampleTracks";

export function useSampleAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeSample, setActiveSample] = useState(defaultSampleTrack.label);
  const [activeSampleUrl, setActiveSampleUrl] = useState(defaultSampleTrack.url);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  function playSample(label: string, url: string) {
    if (!url) return;
    setActiveSample(`${label} sample`);
    setActiveSampleUrl(url);
    setIsPlayerVisible(true);
    window.setTimeout(() => {
      audioRef.current?.play();
    }, 0);
  }

  const player = (
    <div className={isPlayerVisible ? "landing-audio-player visible" : "landing-audio-player"}>
      <span>{activeSample}</span>
      <audio ref={audioRef} controls preload="metadata" src={activeSampleUrl}>
        <a href={activeSampleUrl}>Play sample</a>
      </audio>
    </div>
  );

  return { playSample, player };
}

export function SamplesGrid() {
  const { playSample, player } = useSampleAudioPlayer();
  const playableTracks = sampleTracks.filter((track) => track.url);

  return (
    <>
      <div className="samples-grid">
        {playableTracks.map((track) => (
          <button
            className="sample-card"
            key={track.label}
            onClick={() => playSample(track.label, track.url)}
            type="button"
          >
            <span>{track.label}</span>
            <Ear aria-hidden="true" size={28} />
            <small>Listen</small>
          </button>
        ))}
      </div>
      {player}
    </>
  );
}
