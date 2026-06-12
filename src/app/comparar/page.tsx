import { ComparisonClient } from "@/components/food/ComparisonClient";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ add?: string }>;
}) {
  const { add } = await searchParams;
  return <ComparisonClient initialAddId={add} />;
}
