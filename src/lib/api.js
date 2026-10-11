const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function apiFetch(path) {
    if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL missing");
    const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export function asArray(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.products)) return data.products;
    if (Array.isArray(data?.categories)) return data.categories;
    if (Array.isArray(data?.data)) return data.data;
    return [];
}

const UNIT_BN = {
    kg: "প্রতি কেজি",
    kilo: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    liter: "প্রতি লিটার",
    l: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    gm: "প্রতি গ্রাম",
    gram: "প্রতি গ্রাম",
};

export function unitBn(u) {
    if (!u) return "প্রতি কেজি";
    return UNIT_BN[String(u).toLowerCase()] || `প্রতি ${u}`;
}

export const getProducts = () => apiFetch("/products");
export const getProductsByCategory = (cat) =>
    apiFetch(`/products?category=${encodeURIComponent(cat)}`);
export const getProduct = (slug) => apiFetch(`/products/${slug}`);
export const getCategories = () => apiFetch("/categories");
export const getCategory = (slug) => apiFetch(`/categories/${slug}`);
export async function fetchProductBySlug(slug) {
    if (!slug) throw new Error("slug required");

    const all = await getProducts();
    const list = asArray(all);

    const found = list.find(
        (p) => p.slug === slug || String(p.id) === String(slug)
    );

    if (!found) throw new Error(`Product not found: ${slug}`);
    return found;
}
