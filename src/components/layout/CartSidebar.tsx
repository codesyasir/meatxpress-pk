"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export default function CartSidebar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQty, total } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const fn = () => setOpen(v => !v);
    window.addEventListener("toggle-cart", fn);
    return () => window.removeEventListener("toggle-cart", fn);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, mounted]);

  const subtotal = total();
  const FREE_DELIVERY_THRESHOLD = 5000;
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : (subtotal > 0 ? 200 : 0);

  if (!mounted) return null;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-[99] backdrop-blur-sm" onClick={() => setOpen(false)} />}

      <div className={`fixed top-0 right-0 h-full w-full max-w-[390px] bg-white z-[100] flex flex-col shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>

        <div className="flex items-center justify-between px-5 py-4 bg-brand-red text-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <span className="font-display font-bold text-lg">Your Cart</span>
            {items.length > 0 && (
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                <ShoppingBag size={32} className="text-brand-red opacity-40" />
              </div>
              <p className="font-display font-bold text-gray-400 text-lg">Cart is empty</p>
              <Link href="/shop" onClick={() => setOpen(false)}
                className="bg-brand-red text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-red-800 transition-colors">
                Browse Products
              </Link>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate text-brand-dark">{item.name}</p>
                  {item.pieceLabel && (
                    <p className="text-xs text-gray-500">{item.pieceLabel}</p>
                  )}
                  <p className="text-brand-red font-bold text-sm">
                    Rs {item.linePrice.toLocaleString()} / {item.pieceLabel ? "piece" : item.unit}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5">
                      <button onClick={() => updateQty(idx, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:bg-brand-red hover:text-white transition-colors">
                        <Minus size={11} />
                      </button>
                      <span className="font-bold text-sm w-5 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(idx, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:bg-brand-red hover:text-white transition-colors">
                        <Plus size={11} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-brand-dark">
                        ≈ Rs {Math.round(item.linePrice * item.quantity).toLocaleString()}
                      </span>
                      <button onClick={() => removeItem(idx)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-gray-100 p-4 space-y-3 bg-white">
            {/* Free delivery progress */}
            {subtotal < FREE_DELIVERY_THRESHOLD && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Add Rs {(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()} for free delivery</span>
                  <span>{Math.round(subtotal / FREE_DELIVERY_THRESHOLD * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-brand-red h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, subtotal / FREE_DELIVERY_THRESHOLD * 100)}%` }} />
                </div>
              </div>
            )}

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-medium text-brand-dark">≈ Rs {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className={`font-medium ${delivery === 0 ? "text-green-600" : "text-brand-dark"}`}>
                  {delivery === 0 ? "FREE 🎉" : `Rs ${delivery}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1.5 border-t border-gray-100">
                <span>Total</span>
                <span className="text-brand-red">≈ Rs {(subtotal + delivery).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg leading-relaxed">
              ⚖️ Final amount may vary slightly for piece-sold items. Exact weight noted on bill at delivery.
            </p>

            <Link href="/checkout" onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-brand-red text-white font-bold py-3.5 rounded-xl hover:bg-red-800 active:scale-[0.98] transition-all">
              Checkout <ArrowRight size={16} />
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl hover:border-gray-300 transition-all text-sm">
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
