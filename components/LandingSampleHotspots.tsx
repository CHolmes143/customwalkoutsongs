"use client";

import { useSampleAudioPlayer } from "@/components/SampleAudioPlayer";
import { sampleTracks } from "@/lib/sampleTracks";

export function LandingSampleHotspots() {
  const { playSample, player } = useSampleAudioPlayer();
  const tracks = Object.fromEntries(sampleTracks.map((track) => [track.label, track.url]));

  return (
    <>
      <button className="landing-hotspot sample-country-rock" onClick={() => playSample("Country Rock", tracks["Country Rock"])} type="button">
        Country Rock sample
      </button>
      <button className="landing-hotspot sample-alt-rock" onClick={() => playSample("90's/2000's Alt Rock", tracks["90's/2000's Alt Rock"])} type="button">
        90s/2000s Alt Rock sample
      </button>
      <button className="landing-hotspot sample-bpm" onClick={() => playSample("BPM/Dance", tracks["BPM/Dance"])} type="button">
        BPM/Dance sample
      </button>
      <button className="landing-hotspot sample-pop-punk" onClick={() => playSample("Pop Punk", tracks["Pop Punk"])} type="button">
        Pop Punk sample
      </button>
      <button className="landing-hotspot sample-trap-hip-hop" onClick={() => playSample("Trap / Hip Hop", tracks["Trap / Hip Hop"])} type="button">
        Trap / Hip Hop sample
      </button>
      <button className="landing-hotspot sample-rap-rock-metal" onClick={() => playSample("Rap Rock/Metal", tracks["Rap Rock/Metal"])} type="button">
        Rap Rock/Metal sample
      </button>
      {player}
    </>
  );
}
