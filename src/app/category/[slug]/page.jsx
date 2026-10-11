"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SortDropdown from "@/components/SortDropdown";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import { getCategory, getProductsByCategory, asArray } from "@/lib/api";
import { sortProducts } from "@/lib/sortProducts";
import { toBn } from "@/lib/toBengali";

function CategoryContent() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    setLoading(true);

    Promise.all([
      getCategory(slug).catch(() => null),
      getProductsByCategory(slug).catch(() => null),
    ])
      .then(([catRes, prodRes]) => {
        if (!mounted) return;
        setCategory(catRes?.category || catRes || null);
        setProducts(asArray(prodRes));
      })
      .catch(() => {
        if (!mounted) return;
        setCategory(null);
        setProducts([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [slug]);

  const sorted = sortProducts(products, sort);

  if (!loading && !category && products.length === 0) {
    return (
      <div className="container-main py-10">
        <EmptyState
          icon="🚫"
          title="ক্যাটাগরি খুঁজে পাওয়া যায়নি"
          message="এই ক্যাটাগরির কোনো পণ্য নেই বা লিংকটি সঠিক নয়।"
        />
      </div>
    );
  }

  const icon = category?.icon || "🛒";
  const name = category?.nameBn || slug;

  return (
    <div className="container-main py-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 flex items-center gap-4">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gray-50 flex items-center justify-center text-3xl shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
            {name}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {loading
              ? "লোড হচ্ছে..."
              : `${toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}
          </p>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center justify-end">
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {!loading && products.length > 0 && (
        <p className="text-sm text-gray-500 mt-4 mb-3">
          মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      )}

      {loading ? (
        <ProductGrid loading skeletonCount={6} />
      ) : sorted.length === 0 ? (
        <EmptyState
          icon="🫙"
          title="কোনো পণ্য নেই"
          message="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।"
        />
      ) : (
        <ProductGrid products={sorted} />
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="container-main py-6">
          <div className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse" />
          <div className="mt-4 h-14 bg-white rounded-xl border border-gray-100 animate-pulse" />
          <div className="mt-4">
            <ProductGrid loading skeletonCount={6} />
          </div>
        </div>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}