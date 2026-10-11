"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, asArray } from "@/lib/api";
import { toBn } from "@/lib/toBengali";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((data) => mounted && setProducts(asArray(data)))
      .catch(() => mounted && setProducts([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  /* Section A: top 6 risers (change.pct > 0, sorted desc) */
  const risers = [...products]
    .filter((p) => (p.change?.pct ?? 0) > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  /* Section B: top 6 fallers (change.pct < 0, sorted asc = most negative first) */
  const fallers = [...products]
    .filter((p) => (p.change?.pct ?? 0) < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="container-main pb-10">
      <Hero />

      {/* Section A — আজ দাম বেড়েছে */}
      <section className="mt-6">
        <SectionHeader title="▲ আজ দাম বেড়েছে" tone="up" />
        <ProductGrid products={risers} loading={loading} skeletonCount={6} />
      </section>

      {/* Section B — আজ দাম কমেছে */}
      <section className="mt-10">
        <SectionHeader title="▼ আজ দাম কমেছে" tone="down" />
        <ProductGrid products={fallers} loading={loading} skeletonCount={6} />
      </section>

      {/* Section C — সব পণ্য */}
      <section id="সব-পণ্য" className="mt-10 scroll-mt-24">
        <SectionHeader
          title="সব পণ্য"
          subtitle={
            loading
              ? "লোড হচ্ছে..."
              : `মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`
          }
        />
        <ProductGrid
          products={products}
          loading={loading}
          skeletonCount={9}
        />
      </section>
    </div>
  );
}