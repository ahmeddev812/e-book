import type { MetadataRoute } from "next";
import { bookDatabase } from "@/data/books";
import { createSlug } from "@/lib/slug";

const BASE_URL = "https://bookhaven.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const bookPages = Object.values(bookDatabase).map((book) => ({
    url: `${BASE_URL}/books/${createSlug(book.title)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${BASE_URL}/cart`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${BASE_URL}/wishlist`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    ...Object.entries({
      fiction: "fiction", "non-fiction": "Non-Fiction", children: "Children's",
      academic: "Academic", biography: "Biography", poetry: "Poetry",
    }).map(([slug]) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...bookPages];
}
