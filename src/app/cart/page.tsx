"use client";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Info } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

const FREE_THRESHOLD = 5000;
const DELIVERY_FEE = 200;

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCartStore();
  const subtotal = total();
  const delivery = subtotal >= FREE_THRESHOLD ? 0 : (subtotal > 0 ? DELIVERY_FEE : 0);
  const grandTotal = subtotal + delivery;
  const hasPieceItems = items.some(i => i.pieceLabel);

  if (items.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4">
      <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
        <ShoppingBag size={40} className="text-brand-red opacity-40" />
      </div>
      <h2 className="font-display text-2xl font-bold text-gray-400">Your cart is empty</h2>
      <p className="text-gray-400 text-sm">Add some fresh fish, beef or chicken to get started!</p>
      <Link href="/shop"
        className="bg-brand-red text-white font-bold px-8 py-3.5 rounded-full hover:bg-red-800 active:scale-95 transition-all flex items-center gap-2">
        Browse Products <ArrowRight size={16} />
      </Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-black text-brand-dark mb-8">
        Your Cart <span className="text-gray-400 font-normal text-2xl">({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
      </h1>

      {/* Piece weight notice */}
      {hasPieceItems && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <Info size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>Note about piece items:</strong> Prices shown are approximate based on nominal weight.
            The exact weight will be measured and noted on your bill when delivered. You only pay for the actual weight.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 bg-white p-4 rounded-2xl border border-red-50 hover:border-brand-red/20 transition-colors">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-brand-dark">{item.name}</h3>
                    {item.pieceLabel && (
                      <span className="text-xs bg-red-50 text-brand-red font-medium px-2 py-0.5 rounded-full">{item.pieceLabel}</span>
                    )}
                  </div>
                  <button onClick={() => removeItem(idx)}
                    className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-brand-red font-semibold text-sm mt-1">
                  Rs {item.linePrice.toLocaleString()} / {item.pieceLabel ? "piece" : item.unit}
                  {item.pieceLabel && <span className="text-gray-400 font-normal ml-1">(≈ price)</span>}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
                    <button onClick={() => updateQty(idx, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-brand-red hover:text-white transition-all">
                      <Minus size={13} />
                    </button>
                    <span className="font-black text-sm w-7 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(idx, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:bg-brand-red hover:text-white transition-all">
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-black text-base text-brand-dark">
                    ≈ Rs {Math.round(item.linePrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-red-50 shadow-sm">
            <h3 className="font-display font-bold text-xl mb-5">Order Summary</h3>

            {/* Free delivery progress */}
            {subtotal < FREE_THRESHOLD && subtotal > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Add Rs {(FREE_THRESHOLD - subtotal).toLocaleString()} for free delivery</span>
                  <span className="font-semibold">{Math.round(subtotal / FREE_THRESHOLD * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-brand-red h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, subtotal / FREE_THRESHOLD * 100)}%` }} />
                </div>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-dark">≈ Rs {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className={`font-semibold ${delivery === 0 ? "text-green-600" : "text-brand-dark"}`}>
                  {delivery === 0 ? "FREE 🎉" : `Rs ${delivery}`}
                </span>
              </div>
              {delivery > 0 && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 text-xs text-orange-700">
                  Add <strong>Rs {(FREE_THRESHOLD - subtotal).toLocaleString()}</strong> more for free delivery!
                </div>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-base">
                <span>Total</span>
                <span className="text-brand-red text-lg">≈ Rs {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <Link href="/checkout"
              className="mt-5 flex items-center justify-center gap-2 w-full bg-brand-red text-white font-bold py-3.5 rounded-xl hover:bg-red-800 active:scale-95 transition-all">
              Checkout <ArrowRight size={16} />
            </Link>
            <Link href="/shop"
              className="mt-2 flex items-center justify-center w-full text-gray-500 text-sm font-medium py-2.5 rounded-xl hover:text-brand-dark transition-colors">
              ← Continue Shopping
            </Link>
          </div>

          <div className="bg-red-50 rounded-2xl p-4 border border-red-100 text-sm space-y-2">
            <p className="font-bold text-brand-dark flex items-center gap-1.5">
              <Tag size={14} className="text-brand-red" /> Payment Options
            </p>
            <p className="text-gray-600">✅ Cash on Delivery</p>
            <p className="text-gray-600">✅ JazzCash: <span className="font-semibold">0321-5402284</span></p>
            <p className="text-gray-400 text-xs mt-1">For JazzCash — send screenshot on WhatsApp after payment.</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-gray-700 text-sm">Delivery Areas</p>
            <p>DHA Phase 1–8 · Gulberg · Model Town</p>
            <p>Cavalry Ground · Sui Gas Society</p>
            <p>Askari 3, 9, 10, 11</p>
            <p className="text-brand-red font-medium mt-1">⏱ Delivered within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
