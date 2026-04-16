import Link from "next/link";
import { Fish, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center">
              <Fish size={20} className="text-white" />
            </div>
            <div className="leading-none">
              <span className="font-display font-black text-xl text-white">MeatXpress</span>
              <span className="text-brand-red font-bold text-sm">.pk</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Lahore's freshest fish, beef, mutton & desi chicken — farm to table, always fresh. Delivered within 24 hours.
          </p>
          <a href="https://wa.me/923215402284" target="_blank"
            className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-green-700 transition-colors">
            <MessageCircle size={15} /> WhatsApp Us
          </a>
        </div>

        <div>
          <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              ["All Products", "/shop"],
              ["Fresh Fish", "/shop?cat=fish"],
              ["Beef", "/shop?cat=beef"],
              ["Mutton", "/shop?cat=mutton"],
              ["Desi Chicken", "/shop?cat=chicken"],
              ["Desi Eggs", "/shop?cat=eggs"],
            ].map(([n, h]) => (
              <li key={n}><Link href={h} className="hover:text-white transition-colors">{n}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Delivery Areas</h4>
          <ul className="space-y-1.5 text-xs text-gray-400">
            {["DHA Phase 1–8", "Gulberg", "Model Town", "Cavalry Ground & surroundings", "Sui Gas Society", "Askari 3, 9, 10, 11"].map(a => (
              <li key={a} className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-brand-red rounded-full flex-shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex gap-2">
              <Phone size={14} className="text-brand-red mt-0.5 flex-shrink-0" />
              <a href="tel:03215402284" className="hover:text-white transition-colors">0321-5402284</a>
            </li>
            <li className="flex gap-2">
              <MapPin size={14} className="text-brand-red mt-0.5 flex-shrink-0" />
              <span>Lahore (select areas only)</span>
            </li>
            <li className="flex gap-2">
              <Clock size={14} className="text-brand-red mt-0.5 flex-shrink-0" />
              <span>Mon–Sun: 9am–9pm</span>
            </li>
          </ul>
          <div className="mt-4 space-y-1.5 text-xs">
            <p className="text-gray-300 font-semibold text-sm">Payment & Delivery</p>
            <p className="text-gray-400">✅ Cash on Delivery</p>
            <p className="text-gray-400">✅ JazzCash: 0321-5402284</p>
            <p className="text-gray-400">🚚 Free delivery above Rs 5,000</p>
            <p className="text-gray-400">⏱ Delivered within 24 hours</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-gray-600 text-xs py-4 px-4">
        © {new Date().getFullYear()} MeatXpress.pk — All rights reserved. Delivering freshness in Lahore.
      </div>
    </footer>
  );
}
