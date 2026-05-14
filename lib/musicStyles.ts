export const musicStyleOptions = [
  { label: "Country", sampleUrl: "/samples/country-sample.mp3" },
  { label: "Modern Pop", sampleUrl: "" },
  { label: "80's Rock", sampleUrl: "" },
  { label: "90's Rock", sampleUrl: "" },
  { label: "Rap (Hard)", sampleUrl: "" },
  { label: "Rap Pop", sampleUrl: "" },
  { label: "Dance/BPM", sampleUrl: "" },
];

export const musicStyleLabels = musicStyleOptions.map((style) => style.label);

function normalizeMusicStyle(style: string) {
  if (style === "Country Classic" || style === "Country Modern") return "Country";
  return style;
}

export function encodeMusicStyles(styles: string[]) {
  const allowed = new Set(musicStyleLabels);
  return JSON.stringify([...new Set(styles.map(normalizeMusicStyle).filter((style) => allowed.has(style)))]);
}

export function decodeMusicStyles(value?: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    const normalized = parsed
      .filter((style): style is string => typeof style === "string")
      .map(normalizeMusicStyle)
      .filter((style) => musicStyleLabels.includes(style));
    return [...new Set(normalized)];
  } catch {
    return [];
  }
}

export function musicStyleSummary(value?: string | null) {
  const styles = decodeMusicStyles(value);
  return styles.length > 0 ? styles.join(", ") : "No music styles selected";
}
