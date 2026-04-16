"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Zap, Star, Minus, Plus, ChevronRight, Shield, Truck, Clock, MessageCircle, Info } from "lucide-react";
import { getProductBySlug, products, type Product, type PieceOption } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import toast from "react-hot-toast";
import ProductCard from "@/components/shop/ProductCard";

function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverStar, setHoverStar] = useState(0);
  const [selectedPieceIdx, setSelectedPieceIdx] = useState(0);
  const addItem = useCartStore(s => s.addItem);

  const avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const effectivePricePerKg = product.salePrice ?? product.pricePerKg;

  const piece: PieceOption | null = product.soldByPiece && product.pieceOptions
    ? product.pieceOptions[selectedPieceIdx]
    : null;

  // Line price for one unit
  const unitPrice = piece ? effectivePricePerKg * piece.kg : effectivePricePerKg;
  const totalPrice = unitPrice * qty;

  const canAddToCart = !product.soldByPiece || piece !== null;

  function addToCart() {
    if (!canAddToCart) { toast.error("Please select a piece"); return; }
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id, name: product.name,
        pricePerKg: product.pricePerKg, salePrice: product.salePrice,
        image: product.image, unit: product.unit,
        pieceLabel: piece?.label, pieceKg: piece?.kg,
        linePrice: unitPrice,
      });
    }
    toast.success(`${qty} × ${product.name} added!`);
    window.dispatchEvent(new CustomEvent("toggle-cart"));
  }

  function buyNow() {
    if (!canAddToCart) { toast.error("Please select a piece"); return; }
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id, name: product.name,
        pricePerKg: product.pricePerKg, salePrice: product.salePrice,
        image: product.image, unit: product.unit,
        pieceLabel: piece?.label, pieceKg: piece?.kg,
        linePrice: unitPrice,
      });
    }
    router.push("/checkout");
  }

  function submitReview(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Thank you for your review!");
    setReviewName(""); setReviewText(""); setReviewRating(5);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-brand-red">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-brand-red">Shop</Link>
        <ChevronRight size={12} />
        <Link href={`/shop?cat=${product.category}`} className="hover:text-brand-red capitalize">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-brand-dark">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-square bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-brand-red text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">{product.badge}</span>
          )}
          {product.salePrice && (
            <span className="absolute top-4 right-4 bg-brand-gold text-brand-dark text-sm font-black px-3 py-1.5 rounded-full shadow-lg">SALE</span>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red bg-red-50 px-3 py-1 rounded-full capitalize">
              {product.category === "fish" ? "🐟" : product.category === "chicken" ? "🍗" : product.category === "beef" ? "🥩" : product.category === "mutton" ? "🍖" : "🥚"} {product.category}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {product.inStock ? "✓ In Stock" : "Out of Stock"}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-black text-brand-dark mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className={i < Math.round(avgRating) ? "fill-brand-gold text-brand-gold" : "fill-gray-200 text-gray-200"} />
              ))}
            </div>
            <span className="font-bold text-sm">{avgRating.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">({product.reviews.length} reviews)</span>
          </div>

          {/* Pricing */}
          <div className="bg-red-50 rounded-2xl p-4 mb-5 border border-red-100">
            <div className="flex items-end gap-2 flex-wrap">
              <span className="font-display font-black text-3xl text-brand-red">
                Rs {effectivePricePerKg.toLocaleString()}
              </span>
              {product.salePrice && (
                <span className="text-gray-400 text-xl line-through mb-0.5">Rs {product.pricePerKg.toLocaleString()}</span>
              )}
              <span className="text-gray-500 text-sm mb-0.5">/ kg</span>
            </div>
            {product.salePrice && (
              <p className="text-green-600 text-sm font-semibold mt-1">
                You save Rs {(product.pricePerKg - product.salePrice).toLocaleString()} ({Math.round((product.pricePerKg - product.salePrice) / product.pricePerKg * 100)}% off)
              </p>
            )}
          </div>

          <p className="text-gray-500 leading-relaxed text-sm mb-5">{product.description}</p>

          {/* Piece selector */}
          {product.soldByPiece && product.pieceOptions && (
            <div className="mb-5 bg-white border-2 border-brand-red/20 rounded-2xl p-4">
              <p className="text-sm font-bold text-brand-dark mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 bg-brand-red text-white rounded-full flex items-center justify-center text-xs font-black">1</span>
                Select Piece Size
              </p>
              <div className="space-y-2">
                {product.pieceOptions.map((opt, i) => (
                  <label key={i}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedPieceIdx === i ? "border-brand-red bg-red-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <div className="flex items-center gap-2.5">
                      <input type="radio" name="piece" checked={selectedPieceIdx === i}
                        onChange={() => setSelectedPieceIdx(i)}
                        className="accent-brand-red" />
                      <span className="font-semibold text-sm">{opt.label}</span>
                    </div>
                    <span className="font-black text-brand-red">
                      ≈ Rs {Math.round(effectivePricePerKg * opt.kg).toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>
              {/* Weight variance notice */}
              {piece && (
                <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <Info size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700 leading-relaxed">{piece.rangeText}</p>
                </div>
              )}
            </div>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-2 mb-5 text-sm">
            {[["Weight", product.weight], ["Origin", product.origin], ["Category", product.category], ["Delivery", "Within 24 hrs"]].map(([k, v]) => (
              <div key={k} className="bg-white rounded-xl p-2.5 border border-gray-100">
                <p className="text-gray-400 text-xs">{k}</p>
                <p className="font-semibold capitalize text-brand-dark">{v}</p>
              </div>
            ))}
          </div>

          {/* Qty + real-time total */}
          <div className="mb-4">
            <p className="text-sm font-bold text-brand-dark mb-2 flex items-center gap-1.5">
              {product.soldByPiece && (
                <span className="w-5 h-5 bg-brand-red text-white rounded-full flex items-center justify-center text-xs font-black">2</span>
              )}
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl px-3 py-2.5">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gray-400 hover:text-brand-red transition-colors"><Minus size={16} /></button>
                <span className="font-black text-lg w-8 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-gray-400 hover:text-brand-red transition-colors"><Plus size={16} /></button>
              </div>
              <div className="flex-1 bg-red-50 rounded-xl px-4 py-2.5 border border-red-100">
                <p className="text-xs text-gray-400">
                  {piece ? `${qty} piece${qty > 1 ? "s" : ""} × ≈ Rs ${Math.round(unitPrice).toLocaleString()}` : `${qty} ${product.unit}${qty > 1 ? "s" : ""}`}
                </p>
                <p className="font-black text-brand-red text-xl leading-tight">≈ Rs {Math.round(totalPrice).toLocaleString()}</p>
                {piece && <p className="text-xs text-gray-400 mt-0.5">Exact total at delivery</p>}
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 mb-3">
            <button onClick={addToCart} disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-dark text-white font-bold py-3.5 rounded-2xl hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-40">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button onClick={buyNow} disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-red text-white font-bold py-3.5 rounded-2xl hover:bg-red-800 active:scale-95 transition-all disabled:opacity-40">
              <Zap size={18} /> Buy Now
            </button>
          </div>

          <a href={`https://wa.me/923215402284?text=Hi! I want to order ${qty}x ${product.name}${piece ? ` (${piece.label})` : ""}`}
            target="_blank"
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-semibold py-3 rounded-2xl hover:bg-green-600 transition-colors text-sm">
            <MessageCircle size={16} /> Order via WhatsApp
          </a>

          <div className="flex gap-4 mt-4 flex-wrap">
            {[[Truck, "Free delivery Rs 5,000+"], [Shield, "Freshness guaranteed"], [Clock, "Delivered within 24hrs"]].map(([Icon, text], i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                <Icon size={13} className="text-brand-red flex-shrink-0" />
                {text as string}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-14">
        <div className="flex border-b border-gray-200 mb-6">
          {(["desc", "reviews"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold transition-all ${activeTab === tab ? "border-b-2 border-brand-red text-brand-red" : "text-gray-400 hover:text-gray-700"}`}>
              {tab === "desc" ? "Description" : `Reviews (${product.reviews.length})`}
            </button>
          ))}
        </div>

        {activeTab === "desc" && (
          <div>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">{product.longDescription}</p>
            {product.soldByPiece && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
                <Info size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-amber-800 text-sm">About Piece Weight</p>
                  <p className="text-amber-700 text-sm mt-1">
                    This product is sold per piece. Weight may vary slightly from the stated nominal weight.
                    The exact weight will be measured and noted on your bill when the order is presented at your doorstep.
                    You will only pay for the actual weight delivered.
                  </p>
                </div>
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-4">
              {[["🌊", "100% Fresh", "Sourced fresh daily"],["🔪", "Ready to Cook", "Cleaned on request"],["🚚", "Fast Delivery", "Delivered within 24hrs in Lahore"]].map(([e, t, s]) => (
                <div key={t as string} className="bg-red-50 rounded-2xl p-4 text-center border border-red-100">
                  <div className="text-3xl mb-2">{e as string}</div>
                  <p className="font-bold text-sm text-brand-dark">{t as string}</p>
                  <p className="text-gray-400 text-xs mt-1">{s as string}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl">Customer Reviews</h3>
              {product.reviews.map(r => (
                <div key={r.id} className="bg-white rounded-2xl p-5 border border-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center text-white font-black text-sm">{r.name[0]}</div>
                      <div>
                        <p className="font-bold text-sm">{r.name}</p>
                        <p className="text-gray-400 text-xs">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < r.rating ? "fill-brand-gold text-brand-gold" : "fill-gray-200 text-gray-200"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 border border-red-50 h-fit">
              <h3 className="font-display font-bold text-xl mb-5">Write a Review</h3>
              <form onSubmit={submitReview} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Your Name</label>
                  <input value={reviewName} onChange={e => setReviewName(e.target.value)} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red"
                    placeholder="Ahmed Khan" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} type="button" onClick={() => setReviewRating(s)}
                        onMouseEnter={() => setHoverStar(s)} onMouseLeave={() => setHoverStar(0)}>
                        <Star size={26} className={(hoverStar || reviewRating) >= s ? "fill-brand-gold text-brand-gold" : "fill-gray-200 text-gray-200"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Your Review</label>
                  <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} required rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red resize-none"
                    placeholder="How was the freshness and quality?" />
                </div>
                <button type="submit" className="w-full bg-brand-red text-white font-bold py-3 rounded-xl hover:bg-red-800 active:scale-95 transition-all">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-black text-brand-dark mb-5">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug as string);
  if (!product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="text-xl font-bold text-gray-400">Product not found</p>
      <Link href="/shop" className="bg-brand-red text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-red-800 transition-colors">Back to Shop</Link>
    </div>
  );
  return <ProductDetail product={product} />;
}
