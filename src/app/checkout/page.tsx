"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Truck, CreditCard, MessageCircle, ShoppingBag, ChevronDown, ChevronUp, ArrowRight, Info, Mail } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import toast from "react-hot-toast";

type PayMethod = "cod" | "jazzcash";

const FREE_THRESHOLD = 5000;
const DELIVERY_FEE = 200;
const DELIVERY_AREAS = "DHA Phase 1–8 · Gulberg · Model Town · Cavalry Ground · Sui Gas Society · Askari 3, 9, 10, 11";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [form, setForm] = useState({ name: "", phone: "", address: "", email: "", whatsappOptIn: false, whatsapp: "" });
  const [payMethod, setPayMethod] = useState<PayMethod>("cod");
  const [loading, setLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const [showItems, setShowItems] = useState(false);
  // FIX: capture these before clearing cart
  const [savedTotal, setSavedTotal] = useState(0);
  const [savedDelivery, setSavedDelivery] = useState(0);
  const [savedPayMethod, setSavedPayMethod] = useState<PayMethod>("cod");

  const subtotal = total();
  const delivery = subtotal >= FREE_THRESHOLD ? 0 : (subtotal > 0 ? DELIVERY_FEE : 0);
  const grandTotal = subtotal + delivery;
  const hasPieceItems = items.some(i => i.pieceLabel);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const t = e.target as HTMLInputElement;
    setForm(f => ({ ...f, [t.name]: t.type === "checkbox" ? t.checked : t.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill all required fields"); return;
    }
    setLoading(true);

    const num = `MX-${Date.now().toString().slice(-6)}`;
    // Capture totals before clearing cart
    const capturedSubtotal = subtotal;
    const capturedDelivery = delivery;
    const capturedGrandTotal = grandTotal;

    const payload = {
      orderNum: num,
      name: form.name,
      phone: form.phone,
      address: form.address,
      whatsapp: form.whatsappOptIn ? form.whatsapp : undefined,
      payMethod,
      customerEmail: form.email || undefined,
      items: items.map(i => ({
        name: i.name,
        pieceLabel: i.pieceLabel,
        quantity: i.quantity,
        linePrice: i.linePrice,
      })),
      subtotal: capturedSubtotal,
      delivery: capturedDelivery,
      grandTotal: capturedGrandTotal,
    };

    // Call API to send emails
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) {
      // Email errors don't block the order
    }

    // Save values for success screen BEFORE clearing cart
    setSavedTotal(capturedGrandTotal);
    setSavedDelivery(capturedDelivery);
    setSavedPayMethod(payMethod);
    setOrderNum(num);
    clearCart();
    setLoading(false);
    setOrdered(true);
  }

  if (items.length === 0 && !ordered) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4">
      <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
        <ShoppingBag size={40} className="text-brand-red opacity-40" />
      </div>
      <h2 className="font-display text-2xl font-bold text-gray-400">Your cart is empty</h2>
      <Link href="/shop" className="bg-brand-red text-white font-bold px-8 py-3.5 rounded-full hover:bg-red-800 transition-all flex items-center gap-2">
        Browse Products <ArrowRight size={16} />
      </Link>
    </div>
  );

  // ── SUCCESS SCREEN ──
  if (ordered) return (
    <div className="min-h-screen bg-red-50/30 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="text-green-500" size={40} />
        </div>
        <h1 className="font-display text-3xl font-black text-brand-dark mb-1">Order Placed!</h1>
        <p className="text-gray-400 text-sm mb-5">Order <span className="font-bold text-brand-dark">#{orderNum}</span></p>

        <div className="bg-red-50 rounded-2xl p-5 text-left space-y-2 mb-5 text-sm border border-red-100">
          <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-semibold">{form.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-semibold">{form.phone}</span></div>
          <div className="flex justify-between gap-4"><span className="text-gray-500 flex-shrink-0">Address</span><span className="font-semibold text-right">{form.address}</span></div>
          <div className="flex justify-between border-t border-red-100 pt-2">
            <span className="text-gray-500">Payment</span>
            <span className="font-semibold">{savedPayMethod === "cod" ? "Cash on Delivery" : "JazzCash"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery</span>
            <span className={`font-semibold ${savedDelivery === 0 ? "text-green-600" : ""}`}>
              {savedDelivery === 0 ? "FREE 🎉" : `Rs ${savedDelivery}`}
            </span>
          </div>
          <div className="flex justify-between border-t border-red-100 pt-2">
            <span className="text-gray-500">Est. Total</span>
            {/* Use savedTotal — captured before cart cleared */}
            <span className="font-black text-brand-red text-base">≈ Rs {savedTotal.toLocaleString()}</span>
          </div>
        </div>

        {hasPieceItems && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mb-4 text-xs text-left text-amber-700">
            <strong>Note:</strong> Some items are sold by piece — exact weight & final bill at delivery. You pay for actual weight only.
          </div>
        )}

        {savedPayMethod === "jazzcash" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4 text-sm text-left">
            <p className="font-bold text-yellow-800 mb-1">⚡ JazzCash Payment</p>
            <p className="text-yellow-700">Send <strong>≈ Rs {savedTotal.toLocaleString()}</strong> to <strong>0321-5402284</strong> and send screenshot on WhatsApp.</p>
          </div>
        )}

        {form.email && (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-3 mb-4 text-sm text-green-700 flex items-center gap-2">
            <Mail size={15} />
            <span>Order confirmation sent to <strong>{form.email}</strong></span>
          </div>
        )}

        <p className="text-gray-500 text-sm mb-6">We'll confirm on <strong>{form.phone}</strong>. Delivered within <strong>24 hours</strong>!</p>

        <div className="flex gap-3">
          <Link href="/" className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:border-gray-300 transition-all text-sm">
            Go Home
          </Link>
          <a href="https://wa.me/923215402284" target="_blank"
            className="flex-1 bg-green-500 text-white font-semibold py-3 rounded-xl hover:bg-green-600 transition-all text-sm flex items-center justify-center gap-1.5">
            <MessageCircle size={15} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  // ── CHECKOUT FORM ──
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
      <h1 className="font-display text-2xl md:text-3xl font-black text-brand-dark mb-6 md:mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4 md:space-y-5">

          <div className="bg-white rounded-2xl p-5 md:p-6 border border-red-50 shadow-sm">
            <h2 className="font-display font-bold text-lg md:text-xl mb-4 md:mb-5 flex items-center gap-2">
              <Truck size={18} className="text-brand-red" /> Delivery Information
            </h2>
            <div className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Full Name <span className="text-brand-red">*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all"
                    placeholder="Ahmed Khan" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Phone <span className="text-brand-red">*</span></label>
                  <input name="phone" value={form.phone} onChange={handleChange} required type="tel"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all"
                    placeholder="0300-1234567" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Delivery Address <span className="text-brand-red">*</span></label>
                <textarea name="address" value={form.address} onChange={handleChange} required rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all resize-none"
                  placeholder="House #, Street, Area — e.g. DHA Phase 5, Lahore" />
                <p className="text-xs text-gray-400 mt-1">Delivery in: {DELIVERY_AREAS}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                  Email Address
                  <span className="text-gray-400 font-normal ml-1">(optional — for order confirmation)</span>
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="email" value={form.email} onChange={handleChange} type="email"
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all"
                    placeholder="ahmed@gmail.com" />
                </div>
                <p className="text-xs text-green-600 mt-1">We'll send an order confirmation email to this address</p>
              </div>

              {/* WhatsApp opt-in */}
              <div className="bg-green-50 border border-green-100 rounded-xl p-3.5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="whatsappOptIn" checked={form.whatsappOptIn} onChange={handleChange}
                    className="mt-0.5 accent-green-500 w-4 h-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Get updates on WhatsApp? <span className="text-gray-400 font-normal">(Optional)</span></p>
                    <p className="text-xs text-gray-500 mt-0.5">Receive order status & delivery notifications</p>
                  </div>
                </label>
                {form.whatsappOptIn && (
                  <input name="whatsapp" value={form.whatsapp} onChange={handleChange} type="tel"
                    className="mt-3 w-full border border-green-300 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                    placeholder="WhatsApp number (leave blank to use same number)" />
                )}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-red-50 shadow-sm">
            <h2 className="font-display font-bold text-lg md:text-xl mb-4 md:mb-5 flex items-center gap-2">
              <CreditCard size={18} className="text-brand-red" /> Payment Method
            </h2>
            <div className="space-y-2.5">
              {([
                { id: "cod" as PayMethod, label: "Cash on Delivery", sub: "Pay when your order arrives. No advance needed.", icon: "💵" },
                { id: "jazzcash" as PayMethod, label: "JazzCash", sub: "Send to 0321-5402284 & share screenshot on WhatsApp.", icon: "📱" },
              ]).map(opt => (
                <label key={opt.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${payMethod === opt.id ? "border-brand-red bg-red-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <input type="radio" name="payment" value={opt.id} checked={payMethod === opt.id}
                    onChange={() => setPayMethod(opt.id)} className="mt-0.5 accent-brand-red flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm">{opt.icon} {opt.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{opt.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {hasPieceItems && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm">
              <Info size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-amber-700 text-xs leading-relaxed">Your order includes piece-sold items. Exact weight measured at delivery — you only pay for actual weight.</p>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-brand-red text-white font-black text-base md:text-lg py-4 rounded-2xl hover:bg-red-800 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-red-200">
            {loading ? (
              <><div className="w-5 h-5 border-[3px] border-white border-t-transparent rounded-full animate-spin" /> Placing Order...</>
            ) : (
              <>Place Order — ≈ Rs {grandTotal.toLocaleString()}</>
            )}
          </button>
        </form>

        {/* Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-red-50 shadow-sm">
            <button className="flex items-center justify-between w-full" onClick={() => setShowItems(v => !v)}>
              <span className="font-display font-bold text-base md:text-lg text-brand-dark">
                Order Summary
                <span className="text-gray-400 font-normal text-sm ml-1.5">({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              </span>
              {showItems ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </button>

            {showItems && (
              <div className="space-y-3 mt-4 border-t border-gray-50 pt-4">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.name}</p>
                      {item.pieceLabel && <p className="text-xs text-gray-400">{item.pieceLabel}</p>}
                      <p className="text-xs text-gray-400">× {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">≈ Rs {Math.round(item.linePrice * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}

            {subtotal < FREE_THRESHOLD && subtotal > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Rs {(FREE_THRESHOLD - subtotal).toLocaleString()} from free delivery</span>
                  <span>{Math.round(subtotal / FREE_THRESHOLD * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-brand-red h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(100, subtotal / FREE_THRESHOLD * 100)}%` }} />
                </div>
              </div>
            )}

            <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mt-4">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>≈ Rs {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className={delivery === 0 ? "text-green-600 font-semibold" : ""}>{delivery === 0 ? "FREE 🎉" : `Rs ${delivery}`}</span>
              </div>
              <div className="flex justify-between font-black text-base border-t border-gray-100 pt-2.5">
                <span>Est. Total</span><span className="text-brand-red text-lg">≈ Rs {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-2xl p-4 text-xs text-gray-500 space-y-1.5 border border-red-100">
            <p className="font-bold text-gray-700 text-sm mb-1.5">Delivery Info</p>
            <p>📍 {DELIVERY_AREAS}</p>
            <p>⏱ Delivered within 24 hours</p>
            <p>🚚 Free delivery above Rs 5,000</p>
            <p>💵 Cash on Delivery accepted</p>
            <p>📱 JazzCash: 0321-5402284</p>
          </div>
        </div>
      </div>
    </div>
  );
}
