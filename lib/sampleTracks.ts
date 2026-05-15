export const sampleTracks = [
  { label: "Country Rock", url: "/samples/country-rock-sample.mp3" },
  { label: "Alt Rock", url: "/samples/alt-rock-sample.mp3" },
  { label: "Pop Punk", url: "/samples/pop-punk-sample.mp3" },
  { label: "Trap / Hip Hop", url: "/samples/trap-hip-hop-sample.mp3" },
  { label: "Hard Rock/Metal", url: "/samples/rap-rock-metal-sample.mp3" },
];

export const defaultSampleTrack = sampleTracks.find((track) => track.url) ?? sampleTracks[0];
