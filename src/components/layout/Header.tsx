"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, Phone, MapPin, Fish, Search } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  // FIX: mount guard to prevent hydration mismatch on cart count
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const count = useCartStore(s => s.count());
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  function openCart() { window.dispatchEvent(new CustomEvent("toggle-cart")); }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false); setSearchVal("");
    }
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/shop?cat=fish", label: "Fish" },
    { href: "/shop?cat=chicken", label: "Desi Chicken" },
    { href: "/shop?cat=beef", label: "Beef" },
    { href: "/shop?cat=mutton", label: "Mutton" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="bg-brand-red text-white text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <MapPin size={11} />
          <span>Delivering in <strong>DHA, Gulberg, Model Town & select areas</strong></span>
        </div>
        <a href="tel:03215402284" className="flex items-center gap-1.5 hover:text-red-200 transition-colors">
          <Phone size={11} /><span>0321-5402284</span>
        </a>
      </div>

      <header className={`sticky top-0 z-50 bg-white transition-all duration-200 ${scrolled ? "shadow-md" : "border-b border-red-100"}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center">
              <Fish className="text-white" size={20} />
            </div>
            <div className="leading-none">
              <span className="font-display font-black text-xl text-brand-dark">MeatXpress</span>
              <span className="text-brand-red font-bold text-sm">.pk</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors relative group whitespace-nowrap">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
                <input ref={searchRef} value={searchVal} onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search products..." className="bg-transparent text-sm outline-none w-36" />
                <button type="button" onClick={() => setSearchOpen(false)}><X size={14} className="text-gray-400" /></button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-gray-600 hover:text-brand-red hover:bg-red-50 transition-all">
                <Search size={20} />
              </button>
            )}

            {/* Cart — mount guard prevents hydration mismatch */}
            <button onClick={openCart}
              className="relative p-2 bg-brand-red text-white rounded-xl hover:bg-red-800 transition-colors">
              <ShoppingCart size={20} />
              {mounted && count > 0 && (
                <span className="bounce-in absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-gold text-brand-dark text-[10px] font-black rounded-full flex items-center justify-center leading-none">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="flex py-2.5 border-b border-gray-50 text-sm font-medium text-gray-700 hover:text-brand-red transition-colors">
                {l.label}
              </Link>
            ))}
            <form onSubmit={handleSearch} className="mt-3 flex gap-2">
              <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
                placeholder="Search products..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-red" />
              <button type="submit" className="bg-brand-red text-white px-4 rounded-xl"><Search size={16} /></button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}
