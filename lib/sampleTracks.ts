export const sampleTracks = [
  { label: "BPM/Dance", url: "/samples/dance-sample.mp3" },
  { label: "Country", url: "/samples/country-sample.mp3" },
  { label: "Rock", url: "/samples/rock-sample.mp3" },
  { label: "Pop", url: "" },
  { label: "Punk", url: "/samples/punk-sample.mp3" },
  { label: "Rap", url: "/samples/rap-sample.mp3" },
];

export const defaultSampleTrack = sampleTracks.find((track) => track.url) ?? sampleTracks[0];
