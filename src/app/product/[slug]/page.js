"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import EmptyState from "@/components/EmptyState";
import { fetchProductBySlug, unitBn } from "@/lib/api";
import { toBn } from "@/lib/toBengali";


function ProductSkeleton() {
    return (
        <div className="container-main py-6">
            <div className="h-4 w-48 bg-gray-100 rounded animate-pulse mb-4" />
            <div className="h-32 md:h-36 bg-white rounded-2xl border border-gray-100 animate-pulse" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-24 bg-white rounded-xl border border-gray-100 animate-pulse"
                    />
                ))}
            </div>
            <div className="mt-8 h-64 bg-white rounded-xl border border-gray-100 animate-pulse" />
        </div>
    );
}

function ProductContent() {
    const { slug } = useParams();
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!slug) return;
        let mounted = true;
        setLoading(true);
        setError(false);

        fetchProductBySlug(slug)
            .then((data) => {
                if (!mounted) return;
                setProduct(data || null);
            })
            .catch(() => {
                if (!mounted) return;
                setProduct(null);
                setError(true);
            })
            .finally(() => mounted && setLoading(false));

        return () => {
            mounted = false;
        };
    }, [slug]);


    if (loading) return <ProductSkeleton />;

    if (error || !product) {
        return (
            <div className="container-main py-10">
                <EmptyState
                    icon="🔍"
                    title="পণ্য খুঁজে পাওয়া যায়নি"
                    message="এই পণ্যটি নেই বা লিংকটি সঠিক নয়।"
                />
            </div>
        );
    }


    const name = product.nameBn || product.slug;
    const emoji = product.image || "🛒";
    const unitFull = unitBn(product.unit);
    const unitShort = unitFull.replace(/^প্রতি\s*/, "");
    const catName = product.categoryNameBn || product.category;
    const catSlug = product.category;
    const catIcon = product.categoryIcon || "🛒";

    const today = product.today ?? 0;
    const yesterday = product.yesterday ?? today;
    const diff = today - yesterday;
    const pct = product.change?.pct ?? 0;

    const markets = product.markets || [];

    const mins = markets.map((m) => m.min).filter((n) => typeof n === "number");
    const maxs = markets.map((m) => m.max).filter((n) => typeof n === "number");
    const globalMin = mins.length ? Math.min(...mins) : today;
    const globalMax = maxs.length ? Math.max(...maxs) : today;
    const avg = markets.length
        ? Math.round(
            markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / markets.length
        )
        : today;

    return (
        <div className="container-main py-6">
            {/* ---------- Breadcrumb ---------- */}
            <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5 flex-wrap">
                <Link href="/" className="hover:text-primary">
                    হোম
                </Link>
                <span>›</span>
                {catSlug && (
                    <>
                        <Link
                            href={`/category/${catSlug}`}
                            className="hover:text-primary"
                        >
                            {catName}
                        </Link>
                        <span>›</span>
                    </>
                )}
                <span className="text-gray-800 font-medium">{name}</span>
            </nav>

            {/* ---------- Header card ---------- */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl shrink-0">
                        {emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {name}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {unitFull} · {catName}
                        </p>
                        {diff !== 0 && (
                            <p className="text-sm text-gray-600 mt-2">
                                গতকালের তুলনায় আজ দাম{" "}
                                {diff > 0 ? "বেড়েছে" : "কমেছে"} — {toBn(Math.abs(diff))} টাকা
                            </p>
                        )}
                    </div>

                    {/* today price box */}
                    <div className="bg-gray-50 rounded-xl px-5 py-4 text-center min-w-[150px] shrink-0">
                        <p className="text-xs text-gray-500">আজকের দাম</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">
                            {toBn(today)}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            টাকা / {unitShort}
                        </p>
                        <div className="mt-2 flex justify-center">
                            <ChangeBadge value={pct} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- Price Summary ---------- */}
            <section className="mt-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    দামের সারসংক্ষেপ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                        <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
                        <p className="text-2xl font-bold text-down mt-1">
                            {toBn(globalMin)} টাকা
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            সবচেয়ে কম দামের বাজার
                        </p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                        <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
                        <p className="text-2xl font-bold text-up mt-1">
                            {toBn(globalMax)} টাকা
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            সবচেয়ে বেশি দামের বাজার
                        </p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                        <p className="text-xs text-gray-500">গড় দাম</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                            {toBn(avg)} টাকা
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            প্রতি {unitShort}-র হিসাব
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- Bazar-wise Table ---------- */}
            {markets.length > 0 && (
                <section className="mt-8">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                        বাজারভিত্তিক আজকের দাম
                    </h2>
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                                        <th className="text-left px-4 py-3 font-medium">বাজার</th>
                                        <th className="text-left px-4 py-3 font-medium">বিভাগ</th>
                                        <th className="text-left px-4 py-3 font-medium">
                                            সর্বনিম্ন
                                        </th>
                                        <th className="text-left px-4 py-3 font-medium">
                                            সর্বোচ্চ
                                        </th>
                                        <th className="text-left px-4 py-3 font-medium">গড়</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {markets.map((m, i) => {
                                        const rowAvg = Math.round((m.min + m.max) / 2);
                                        return (
                                            <tr
                                                key={`${m.market}-${i}`}
                                                className="border-t border-gray-100 hover:bg-gray-50/50"
                                            >
                                                <td className="px-4 py-3 text-gray-800 font-medium">
                                                    {m.market}
                                                </td>
                                                <td className="px-4 py-3 text-gray-500">
                                                    {m.division}
                                                </td>
                                                <td className="px-4 py-3 num text-gray-800">
                                                    {toBn(m.min)} টাকা
                                                </td>
                                                <td className="px-4 py-3 num text-gray-800">
                                                    {toBn(m.max)} টাকা
                                                </td>
                                                <td className="px-4 py-3 num text-gray-800 font-medium">
                                                    {toBn(rowAvg)} টাকা
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default function ProductPage() {
    return (
        <Suspense fallback={<ProductSkeleton />}>
            <ProductContent />
        </Suspense>
    );
}