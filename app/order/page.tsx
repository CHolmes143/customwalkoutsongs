import { OrderForm } from "@/components/OrderForm";
import { OrderSamplesGrid } from "@/components/SampleAudioPlayer";

export const metadata = {
  title: "Order | Custom Walkout Song",
  description: "Order a custom youth baseball walkout song.",
};

export default function OrderPage() {
  return (
    <main className="order-page">
      <section className="order-hero">
        <p className="eyebrow">Custom Walkout Song</p>
        <h1>Order Your Song</h1>
        <p>Fill out the player details below and we&apos;ll get your custom walkout song started.</p>
      </section>
      <OrderForm />
      <OrderSamplesGrid />
    </main>
  );
}
