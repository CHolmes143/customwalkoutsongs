export const sampleTracks = [
  { label: "BPM/Dance", url: "/samples/dance-sample.mp3" },
  { label: "Country", url: "/samples/country-sample.mp3" },
  { label: "Pop", url: "" },
  { label: "Rap", url: "/samples/rap-sample.mp3" },
];

export const defaultSampleTrack = sampleTracks.find((track) => track.url) ?? sampleTracks[0];
