import caseImg from "@/assets/product-case.jpg";
import cableImg from "@/assets/product-cable.jpg";
import earbudsImg from "@/assets/product-earbuds.jpg";
import powerbankImg from "@/assets/product-powerbank.jpg";
import watchImg from "@/assets/product-watch.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sold: number;
  image: string;
  category: string;
  description: string;
  variants: string[];
  flashSale?: boolean;
};

export const categories = [
  { id: "casing", name: "Casing", icon: "📱", color: "oklch(0.94 0.05 152)" },
  { id: "kabel", name: "Kabel", icon: "🔌", color: "oklch(0.96 0.05 70)" },
  { id: "audio", name: "Audio", icon: "🎧", color: "oklch(0.94 0.05 220)" },
  { id: "charger", name: "Charger", icon: "⚡", color: "oklch(0.96 0.05 40)" },
  { id: "watch", name: "Smartwatch", icon: "⌚", color: "oklch(0.94 0.05 280)" },
  { id: "lainnya", name: "Lainnya", icon: "✨", color: "oklch(0.95 0.02 130)" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Casing Silicone Premium iPhone 13",
    price: 89000,
    oldPrice: 149000,
    rating: 4.8,
    sold: 3200,
    image: caseImg,
    category: "casing",
    description:
      "Casing silicone premium dengan lapisan microfiber di dalamnya. Pas presisi, nyaman digenggam, dan melindungi dari benturan ringan.",
    variants: ["Mint", "Hitam", "Pink", "Navy"],
    flashSale: true,
  },
  {
    id: "p2",
    name: "Kabel Fast Charging USB-C 60W",
    price: 45000,
    oldPrice: 79000,
    rating: 4.7,
    sold: 5240,
    image: cableImg,
    category: "kabel",
    description:
      "Kabel braided premium dengan daya hingga 60W. Tahan tarik 10.000+ kali tekuk, kompatibel semua perangkat USB-C.",
    variants: ["1m", "1.5m", "2m"],
    flashSale: true,
  },
  {
    id: "p3",
    name: "Earbuds Wireless Pro X",
    price: 249000,
    oldPrice: 399000,
    rating: 4.9,
    sold: 1850,
    image: earbudsImg,
    category: "audio",
    description:
      "Earbuds dengan ANC, latensi rendah, dan baterai 24 jam total. Suara jernih dengan bass yang dalam.",
    variants: ["Putih", "Hitam"],
    flashSale: true,
  },
  {
    id: "p4",
    name: "Power Bank 10000mAh Fast Charge",
    price: 159000,
    oldPrice: 229000,
    rating: 4.6,
    sold: 2480,
    image: powerbankImg,
    category: "charger",
    description:
      "Power bank slim 10.000 mAh dengan PD 22.5W. Bisa charge HP hingga 3x pengisian penuh.",
    variants: ["Hitam", "Putih"],
  },
  {
    id: "p5",
    name: "Smartwatch Sport GT 5",
    price: 229000,
    rating: 4.5,
    sold: 980,
    image: watchImg,
    category: "watch",
    description:
      "Smartwatch dengan layar AMOLED, monitor jantung 24/7, GPS, dan baterai tahan 14 hari.",
    variants: ["Hijau", "Hitam", "Putih"],
  },
  {
    id: "p6",
    name: "Casing Magnetic MagSafe iPhone 15",
    price: 119000,
    oldPrice: 179000,
    rating: 4.7,
    sold: 1620,
    image: caseImg,
    category: "casing",
    description:
      "Casing dengan magnet MagSafe yang kuat. Kompatibel charger wireless dan aksesoris magnetik.",
    variants: ["Bening", "Hitam Matte"],
  },
];

export const formatRupiah = (n: number) =>
  "Rp " + n.toLocaleString("id-ID");
