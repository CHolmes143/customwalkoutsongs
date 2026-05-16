import { OrderFlow } from "@/components/OrderFlow";

export const metadata = {
  title: "Order | Custom Walkout Song",
  description: "Order a custom youth baseball walkout song.",
};

export default function OrderPage() {
  return (
    <main className="order-page">
      <OrderFlow />
    </main>
  );
}
