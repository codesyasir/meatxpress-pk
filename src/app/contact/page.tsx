"use client";
import { useState } from "react";
import { Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
    toast.success("Message sent! We'll reply soon.");
    const msg = encodeURIComponent(`New Contact\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "N/A"}\nMessage: ${form.message}`);
    window.open(`https://wa.me/923215402284?text=${msg}`, "_blank");
  }

  const contactItems = [
    { icon: "phone", label: "Call / WhatsApp", value: "0321-5402284", href: "tel:03215402284" },
    { icon: "whatsapp", label: "WhatsApp", value: "Chat with us now", href: "https://wa.me/923215402284" },
    { icon: "pin", label: "Delivery Area", value: "Lahore, Pakistan only", href: null },
    { icon: "clock", label: "Hours", value: "Mon–Sun: 9am–9pm", href: null },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-2">Get in Touch</p>
        <h1 className="font-display text-4xl md:text-5xl font-black text-brand-dark mb-3">Contact Us</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Have a question or want to place a custom order? We're here every day, 9am–9pm.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: info */}
        <div className="space-y-4">
          <div className="bg-brand-dark rounded-3xl p-8 text-white">
            <h2 className="font-display font-bold text-2xl mb-6">Contact Information</h2>
            <div className="space-y-5">
              {contactItems.map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-red/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.icon === "phone" && <Phone size={18} className="text-brand-red" />}
                    {item.icon === "whatsapp" && <MessageCircle size={18} className="text-brand-red" />}
                    {item.icon === "pin" && <MapPin size={18} className="text-brand-red" />}
                    {item.icon === "clock" && <Clock size={18} className="text-brand-red" />}
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                        className="font-semibold hover:text-brand-gold transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a href="https://wa.me/923215402284?text=Hi MeatXpress! I have a question."
            target="_blank"
            className="flex items-center justify-center gap-3 w-full bg-green-500 text-white font-bold py-4 rounded-2xl hover:bg-green-600 active:scale-95 transition-all text-base">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp Now
          </a>

          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-sm text-gray-600">
            <p className="font-bold text-brand-dark mb-1">📍 Lahore Only</p>
            <p>We deliver in: DHA Phase 1–8, Gulberg, Model Town, Cavalry Ground & surrounding areas, Sui Gas Society, and Askari (3, 9, 10, 11).</p>
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-red-50">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8 gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-500" size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold">Message Sent!</h3>
              <p className="text-gray-500">We'll reply within a few hours. For faster reply, chat on WhatsApp.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", message: "" }); }}
                className="text-brand-red text-sm underline">Send another message</button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-bold text-brand-dark mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors"
                      placeholder="Ahmed Khan" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Phone *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required type="tel"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors"
                      placeholder="0300-1234567" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email (Optional)</label>
                  <input name="email" value={form.email} onChange={handleChange} type="email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors"
                    placeholder="ahmed@email.com" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
                    placeholder="Tell us what you need or ask anything..." />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-brand-red text-white font-bold py-3.5 rounded-xl hover:bg-red-800 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <Send size={16} />}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
