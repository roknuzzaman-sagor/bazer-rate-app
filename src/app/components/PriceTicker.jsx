"use client";
import { useEffect, useState } from "react";
import { getProducts, asArray, unitBn } from "@/lib/api";
import { toBn } from "@/lib/toBengali";

function TickerItem({ product }) {
  const name = product.nameBn || product.slug;
  const emoji = product.image || "🛒";
  const price = product.today ?? 0;
  const unit = unitBn(product.unit);
  const unitShort = unit.replace(/^প্রতি\s*/, "/");
  const pct = product.change?.pct ?? 0;

  const badge =
    pct > 0
      ? { text: `▲ ${toBn(pct.toFixed(1))}%`, cls: "text-up" }
      : pct < 0
      ? { text: `▼ ${toBn(Math.abs(pct).toFixed(1))}%`, cls: "text-down" }
      : { text: "— ০.০%", cls: "text-flat" };

  return (
    <div className="flex items-center gap-3 px-6 py-2.5 border-r border-gray-200 shrink-0">
      <span className="text-xl">{emoji}</span>
      <span className="text-sm font-medium text-gray-800">{name}</span>
      <span className="text-sm font-semibold text-gray-900">
        {toBn(price.toLocaleString("en-US"))} টাকা{unitShort}
      </span>
      <span className={`text-xs font-bold ${badge.cls}`}>{badge.text}</span>
    </div>
  );
}

export default function PriceTicker() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((data) => mounted && setItems(asArray(data).slice(0, 12)))
      .catch(() => mounted && setItems([]));
    return () => { mounted = false; };
  }, []);

  if (!items.length) {
    return <div className="bg-white border-b border-gray-100 h-[42px]" />;
  }

  const doubled = [...items, ...items];

  return (
    <div className="bg-white border-b border-gray-100 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {doubled.map((p, i) => (
          <TickerItem key={`${p.id}-${i}`} product={p} />
        ))}
      </div>
    </div>
  );
}