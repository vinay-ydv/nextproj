import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ToolCard } from "@/components/tool-card"
import { categories, getCategoryBySlug, getToolsByCategory } from "@/lib/data"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${category.name} AI Tools`,
    description: `${category.description} Browse ${category.count} curated AI tools in the ${category.name} category.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const tools = getToolsByCategory(category.name)
  const sortedTools = tools.sort((a, b) => b.rating - a.rating)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back Button */}
      <Link
        href="/categories"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All categories
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{category.name} AI Tools</h1>
        <p className="mt-2 text-lg text-muted-foreground">{category.description}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {category.count} tools available
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
