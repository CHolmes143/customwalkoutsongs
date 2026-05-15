"use client";

import { useSampleAudioPlayer } from "@/components/SampleAudioPlayer";
import { sampleTracks } from "@/lib/sampleTracks";

export function LandingSampleHotspots() {
  const { playSample, player } = useSampleAudioPlayer();
  const tracks = Object.fromEntries(sampleTracks.map((track) => [track.label, track.url]));

  return (
    <>
      <button className="landing-hotspot sample-bpm" onClick={() => playSample("BPM/Dance", tracks["BPM/Dance"])} type="button">
        BPM/Dance sample
      </button>
      <button className="landing-hotspot sample-country" onClick={() => playSample("Country", tracks.Country)} type="button">
        Country sample
      </button>
      <a className="landing-hotspot sample-pop" href="#samples">
        Pop sample
      </a>
      <button className="landing-hotspot sample-rap" onClick={() => playSample("Rap", tracks.Rap)} type="button">
        Rap sample
      </button>
      {player}
    </>
  );
}
