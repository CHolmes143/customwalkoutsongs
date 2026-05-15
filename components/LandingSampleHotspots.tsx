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
      <button className="landing-hotspot sample-alt-rock" onClick={() => playSample("Alt Rock", tracks["Alt Rock"])} type="button">
        Alt Rock sample
      </button>
      <button className="landing-hotspot sample-pop-punk" onClick={() => playSample("Pop Punk", tracks["Pop Punk"])} type="button">
        Pop Punk sample
      </button>
      <button className="landing-hotspot sample-trap-hip-hop" onClick={() => playSample("Trap / Hip Hop", tracks["Trap / Hip Hop"])} type="button">
        Trap / Hip Hop sample
      </button>
      <button className="landing-hotspot sample-hard-rock-metal" onClick={() => playSample("Hard Rock/Metal", tracks["Hard Rock/Metal"])} type="button">
        Hard Rock/Metal sample
      </button>
      {player}
    </>
  );
}
