import ProductCard from "./ProductCard";

function SkeletonCard() {
  return (
    <div className="card-base p-4 animate-pulse">
      <div className="flex gap-3 items-start">
        <div className="w-12 h-12 rounded-lg bg-gray-100" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-100 rounded w-16" />
          <div className="h-5 bg-gray-100 rounded w-24" />
        </div>
        <div className="h-6 bg-gray-100 rounded w-16" />
      </div>
    </div>
  );
}

export default function ProductGrid({
  products = [],
  loading = false,
  skeletonCount = 6,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id ?? p.slug} product={p} />
      ))}
    </div>
  );
}