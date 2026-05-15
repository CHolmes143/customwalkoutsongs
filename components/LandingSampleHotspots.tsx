"use client";

import { Ear } from "lucide-react";
import { useSampleAudioPlayer } from "@/components/SampleAudioPlayer";
import { sampleTracks } from "@/lib/sampleTracks";

export function LandingSampleHotspots() {
  const { playSample, player } = useSampleAudioPlayer();
  const tracks = Object.fromEntries(sampleTracks.map((track) => [track.label, track.url]));

  return (
    <>
      {sampleTracks.map((track) => (
        <button
          className={`landing-hotspot landing-sample-circle ${sampleClassName(track.label)}`}
          disabled={!track.url}
          key={track.label}
          onClick={() => playSample(track.label, tracks[track.label])}
          type="button"
        >
          <span>{track.label}</span>
          <Ear aria-hidden="true" size={28} />
          <small>{track.url ? "Listen" : "Coming soon"}</small>
        </button>
      ))}
      {player}
    </>
  );
}

function sampleClassName(label: string) {
  return `sample-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}
