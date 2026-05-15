export const sampleTracks = [
  { label: "Country Rock", url: "/samples/country-rock-sample.mp3" },
  { label: "90's/2000's Alt Rock", url: "/samples/alt-rock-sample.mp3" },
  { label: "BPM/Dance", url: "" },
  { label: "Pop Punk", url: "" },
  { label: "Trap / Hip Hop", url: "" },
  { label: "Rap Rock/Metal", url: "" },
];

export const defaultSampleTrack = sampleTracks.find((track) => track.url) ?? sampleTracks[0];
