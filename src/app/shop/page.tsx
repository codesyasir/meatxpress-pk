"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

function ShopInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // KEY FIX: sync state from URL params every time URL changes
  const catParam = searchParams.get("cat") || "all";
  const searchParam = searchParams.get("search") || "";

  const [selectedCat, setSelectedCat] = useState(catParam);
  const [search, setSearch] = useState(searchParam);
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);

  // Sync with URL whenever searchParams change (fixes clicking nav while on shop page)
  useEffect(() => {
    setSelectedCat(searchParams.get("cat") || "all");
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  function selectCat(cat: string) {
    setSelectedCat(cat);
    // Update URL so back button works
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all") params.delete("cat"); else params.set("cat", cat);
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  }

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCat !== "all") list = list.filter(p => p.category === selectedCat);
    if (search.trim()) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    list = list.filter(p => (p.salePrice ?? p.pricePerKg) <= maxPrice);
    if (sortBy === "price-asc") list.sort((a, b) => (a.salePrice ?? a.pricePerKg) - (b.salePrice ?? b.pricePerKg));
    else if (sortBy === "price-desc") list.sort((a, b) => (b.salePrice ?? b.pricePerKg) - (a.salePrice ?? a.pricePerKg));
    else if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [selectedCat, search, sortBy, maxPrice]);

  const catLabel = categories.find(c => c.id === selectedCat)?.name || "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-black text-brand-dark">
          {selectedCat === "all" ? "All Products" : catLabel}
        </h1>
        <p className="text-gray-400 mt-1 text-sm">{products.length} products · Fresh daily · Lahore delivery within 24hrs</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className={`flex-shrink-0 w-56 space-y-4 ${showFilters ? "fixed inset-y-0 left-0 z-50 bg-white w-72 p-5 overflow-y-auto shadow-2xl" : "hidden md:block"}`}>
          {showFilters && (
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg">Filters</span>
              <button onClick={() => setShowFilters(false)}><X size={20} /></button>
            </div>
          )}

          <div className="bg-white rounded-2xl p-4 border border-red-50 shadow-sm">
            <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
            <div className="space-y-1">
              <button onClick={() => selectCat("all")}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${selectedCat === "all" ? "bg-brand-red text-white" : "hover:bg-red-50 text-gray-600"}`}>
                All Products <span className="ml-1 text-xs opacity-60">({products.length})</span>
              </button>
              {categories.map(c => (
                <button key={c.id} onClick={() => selectCat(c.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${selectedCat === c.id ? "bg-brand-red text-white" : "hover:bg-red-50 text-gray-600"}`}>
                  <span>{c.icon} {c.name}</span>
                  <span className={`text-xs rounded-full px-1.5 ${selectedCat === c.id ? "bg-white/25" : "bg-gray-100 text-gray-500"}`}>{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-red-50 shadow-sm">
            <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-3">Max Price / kg</h3>
            <input type="range" min={300} max={10000} step={100} value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-red" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Rs 300</span>
              <span className="font-bold text-brand-red">Rs {maxPrice.toLocaleString()}</span>
            </div>
          </div>

          <button onClick={() => { selectCat("all"); setSearch(""); setSortBy("default"); setMaxPrice(10000); }}
            className="w-full text-xs text-brand-red border border-brand-red px-4 py-2 rounded-xl hover:bg-brand-red hover:text-white transition-colors font-medium">
            Reset All Filters
          </button>
        </aside>

        {showFilters && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowFilters(false)} />}

        <div className="flex-1 min-w-0">
          <div className="flex gap-2 mb-5 flex-wrap">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-8 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-brand-red" />
              {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={14} /></button>}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-brand-red cursor-pointer">
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">A–Z</option>
            </select>
            <button onClick={() => setShowFilters(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium">
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          <p className="text-xs text-gray-400 mb-4">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-300 gap-3">
              <Search size={40} className="opacity-50" />
              <p className="font-medium text-gray-400">No products found</p>
              <button onClick={() => { setSearch(""); selectCat("all"); setMaxPrice(10000); }}
                className="text-brand-red text-sm underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ShopInner />
    </Suspense>
  );
}
