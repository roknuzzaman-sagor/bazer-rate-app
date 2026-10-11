import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { toBn } from "@/lib/toBengali";
import { unitBn } from "@/lib/api";

export default function ProductCard({ product }) {
  if (!product) return null;

  const name = product.nameBn || product.slug;
  const emoji = product.image || "🛒";
  const price = product.today ?? 0;
  const unit = unitBn(product.unit);
  const pct = product.change?.pct ?? 0;
  const slug = product.slug;

  return (
    <Link
      href={`/product/${slug}`}
      className="card-base p-4 block hover:-translate-y-0.5 transition-transform"
    >
      <div className="flex gap-3 items-start">
        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-2xl shrink-0">
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{unit}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {toBn(price.toLocaleString("en-US"))} টাকা
          </p>
        </div>
        <ChangeBadge value={pct} />
      </div>
    </Link>
  );
}