import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "MeatXpress.pk – Fresh Fish, Beef & Desi Chicken | Lahore Delivery",
  description: "Order fresh Rahu, River Sole, Singhara, Chirra, Finger Fish, Masala Fish, Beef, Mutton, Desi Chicken & Eggs. Delivery within 24hrs in DHA, Gulberg, Model Town & select Lahore areas.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: { background: '#1A0A0A', color: '#fff', borderRadius: '12px', fontSize: '14px' },
          }}
        />
        <Header />
        <CartSidebar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
