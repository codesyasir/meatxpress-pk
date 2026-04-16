"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Zap, Star, ChevronDown } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import toast from "react-hot-toast";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(s => s.addItem);
  const [selectedPieceIdx, setSelectedPieceIdx] = useState(0);
  const avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  const piece = product.soldByPiece && product.pieceOptions ? product.pieceOptions[selectedPieceIdx] : null;
  const effectivePricePerKg = product.salePrice ?? product.pricePerKg;
  const linePrice = piece ? effectivePricePerKg * piece.kg : effectivePricePerKg;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    addItem({ id: product.id, name: product.name, pricePerKg: product.pricePerKg, salePrice: product.salePrice, image: product.image, unit: product.unit, pieceLabel: piece?.label, pieceKg: piece?.kg, linePrice });
    toast.success(`✓ ${product.name} added!`);
    setTimeout(() => window.dispatchEvent(new CustomEvent("toggle-cart")), 300);
  }

  function handleBuyNow(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    addItem({ id: product.id, name: product.name, pricePerKg: product.pricePerKg, salePrice: product.salePrice, image: product.image, unit: product.unit, pieceLabel: piece?.label, pieceKg: piece?.kg, linePrice });
    window.location.href = "/checkout";
  }

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      {/* h-full on outer + flex-col + flex-grow on content = equal height cards */}
      <div className="bg-white rounded-2xl overflow-hidden border border-red-50 hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">

        {/* Fixed-height image */}
        <div className="relative h-44 overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={product.image} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {product.badge && (
            <span className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.salePrice && (
            <span className="absolute top-2 right-2 bg-brand-gold text-brand-dark text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">SALE</span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-xs bg-black/60 px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Card body — flex-col + flex-grow ensures same bottom for all cards */}
        <div className="p-3 flex flex-col flex-grow">
          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} className={i < Math.round(avgRating) ? "fill-brand-gold text-brand-gold" : "fill-gray-200 text-gray-200"} />
            ))}
            <span className="text-[10px] text-gray-400 ml-0.5">({product.reviews.length})</span>
          </div>

          {/* Title — fixed 2-line height so prices align */}
          <h3 className="font-display font-bold text-[13px] md:text-[14px] text-brand-dark group-hover:text-brand-red transition-colors leading-snug mb-1"
            style={{ minHeight: "2.4em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-2">
            {product.salePrice ? (
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className="text-brand-red font-black text-sm md:text-base">Rs {product.salePrice.toLocaleString()}</span>
                <span className="text-gray-300 text-xs line-through">Rs {product.pricePerKg.toLocaleString()}</span>
                <span className="text-gray-400 text-[11px]">/kg</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-brand-red font-black text-sm md:text-base">Rs {product.pricePerKg.toLocaleString()}</span>
                <span className="text-gray-400 text-[11px]">
                  /{product.unit === "dozen" || product.unit === "pack" || product.unit === "piece" || product.unit === "set" ? product.unit : "kg"}
                </span>
              </div>
            )}
          </div>

          {/* Piece selector — fixed height container so buttons always align */}
          <div className="mb-2.5" style={{ minHeight: product.soldByPiece ? "3.2rem" : "0" }}>
            {product.soldByPiece && product.pieceOptions && (
              <div onClick={e => e.preventDefault()}>
                <div className="relative">
                  <select value={selectedPieceIdx} onChange={e => setSelectedPieceIdx(Number(e.target.value))}
                    className="w-full appearance-none bg-red-50 border border-red-200 text-brand-dark text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:border-brand-red cursor-pointer">
                    {product.pieceOptions.map((opt, i) => <option key={i} value={i}>{opt.label}</option>)}
                  </select>
                  <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-red pointer-events-none" />
                </div>
                {piece && (
                  <p className="text-brand-red font-black text-xs mt-0.5">≈ Rs {Math.round(effectivePricePerKg * piece.kg).toLocaleString()} / piece</p>
                )}
              </div>
            )}
          </div>

          {/* Buttons — always at bottom thanks to mt-auto */}
          <div className="flex gap-1.5 mt-auto">
            <button onClick={handleAddToCart} disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-1 bg-brand-red text-white text-[11px] font-bold py-2 rounded-xl hover:bg-red-800 active:scale-95 transition-all disabled:opacity-40">
              <ShoppingCart size={11} /> Add
            </button>
            <button onClick={handleBuyNow} disabled={!product.inStock}
              className="flex items-center justify-center gap-1 border-2 border-brand-dark text-brand-dark text-[11px] font-bold px-2.5 py-2 rounded-xl hover:bg-brand-dark hover:text-white active:scale-95 transition-all disabled:opacity-40">
              <Zap size={11} /> Buy
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
