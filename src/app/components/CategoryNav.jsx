"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCategories, asArray } from "@/lib/api";

function CategoryPill({ cat }) {
  const pathname = usePathname();
  const isActive = pathname === `/category/${cat.slug}`;

  return (
    <Link
      href={`/category/${cat.slug}`}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
        isActive
          ? "bg-primary text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span>{cat.icon || "🛒"}</span>
      <span>{cat.nameBn}</span>
    </Link>
  );
}

function PillFallback({ cat }) {
  return (
    <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
      <span>{cat.icon || "🛒"}</span>
      <span>{cat.nameBn}</span>
    </span>
  );
}

export default function CategoryNav() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCategories()
      .then((data) => mounted && setCategories(asArray(data)))
      .catch(() => mounted && setCategories([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <nav className="py-3.5 -mx-4 px-4 flex gap-2 md:justify-center overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-20 rounded-full bg-gray-100 animate-pulse shrink-0"
          />
        ))}
      </nav>
    );
  }

  if (!categories.length) return null;

  return (
    <nav className="py-3.5 -mx-4 px-4 overflow-x-auto no-scrollbar">
      <ul className="flex items-center gap-2 md:gap-3 md:justify-center whitespace-nowrap">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Suspense fallback={<PillFallback cat={cat} />}>
              <CategoryPill cat={cat} />
            </Suspense>
          </li>
        ))}
      </ul>
    </nav>
  );
}