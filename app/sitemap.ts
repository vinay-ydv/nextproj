import type { MetadataRoute } from "next"
import { aiTools, categories } from "@/lib/data"

const baseUrl = "https://ai-toolshub.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = aiTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const collectionSlugs = ["featured", "new", "free", "top-rated", "most-popular", "coding", "writing", "creative"]
  const collectionUrls = collectionSlugs.map((slug) => ({
    url: `${baseUrl}/collections/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...toolUrls,
    ...categoryUrls,
    ...collectionUrls,
  ]
}
