import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/login", "/sign-in", "/sign-up", "/payment", "/orders", "/profile"],
    },
    sitemap: "https://bookhaven.vercel.app/sitemap.xml",
  };
}
