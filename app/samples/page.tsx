import { SamplesGrid } from "@/components/SampleAudioPlayer";

export const metadata = {
  title: "Sample Songs | Custom Walkout Song",
  description: "Listen to Custom Walkout Song sample song types.",
};

export default function SamplesPage() {
  return (
    <main className="samples-page">
      <section className="samples-hero">
        <div>
          <p className="eyebrow">Custom Walkout Song</p>
          <h1>Sample Songs</h1>
          <p>Tap a music style to listen.</p>
        </div>
      </section>
      <SamplesGrid />
    </main>
  );
}
