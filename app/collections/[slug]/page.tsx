import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ToolCard } from "@/components/tool-card"
import { aiTools, getFeaturedTools, getNewTools, getFreeTools } from "@/lib/data"
import type { AITool } from "@/lib/types"

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

interface CollectionData {
  title: string
  description: string
  tools: AITool[]
}

function getCollectionData(slug: string): CollectionData | null {
  const topRatedTools = [...aiTools].sort((a, b) => b.rating - a.rating).slice(0, 10)
  const mostReviewedTools = [...aiTools].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 10)
  const codeTools = aiTools.filter((t) => t.category === "Code Assistant")
  const writingTools = aiTools.filter((t) => t.category === "Writing")
  const creativeTools = aiTools.filter(
    (t) => t.category === "Image Generation" || t.category === "Video" || t.category === "Audio"
  )

  const collections: Record<string, CollectionData> = {
    featured: {
      title: "Featured AI Tools",
      description: "Hand-picked AI tools that are leading the revolution. These are our top recommendations across all categories.",
      tools: getFeaturedTools(),
    },
    new: {
      title: "Newest AI Tools",
      description: "The latest additions to our AI tools directory. Stay ahead of the curve with these fresh releases.",
      tools: getNewTools(),
    },
    free: {
      title: "Free & Freemium AI Tools",
      description: "Start using these AI tools today without spending a dime. Perfect for beginners and budget-conscious users.",
      tools: getFreeTools(),
    },
    "top-rated": {
      title: "Highest Rated AI Tools",
      description: "The cream of the crop. These tools have earned the highest ratings from our community.",
      tools: topRatedTools,
    },
    "most-popular": {
      title: "Most Popular AI Tools",
      description: "The tools with the most engagement and reviews. See what everyone is talking about.",
      tools: mostReviewedTools,
    },
    coding: {
      title: "AI Tools for Developers",
      description: "Code assistants, IDEs, and developer productivity tools powered by AI. Write better code faster.",
      tools: codeTools,
    },
    writing: {
      title: "AI Writing Tools",
      description: "From content creation to grammar checking, these tools help you write better content.",
      tools: writingTools,
    },
    creative: {
      title: "Creative AI Tools",
      description: "Image generation, video production, and audio creation tools for artists and creators.",
      tools: creativeTools,
    },
  }

  return collections[slug] || null
}

const collectionSlugs = ["featured", "new", "free", "top-rated", "most-popular", "coding", "writing", "creative"]

export async function generateStaticParams() {
  return collectionSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollectionData(slug)

  if (!collection) {
    return { title: "Collection Not Found" }
  }

  return {
    title: collection.title,
    description: collection.description,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = getCollectionData(slug)

  if (!collection) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back Button */}
      <Link
        href="/collections"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All collections
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{collection.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{collection.description}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {collection.tools.length} tools in this collection
        </p>
      </div>

      {/* Tools Grid */}
      {collection.tools.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collection.tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-lg font-medium text-foreground">No tools in this collection yet</p>
          <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
        </div>
      )}
    </div>
  )
}
