import type { Metadata } from "next";
import OrderDetail from "@/components/order/OrderDetail";

export async function generateMetadata({
  params,
}: PageProps<"/order/[id]">): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order ${id}`,
    description: "Track your KRAFDEV order status and details.",
    robots: { index: false, follow: false },
  };
}

export default async function OrderDetailPage({
  params,
}: PageProps<"/order/[id]">) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <OrderDetail id={id} />
    </div>
  );
}
