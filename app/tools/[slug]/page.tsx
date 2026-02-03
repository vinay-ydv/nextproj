import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Calendar,
  Tag,
  CheckCircle2,
  Lightbulb,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ToolCard } from "@/components/tool-card"
import { aiTools, getToolBySlug, getToolsByCategory } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return aiTools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return { title: "Tool Not Found" }
  }

  return {
    title: `${tool.name} - AI Tool Review`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - AI Tool Review | AI ToolsHub`,
      description: tool.shortDescription,
    },
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back Button */}
      <Link
        href="/tools"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all tools
      </Link>

      {/* Hero Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl font-bold text-foreground">
              {tool.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground">{tool.name}</h1>
                {tool.isNew && (
                  <Badge className="bg-chart-1 text-foreground">
                    <Sparkles className="mr-1 h-3 w-3" />
                    New
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-lg text-muted-foreground">{tool.shortDescription}</p>
              
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-chart-5 text-chart-5" />
                  <span className="font-semibold text-foreground">{tool.rating}</span>
                  <span className="text-muted-foreground">
                    ({tool.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className={cn(
                    tool.pricing === "Free" && "bg-chart-1/20 text-chart-1",
                    tool.pricing === "Freemium" && "bg-chart-2/20 text-chart-2",
                    tool.pricing === "Paid" && "bg-chart-4/20 text-chart-4",
                    tool.pricing === "Enterprise" && "bg-chart-3/20 text-chart-3"
                  )}
                >
                  {tool.pricing}
                </Badge>
                <Link
                  href={`/categories/${tool.category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tool.category}
                </Link>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>About {tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{tool.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-chart-1" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 sm:grid-cols-2">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-1" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-chart-5" />
                Use Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 sm:grid-cols-2">
                {tool.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-chart-5" />
                    <span className="text-muted-foreground">{useCase}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="mt-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <Tag className="h-4 w-4" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* CTA Card */}
            <Card className="border-primary/20 bg-gradient-to-b from-card to-card/50">
              <CardContent className="p-6">
                <Button asChild className="w-full" size="lg">
                  <a href={tool.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Opens in a new tab
                </p>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tool Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Link
                    href={`/categories/${tool.category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm font-medium text-foreground hover:underline"
                  >
                    {tool.category}
                  </Link>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pricing</span>
                  <span className="text-sm font-medium text-foreground">{tool.pricing}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Launch Date</span>
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(tool.launchDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-chart-5 text-chart-5" />
                    {tool.rating} / 5.0
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Related Tools</h2>
              <p className="mt-1 text-muted-foreground">
                More tools in {tool.category}
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link href={`/categories/${tool.category.toLowerCase().replace(/\s+/g, "-")}`}>
                View all
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((relatedTool) => (
              <ToolCard key={relatedTool.id} tool={relatedTool} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
