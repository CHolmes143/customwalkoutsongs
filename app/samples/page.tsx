import { SamplesGrid } from "@/components/SampleAudioPlayer";

export const metadata = {
  title: "Song Samples | Custom Walkout Song",
  description: "Listen to Custom Walkout Song music style samples.",
};

export default function SamplesPage() {
  return (
    <main className="samples-page">
      <section className="samples-hero">
        <div>
          <p className="eyebrow">Custom Walkout Song</p>
          <h1>Song Samples</h1>
          <p>Tap a music style to hear a sample before choosing in the order form.</p>
        </div>
      </section>
      <SamplesGrid />
    </main>
  );
}
