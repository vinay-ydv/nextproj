import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap, DollarSign, Star, TrendingUp, Code } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aiTools, getFeaturedTools, getNewTools, getFreeTools } from "@/lib/data"

export const metadata: Metadata = {
  title: "AI Tool Collections",
  description: "Curated collections of AI tools. Discover the best free tools, highest-rated tools, newest additions, and more.",
}

// Generate collection data
const topRatedTools = [...aiTools].sort((a, b) => b.rating - a.rating).slice(0, 10)
const mostReviewedTools = [...aiTools].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 10)
const codeTools = aiTools.filter((t) => t.category === "Code Assistant")
const writingTools = aiTools.filter((t) => t.category === "Writing")
const creativeTools = aiTools.filter(
  (t) => t.category === "Image Generation" || t.category === "Video" || t.category === "Audio"
)

const collections = [
  {
    slug: "featured",
    title: "Featured Tools",
    description: "Hand-picked AI tools that are leading the revolution.",
    icon: Star,
    color: "chart-5",
    count: getFeaturedTools().length,
  },
  {
    slug: "new",
    title: "Newest Additions",
    description: "Recently added tools to our directory.",
    icon: Sparkles,
    color: "chart-1",
    count: getNewTools().length,
  },
  {
    slug: "free",
    title: "Free & Freemium",
    description: "AI tools you can start using today for free.",
    icon: DollarSign,
    color: "chart-2",
    count: getFreeTools().length,
  },
  {
    slug: "top-rated",
    title: "Highest Rated",
    description: "The best-rated AI tools according to user reviews.",
    icon: TrendingUp,
    color: "chart-4",
    count: topRatedTools.length,
  },
  {
    slug: "most-popular",
    title: "Most Popular",
    description: "Tools with the highest number of user reviews.",
    icon: Zap,
    color: "chart-3",
    count: mostReviewedTools.length,
  },
  {
    slug: "coding",
    title: "AI for Developers",
    description: "Code assistants and developer productivity tools.",
    icon: Code,
    color: "chart-1",
    count: codeTools.length,
  },
]

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">AI Tool Collections</h1>
        <p className="mt-2 text-muted-foreground">
          Curated collections to help you find the perfect AI tools.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => {
          const Icon = collection.icon
          return (
            <Link key={collection.slug} href={`/collections/${collection.slug}`}>
              <Card className="group h-full transition-all hover:border-muted-foreground/30">
                <CardContent className="flex flex-col p-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${collection.color}/20`}
                  >
                    <Icon className={`h-6 w-6 text-${collection.color}`} />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {collection.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {collection.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant="secondary">{collection.count} tools</Badge>
                    <span className="flex items-center gap-1 text-sm text-foreground group-hover:text-primary transition-colors">
                      Browse
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
