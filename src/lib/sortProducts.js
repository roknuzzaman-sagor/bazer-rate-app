
export function sortProducts(products, mode) {
  const list = [...products];
  if (mode === "price-asc") {
    return list.sort((a, b) => (a.today ?? 0) - (b.today ?? 0));
  }
  if (mode === "price-desc") {
    return list.sort((a, b) => (b.today ?? 0) - (a.today ?? 0));
  }
  return list;
}