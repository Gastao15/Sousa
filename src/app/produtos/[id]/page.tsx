import { notFound } from "next/navigation";
import { getFoodById } from "@/lib/data/foods";
import { ProductDetailClient } from "@/components/food/ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const food = getFoodById(id);

  if (!food) {
    notFound();
  }

  return <ProductDetailClient food={food} />;
}
