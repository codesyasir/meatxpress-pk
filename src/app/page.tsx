import Link from "next/link";
import { ArrowRight, Truck, Shield, Clock, Star, MapPin, ChevronRight, MessageCircle, Flame } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

const ALL_CATEGORIES = [
  { href: "/shop?cat=fish",    img: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800&q=80",    from: "from-blue-950",   to: "to-blue-800",   title: "Fresh Fish",    sub: "Rahu · River Sole · Singhara · Chirra · Mali", badge: "7 Varieties",  emoji: "🐟" },
  { href: "/shop?cat=beef",    img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",  from: "from-red-950",    to: "to-red-800",    title: "Beef",          sub: "Fresh · Mince · Boneless · Veal · Paye",       badge: "5 Cuts",       emoji: "🥩" },
  { href: "/shop?cat=mutton",  img: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&q=80",  from: "from-amber-950",  to: "to-amber-800",  title: "Mutton",        sub: "Fresh · Raan · Chops · Dasti · Paye",          badge: "5 Cuts",       emoji: "🍖" },
  { href: "/shop?cat=chicken", img: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80",  from: "from-orange-950", to: "to-orange-800", title: "Desi Chicken",  sub: "Free-range · No hormones · Farm fresh",         badge: "Daily Stock",  emoji: "🍗" },
  { href: "/shop?cat=eggs",    img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80",  from: "from-yellow-950", to: "to-yellow-800", title: "Desi Eggs",     sub: "Golden yolk · Free-range · Fresh dozen",        badge: "Dozen Pack",   emoji: "🥚" },
];

export default function HomePage() {
  const bestSellers = products.slice(0, 8);

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] md:min-h-[88vh] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=1600&q=80" alt="Fresh fish"
            className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/40 text-brand-red px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5">
              <MapPin size={12} /> Lahore · DHA · Gulberg · Model Town & more
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] mb-4 md:mb-5">
              Fresh Fish,<br />
              <span className="text-brand-red">Beef & Desi</span><br />
              <span className="text-3xl md:text-4xl font-bold text-gray-300">Chicken — Delivered</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
              19 premium products — fish, beef, mutton, desi chicken & eggs. Farm to table, delivered within 24 hours in select Lahore areas.
            </p>

            <div className="flex gap-3 flex-wrap mb-8 md:mb-10">
              <Link href="/shop"
                className="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-900/40 text-sm sm:text-base">
                Shop Now <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/923215402284?text=Hi! I want to order from MeatXpress" target="_blank"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white/10 transition-all text-sm sm:text-base">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>

            <div className="flex gap-6 sm:gap-8">
              {[["500+", "Customers"], ["24hr", "Delivery"], ["19", "Products"]].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-black text-xl sm:text-2xl text-brand-gold">{v}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero product grid — hidden on small screens */}
          <div className="hidden md:grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((p, i) => (
              <Link key={p.id} href={`/product/${p.slug}`} className={`relative rounded-2xl overflow-hidden group block ${i === 0 ? "row-span-2" : ""}`}>
                <div className={i === 0 ? "h-[330px]" : "h-[158px]"}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p className="font-bold text-sm leading-tight">{p.name}</p>
                    <p className="text-brand-gold text-xs font-bold mt-0.5">
                      Rs {(p.salePrice ?? p.pricePerKg).toLocaleString()}/kg
                    </p>
                  </div>
                  {p.badge && <span className="absolute top-2 right-2 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{p.badge}</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ── */}
      <section className="bg-brand-red text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
          {[
            [Truck, "Free Delivery", "Orders above Rs 5,000"],
            [Clock, "Within 24hrs", "Fast delivery"],
            [Shield, "100% Fresh", "Or money back"],
            [Flame, "Premium Quality", "Hand-picked daily"],
          ].map(([Icon, title, sub], i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 sm:px-4 py-3.5 border-r border-red-700 last:border-r-0">
              <Icon size={18} className="opacity-80 flex-shrink-0" />
              <div>
                <p className="font-bold text-xs sm:text-sm">{title as string}</p>
                <p className="text-red-200 text-[10px] sm:text-xs">{sub as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOP BY CATEGORY — ALL 5 ── */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-brand-red font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">Browse</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark">Shop by Category</h2>
        </div>

        {/* Top row: 3 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {ALL_CATEGORIES.slice(0, 3).map(cat => (
            <Link key={cat.href} href={cat.href} className="relative rounded-2xl overflow-hidden h-52 sm:h-60 group block shadow-sm hover:shadow-xl transition-shadow duration-300">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.from} ${cat.to} opacity-75`} />
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                <span className="text-3xl mb-1">{cat.emoji}</span>
                <h3 className="font-display font-black text-xl sm:text-2xl">{cat.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm mt-0.5">{cat.sub}</p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="bg-brand-red text-white text-xs font-bold px-2.5 py-1 rounded-full">{cat.badge}</span>
                  <span className="text-xs font-bold bg-white/15 border border-white/20 px-2.5 py-1 rounded-full group-hover:bg-white/25 transition-colors flex items-center gap-1">
                    Shop <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row: 2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ALL_CATEGORIES.slice(3).map(cat => (
            <Link key={cat.href} href={cat.href} className="relative rounded-2xl overflow-hidden h-48 sm:h-52 group block shadow-sm hover:shadow-xl transition-shadow duration-300">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.from} ${cat.to} opacity-75`} />
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                <span className="text-3xl mb-1">{cat.emoji}</span>
                <h3 className="font-display font-black text-xl sm:text-2xl">{cat.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm mt-0.5">{cat.sub}</p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="bg-brand-red text-white text-xs font-bold px-2.5 py-1 rounded-full">{cat.badge}</span>
                  <span className="text-xs font-bold bg-white/15 border border-white/20 px-2.5 py-1 rounded-full flex items-center gap-1 group-hover:bg-white/25 transition-colors">
                    Shop <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section className="py-10 md:py-12 bg-red-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-7 md:mb-10">
            <div>
              <p className="text-brand-red font-semibold text-xs uppercase tracking-widest mb-1">Most Popular</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark">Best Sellers</h2>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1 text-brand-red font-bold text-sm hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {/* Equal height grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 items-stretch">
            {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-5 text-center sm:hidden">
            <Link href="/shop" className="inline-flex items-center gap-2 text-brand-red font-bold border-2 border-brand-red px-6 py-2.5 rounded-full hover:bg-brand-red hover:text-white transition-all text-sm">
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark">Why Lahore Loves Us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {[
            ["🌊", "Farm to Table", "Our fish come directly from trusted Punjab river farms. No middlemen — cleaned and delivered the same day they arrive."],
            ["🔪", "Cut to Order", "Every order is freshly cleaned, scaled and cut to your preference. Leave a note at checkout."],
            ["🚚", "24hr Delivery", "Order any time and receive your fresh meat and fish within 24 hours. We deliver across select areas of Lahore."],
          ].map(([emoji, title, desc]) => (
            <div key={title as string} className="text-center p-5 md:p-6 bg-white rounded-3xl border border-red-50 hover:border-brand-red/20 hover:shadow-md transition-all">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4">{emoji as string}</div>
              <h3 className="font-display font-bold text-base md:text-lg text-brand-dark mb-1.5 md:mb-2">{title as string}</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{desc as string}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHATSAPP BANNER ── */}
      <section className="bg-gradient-to-br from-green-700 to-green-600 text-white py-12 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">💬</div>
          <h2 className="font-display text-2xl sm:text-3xl font-black mb-2 md:mb-3">Order on WhatsApp</h2>
          <p className="text-green-100 mb-5 md:mb-6 text-sm sm:text-base md:text-lg">Message us your order in seconds. We'll confirm and deliver!</p>
          <a href="https://wa.me/923215402284?text=Hello%20MeatXpress!%20I%27d%20like%20to%20place%20an%20order." target="_blank"
            className="inline-flex items-center gap-3 bg-white text-green-700 font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm sm:text-base md:text-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat: 0321-5402284
          </a>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-brand-red font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-dark">What Lahore Says</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {[
            { name: "Ahmed Raza", loc: "DHA Phase 5", stars: 5, text: "Best fish I've ever ordered online! The Rahu was incredibly fresh. Will definitely order every week." },
            { name: "Sara Malik", loc: "Gulberg III", stars: 5, text: "The Masala Fish was outstanding! Tasted exactly like restaurant quality. Super fast delivery too." },
            { name: "Imran Chaudhry", loc: "Model Town", stars: 5, text: "Desi Chicken is exactly what I was looking for. Far better than market chicken. Highly recommended!" },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 md:p-6 border border-red-50 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-2.5 md:mb-3">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={13} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{r.text}"</p>
              <div className="flex items-center gap-2.5 md:gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-black text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm text-brand-dark">{r.name}</p>
                  <p className="text-gray-400 text-xs">{r.loc}, Lahore</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DELIVERY AREAS ── */}
      <section className="bg-brand-dark text-white py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <MapPin className="mx-auto text-brand-red mb-3" size={26} />
          <h2 className="font-display text-lg sm:text-xl font-bold mb-2">Delivery Areas — Lahore</h2>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["DHA Phase 1–8", "Gulberg", "Model Town", "Cavalry Ground", "Sui Gas Society", "Askari 3", "Askari 9", "Askari 10", "Askari 11"].map(a => (
              <span key={a} className="bg-white/10 border border-white/20 text-white text-xs px-3 py-1.5 rounded-full">{a}</span>
            ))}
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-4">Free delivery on orders above Rs 5,000 · Delivered within 24 hours</p>
        </div>
      </section>
    </div>
  );
}
