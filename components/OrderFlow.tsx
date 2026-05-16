"use client";

import { useState } from "react";
import { OrderForm, OrderSuccessPanel } from "@/components/OrderForm";
import { OrderSamplesGrid } from "@/components/SampleAudioPlayer";

export function OrderFlow() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {!submitted ? (
        <>
          <section className="order-hero">
            <p className="eyebrow">Custom Walkout Song</p>
            <h1>Order Your Song</h1>
            <p>Fill out the player details below and we&apos;ll get your custom walkout song started.</p>
          </section>
          <OrderForm onSuccess={() => setSubmitted(true)} />
          <OrderSamplesGrid />
        </>
      ) : (
        <OrderSuccessPanel />
      )}
    </>
  );
}
