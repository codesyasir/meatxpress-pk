import { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://meatxpress.pk";

  // Static pages
  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${baseUrl}/shop`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${baseUrl}/shop?cat=fish`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/shop?cat=beef`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/shop?cat=mutton`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/shop?cat=chicken`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/shop?cat=eggs`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/cart`, priority: 0.5, changeFrequency: "never" as const },
    { url: `${baseUrl}/checkout`, priority: 0.5, changeFrequency: "never" as const },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
  ];

  // Product pages — auto-generated from your products list
  const productPages = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
  }));

  return [...staticPages, ...productPages];
}