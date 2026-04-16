export interface PieceOption {
  label: string;      // e.g. "1 Piece (~2.5kg)"
  kg: number;         // nominal kg for price calculation
  rangeText: string;  // e.g. "Weight may vary: 2.3–2.7kg"
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  pricePerKg: number;       // price per kg — always present
  salePrice?: number;       // discounted price per kg
  unit: string;             // display unit: "kg" | "piece" | "pack" | "dozen"
  soldByPiece: boolean;     // if true, customer must select a piece option
  pieceOptions?: PieceOption[];
  description: string;
  longDescription: string;
  image: string;
  badge?: string;
  inStock: boolean;
  weight: string;
  origin: string;
  reviews: Review[];
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  // ───────── FISH ─────────
  {
    id: 1, name: "Rahu Fish (Rohu)", slug: "rahu-fish",
    category: "fish", pricePerKg: 850, unit: "kg",
    soldByPiece: true,
    pieceOptions: [
      { label: "1 Piece (~2.5 kg)", kg: 2.5, rangeText: "Weight may vary: 2.3–2.7 kg. Exact weight noted on bill at delivery." },
    ],
    description: "Fresh river Rohu, sold per piece (~2.5 kg). Cleaned and cut to order.",
    longDescription: "Rahu (Rohu) is one of Pakistan's most beloved freshwater fish. Rich in protein and omega-3, perfect for Fish Karahi and Lahori fried fish. Sold per whole piece (~2.5 kg). Actual weight is 2.3–2.7 kg and will be noted on your bill at delivery.",
    image: "https://img.freepik.com/free-photo/top-view-raw-fish-pomegranates-seeds-bowl-knife-table_179666-46476.jpg?semt=ais_rp_50_assets&w=740&q=80",
    badge: "Best Seller", inStock: true, weight: "Per piece ~2.5 kg", origin: "Punjab Rivers",
    reviews: [
      { id: 1, name: "Ahmed Raza", rating: 5, comment: "Best quality fish! Super fresh.", date: "2025-11-15" },
      { id: 2, name: "Fatima Khan", rating: 5, comment: "Made karahi — family loved it!", date: "2026-01-10" },
    ]
  },
  {
    id: 2, name: "River Sole Fish", slug: "river-sole",
    category: "fish", pricePerKg: 1800, unit: "kg",
    soldByPiece: true,
    pieceOptions: [
      { label: "1 Piece (~1.5 kg)", kg: 1.5, rangeText: "Weight may vary: 1.4–1.8 kg. Exact weight noted on bill at delivery." },
    ],
    description: "Delicate river sole, sold per piece (~1.5 kg). Perfect for pan frying.",
    longDescription: "River Sole is prized for its delicate white flesh. Sold per whole piece (~1.5 kg). Actual weight is 1.4–1.8 kg and will be noted on your bill at delivery.",
    image: "https://pickfreshfish.com/cdn/shop/files/Untitleddesign_8.jpg?v=1747650213",
    badge: "Premium", inStock: true, weight: "Per piece ~1.5 kg", origin: "Chenab River",
    reviews: [
      { id: 1, name: "Sara Malik", rating: 5, comment: "Absolutely fresh!", date: "2025-09-12" },
      { id: 2, name: "M Haris", rating: 5, comment: "Boht hee Kamal", date: "2025-08-18" },
      { id: 3, name: "Maria", rating: 5, comment: "Freshest and very reasonable price", date: "2025-12-22" },
      { id: 4, name: "Fahad Sheikh", rating: 5, comment: "ghar main sabko boht pasand ayi", date: "2025-11-01" },
      { id: 5, name: "Irfan Jutt", rating: 5, comment: "Made karahi — family loved it!", date: "2026-01-21" },
    ]
  },
  {
    id: 3, name: "Singhara Fish", slug: "singhara-fish",
    category: "fish", pricePerKg: 1400, unit: "kg",
    soldByPiece: true,
    pieceOptions: [
      { label: "1 Piece (~1.5 kg)", kg: 1.5, rangeText: "Weight may vary: 1.4–1.8 kg. Exact weight noted on bill at delivery." },
    ],
    description: "Farm-raised Singhara, sold per piece (~1.5 kg). Rich flavour, great for karahi.",
    longDescription: "Singhara (Catfish) is a favourite in Lahori cuisine. Sold per whole piece (~1.5 kg). Actual weight is 1.4–1.8 kg and will be noted on your bill at delivery.",
    image: "https://karachi.anbarfish.com/wp-content/uploads/2023/10/Fresh-Longwhiskered-Catfish-Singhara.png.webp",
    inStock: true, weight: "Per piece ~1.5 kg", origin: "Local Farms",
    reviews: [
      { id: 1, name: "Hassan Noor", rating: 5, comment: "Perfect for Salan..", date: "2025-11-14" },
    ]
  },
  {
    id: 4, name: "Chirra Fish", slug: "chirra-fish",
    category: "fish", pricePerKg: 880, unit: "kg",
    soldByPiece: false,
    description: "Small but flavorful Chirra fish, perfect for frying. Sold by kg.",
    longDescription: "Chirra Fish are small, extremely flavorful freshwater fish popular in Punjab. Best enjoyed crispy fried with fresh naan and chutney.",
    image: "https://img.freepik.com/free-photo/black-tilapia-tilapia_1339-851.jpg?semt=ais_hybrid&w=740&q=80",
    badge: "Local Favourite", inStock: true, weight: "Per kg", origin: "Local Rivers",
    reviews: [
      { id: 1, name: "Tariq Butt", rating: 5, comment: "My Childhood's Fav Fish Love it very tasty", date: "2025-11-13" },
      { id: 2, name: "Farhan Ahmad", rating: 5, comment: "Boht hee Kamal", date: "2025-08-18" },
      { id: 3, name: "Sana", rating: 4.9, comment: "ok", date: "2025-12-27" },
      { id: 4, name: "Arslan Khan", rating: 5, comment: "My kids love this fish", date: "2025-10-07" },
      { id: 5, name: "Adeel", rating: 5, comment: "Delivery Time thoda or kam karain kindly baki fresh to hai.", date: "2026-02-22" },
      { id: 6, name: "Ishfaq Gujjar", rating: 5, comment: "Decent rates", date: "2025-10-13" },
      { id: 7, name: "Asif Khalil", rating: 5, comment: "just Wah Wah", date: "2025-12-31" },
      { id: 8, name: "Shakil Ahmed", rating: 5, comment: "pehli bar online order ki hai fish best hai", date: "2026-02-19" },
      { id: 9, name: "Rafey Ali Khan", rating: 4.8, comment: "Good", date: "2026-01-19" },
    ]
  },
  {
    id: 5, name: "Finger Fish (Sole)", slug: "finger-fish",
    category: "fish", pricePerKg: 1100, salePrice: 2200, unit: "pack",
    soldByPiece: false,
    description: "Pre-marinated crispy finger fish, 500g pack. Ready to fry in minutes.",
    longDescription: "Prepared from fresh white fish, marinated in special Pakistani spices, breaded and frozen. Just drop in hot oil for restaurant-quality snack at home.",
    image: "https://www.licious.in/blog/wp-content/uploads/2022/01/Mahi-Finger-Fry-600x600.png",
    badge: "Ready to Cook", inStock: true, weight: "900g pack", origin: "Our Kitchen",
    reviews: [
      { id: 1, name: "Zara Ahmed", rating: 4.6, comment: "Kids absolutely love these!", date: "2024-11-16" },
      { id: 2, name: "Kamran Hussain", rating: 4.9, comment: "Crispy and delicious.", date: "2024-11-11" },
    ]
  },
  {
    id: 6, name: "Masala Fish (Marinated)", slug: "masala-fish",
    category: "fish", pricePerKg: 1400, unit: "kg",
    soldByPiece: false,
    description: "Whole fish marinated in our special Lahori masala blend. Sold by kg.",
    longDescription: "Our signature Masala Fish is marinated in 12 authentic Lahori spices, ginger-garlic paste and lemon. Just grill or fry for an instantly restaurant-quality dish.",
    image: "https://img.freepik.com/free-photo/top-view-raw-fish-black-pepper-pomegranate-seeds-bowls-garlic-knife-table_179666-46460.jpg?semt=ais_hybrid&w=740&q=80",
    badge: "Chef's Special", inStock: true, weight: "Per kg", origin: "Our Kitchen",
    reviews: [
      { id: 1, name: "Imran Chaudhry", rating: 5, comment: "Incredible! Tastes like a restaurant.", date: "2025-10-15" },
      { id: 2, name: "Khawaja Hussain", rating: 5, comment: "Mazedaar Remind me of Kasuri fish", date: "2025-11-19" }

    ]
  },
  {
    id: 7, name: "Mali Fish", slug: "mali-fish",
    category: "fish", pricePerKg: 1200, unit: "kg",
    soldByPiece: true,
    pieceOptions: [
      { label: "1 Piece (~1.5 kg)", kg: 1.5, rangeText: "Weight may vary: 1.4–2.0 kg. Exact weight noted on bill at delivery." },
    ],
    description: "Fresh Mali fish, sold per piece (~1.5 kg). Delicate and flavourful.",
    longDescription: "Mali Fish is a prized freshwater fish known for its tender, flaky meat. Sold per whole piece (~1.5 kg). Actual weight is 1.4–2.0 kg and will be noted on your bill at delivery.",
    image: "https://gunmahalalfood.com/_next/image?url=https%3A%2F%2Fapi.gunmahalalfood.com%2Fuploads%2Fproduct%2Ffresh-boal-fish-big-size-cut-28kg-3kg-20250730054521-688932e11765c.webp&w=3840&q=75",
    inStock: true, weight: "Per piece ~1.5 kg", origin: "Punjab Rivers",
    reviews: [
      { id: 1, name: "Bilal Ahmed", rating: 5, comment: "Very fresh, great taste!", date: "2025-09-08" },
    ]
  },

  // ───────── CHICKEN ─────────
  {
    id: 8, name: "Desi Chicken (Whole)", slug: "desi-chicken",
    category: "chicken", pricePerKg: 1850, unit: "piece",
    soldByPiece: false,
    description: "Farm-raised free-range desi chicken. No hormones, no antibiotics.",
    longDescription: "Our Desi Chicken are raised on natural grain feed in open farms. Free from hormones and antibiotics. Perfect for Karahi, Dum Pukht, and Yakhni Pulao. Approx 1–1.5 kg per piece.",
    image: "https://img.freepik.com/free-photo/beautiful-rooster-side-view_23-2148573822.jpg?semt=ais_hybrid&w=740&q=80",
    badge: "Farm Fresh", inStock: true, weight: "1–1.5 kg approx", origin: "Lahore Farms",
    reviews: [
      { id: 1, name: "Asim Raza", rating: 5, comment: "Real desi taste!", date: "2025-11-14" },
      { id: 2, name: "Rubina Haider", rating: 5, comment: "Much better than market chicken.", date: "2025-11-09" },
    ]
  },

  // ───────── EGGS ─────────
  {
    id: 9, name: "Desi Eggs (Dozen)", slug: "desi-eggs",
    category: "eggs", pricePerKg: 850, unit: "dozen",
    soldByPiece: false,
    description: "Fresh desi eggs from free-range hens. Rich golden yolks.",
    longDescription: "Our Desi Eggs come from free-range hens fed on natural grains. Rich golden-orange yolks, packed with nutrients. Noticeably superior to commercial eggs.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&q=80",
    badge: "Farm Fresh", inStock: true, weight: "12 eggs", origin: "Local Farms",
    reviews: [
      
    ]
  },

  // ───────── BEEF ─────────
  {
    id: 10, name: "Beef (Fresh Cut)", slug: "beef-fresh",
    category: "beef", pricePerKg: 1200, unit: "kg",
    soldByPiece: false,
    description: "Premium fresh beef, cut to order. Best for karahi and curry.",
    longDescription: "Fresh, premium quality beef sourced from trusted local suppliers. Cut to your preference — boti, karahi cut, or curry pieces. Delivered within 24 hours of slaughter.",
    image: "https://img.freepik.com/premium-photo/prime-choice-flank-steak-raw-beef-meat-marble-board-with-herbs-black-background-top-view_89816-36005.jpg",
    badge: "Fresh Daily", inStock: true, weight: "Per kg", origin: "Local Farms",
    reviews: [
      { id: 1, name: "Usman Ali", rating: 5, comment: "Very tender and fresh!", date: "2025-11-20" },
      { id: 2, name: "Ayesha Khan", rating: 5, comment: "Nice", date: "2025-12-28" },
      { id: 3, name: "Shaban awan", rating: 5, comment: "price is ok", date: "2025-11-30" },
    ]
  },
  {
    id: 11, name: "Beef Veal (Bachray ka Gosht)", slug: "beef-veal",
    category: "beef", pricePerKg: 1800, unit: "kg",
    soldByPiece: false,
    badge: "Premium",
    description: "Tender veal — young beef with delicate flavour. Cut to order.",
    longDescription: "Veal is young beef known for its exceptionally tender, fine-grained meat and delicate flavour. Perfect for nihari, slow-cooked curries, and BBQ. Premium quality, limited daily stock.",
    image: "https://img.freepik.com/premium-photo/raw-beef-meat-fresh-sliced-beef-sirloin_745171-3457.jpg?semt=ais_hybrid&w=740&q=80",
    inStock: true, weight: "Per kg", origin: "Local Farms",
    reviews: [
      { id: 1, name: "Naveed Khan", rating: 5, comment: "Best veal in Lahore!", date: "2025-08-19" },
    ]
  },
  {
    id: 12, name: "Beef Mince (Qeema)", slug: "beef-mince",
    category: "beef", pricePerKg: 1600, unit: "kg",
    soldByPiece: false,
    description: "Freshly minced beef. Perfect for qeema, burgers and keema naan.",
    longDescription: "Freshly minced from premium cuts. No added fat or fillers. Perfect for traditional qeema, keema naan, shammi kabab, burgers and pasta. Minced fresh to order.",
    image: "https://img.freepik.com/free-photo/top-view-meat-plate-with-tomatoes-herbs_23-2148611033.jpg?semt=ais_hybrid&w=740&q=80",
    inStock: true, weight: "Per kg", origin: "Local Farms",
    reviews: [
      
    ]
  },
  {
    id: 13, name: "Beef Boneless", slug: "beef-boneless",
    category: "beef", pricePerKg: 1600, unit: "kg",
    soldByPiece: false,
    description: "Premium boneless beef pieces. Ready for biryani, handi and BBQ.",
    longDescription: "Boneless premium beef cuts, trimmed of excess fat. Ideal for biryani, beef handi, stir fry, or BBQ. Each piece is portioned for quick, even cooking.",
    image: "https://img.freepik.com/premium-photo/cubed-beef-sirloin-wood-cutting-board_198639-84811.jpg",
    badge: "Popular", inStock: true, weight: "Per kg", origin: "Local Farms",
    reviews: [
      
    ]
  },
  {
    id: 14, name: "Beef Paye (1 Piece)", slug: "beef-paye",
    category: "beef", pricePerKg: 2700, unit: "piece",
    soldByPiece: false,
    description: "Fresh beef paya — 1 piece. Perfect for slow-cooked Lahori paye.",
    longDescription: "Fresh beef trotters (paye), cleaned and ready for the traditional Lahori paye recipe. Sold per piece. Best cooked overnight on low flame for that rich, collagen-rich broth.",
    image: "https://meatone.ae/wp-content/uploads/2024/11/Beef-Paya-768x768.webp",
    inStock: true, weight: "1 piece", origin: "Local Farms",
    reviews: [
      { id: 1, name: "Tariq Mehmood", rating: 5, comment: "Made nihari-style paye. Excellent!", date: "2026-02-16" },
    ]
  },

  // ───────── MUTTON ─────────
  {
    id: 15, name: "Mutton (Fresh Cut)", slug: "mutton-fresh",
    category: "mutton", pricePerKg: 2600, unit: "kg",
    soldByPiece: false,
    badge: "Premium",
    description: "Premium fresh mutton, cut to order. Best for karahi and biryani.",
    longDescription: "Fresh, premium mutton from grass-fed sheep. Cut to your preference — karahi cut, biryani pieces, or boti. Delivered within 24 hours ensuring maximum freshness.",
    image: "https://img.freepik.com/premium-photo/raw-lamb-shanks-meat-marble-board-black-background-top-view_89816-22781.jpg?semt=ais_hybrid&w=740&q=80",
    inStock: true, weight: "Per kg", origin: "Local Farms",
    reviews: [
      
    ]
  },
  {
    id: 16, name: "Mutton Raan (Leg)", slug: "mutton-raan",
    category: "mutton", pricePerKg: 2850, unit: "kg",
    soldByPiece: false,
    badge: "Special Cut",
    description: "Whole mutton leg (raan) — perfect for slow-roasted raan or dum pukht.",
    longDescription: "The whole leg of mutton, ideal for the classic slow-roasted Raan dish. Perfect for special occasions and large gatherings. Marinated and delivered fresh.",
    image: "https://img.freepik.com/premium-photo/ready-cooking-raw-lamb-mutton-leg-with-thigh-black-background-top-view_89816-40816.jpg",
    inStock: true, weight: "Per kg (~1.5–2.5 kg)", origin: "Local Farms",
    reviews: [
      { id: 1, name: "Salman Butt", rating: 5, comment: "Made dum raan — absolutely stunnin", date: "2025-07-20" },
    ]
  },
  {
    id: 17, name: "Mutton Chops", slug: "mutton-chops",
    category: "mutton", pricePerKg: 2900, unit: "kg",
    soldByPiece: false,
    description: "Tender mutton chops — ideal for grilling, BBQ and tawa cooking.",
    longDescription: "Premium mutton rib chops, trimmed and ready for the grill or tawa. Known for their rich marbling and intense flavour. Perfect for BBQ parties and special dinners.",
    image: "https://img.freepik.com/free-photo/top-view-raw-meat-slices-with-greens-dark-background-cow-color-meat-photo-animal-pepper-chicken-raw-free-space_140725-160340.jpg?semt=ais_hybrid&w=740&q=80",
    badge: "BBQ Favourite", inStock: true, weight: "Per kg", origin: "Local Farms",
    reviews: [
      { id: 1, name: "Arslan Qureshi", rating: 5, comment: "Made bbq yummy", date: "2025-09-19" },
    ]
  },
  {
    id: 18, name: "Mutton Dasti (Shoulder)", slug: "mutton-dasti",
    category: "mutton", pricePerKg: 2850, unit: "kg",
    soldByPiece: false,
    description: "Mutton shoulder (dasti) — great for slow curries and karahi.",
    longDescription: "The shoulder cut of mutton, well-marbled and flavourful. Best for slow-cooked dishes like dasti karahi, nihari-style curry, or a classic Lahori handi.",
    image: "https://img.freepik.com/free-photo/top-view-fresh-meat-slice-with-tomatoes-pepper-dark-blue-background-kitchen-animal-cow-chicken-food-color-butcher_179666-45996.jpg?semt=ais_hybrid&w=740&q=80",
    inStock: true, weight: "Per kg", origin: "Local Farms",
    reviews: [
      
    ]
  },
  {
    id: 19, name: "Mutton Paye (4 Pieces)", slug: "mutton-paye",
    category: "mutton", pricePerKg: 1800, unit: "set",
    soldByPiece: false,
    description: "Fresh mutton paye — 4 pieces per set. For authentic Lahori paye.",
    longDescription: "4 fresh mutton trotters, cleaned and ready for traditional Lahori paye. Slow-cook overnight for the richest, most nourishing broth.",
    image: "https://royaldesertfarm.com/wp-content/uploads/2024/09/mn20.jpg",
    inStock: true, weight: "4 pieces / set", origin: "Local Farms",
    reviews: [
      { id: 1, name: "Iqbal Hussain", rating: 5, comment: "taste good", date: "2026-03-17" },
    ]
  },
];

export const categories = [
  { id: "fish",    name: "Fresh Fish",    icon: "🐟", description: "River & freshwater fish", count: 7 },
  { id: "chicken", name: "Desi Chicken",  icon: "🍗", description: "Free-range farm chicken",  count: 1 },
  { id: "beef",    name: "Beef",          icon: "🥩", description: "Fresh cuts & mince",        count: 5 },
  { id: "mutton",  name: "Mutton",        icon: "🍖", description: "Premium fresh mutton",      count: 5 },
  { id: "eggs",    name: "Desi Eggs",     icon: "🥚", description: "Farm fresh eggs",           count: 1 },
];

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug);
}
export function getProductsByCategory(cat: string) {
  return products.filter(p => p.category === cat);
}
