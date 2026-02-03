import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolCard } from "@/components/tool-card"
import { aiTools, categories, getFeaturedTools, getNewTools } from "@/lib/data"

export default function HomePage() {
  const featuredTools = getFeaturedTools().slice(0, 6)
  const newTools = getNewTools().slice(0, 4)
  const totalTools = aiTools.length
  const totalCategories = categories.length

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-chart-2/10 via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="mr-1.5 h-3 w-3" />
              {totalTools}+ AI Tools Cataloged
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Discover the Best{" "}
              <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-4 bg-clip-text text-transparent">
                AI Tools
              </span>{" "}
              for Every Task
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-balance">
              Explore our curated directory of {totalTools}+ AI-powered solutions across {totalCategories} categories. 
              Find the perfect tool for writing, design, coding, video production, and more.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/tools">
                  Browse All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <Link href="/categories">
                  Explore Categories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{totalTools}+</p>
              <p className="mt-1 text-sm text-muted-foreground">AI Tools</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{totalCategories}</p>
              <p className="mt-1 text-sm text-muted-foreground">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">100K+</p>
              <p className="mt-1 text-sm text-muted-foreground">Monthly Visitors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">4.8</p>
              <p className="mt-1 text-sm text-muted-foreground">Avg. Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <Badge variant="secondary" className="mb-3">
                <TrendingUp className="mr-1.5 h-3 w-3" />
                Featured
              </Badge>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Top AI Tools
              </h2>
              <p className="mt-2 text-muted-foreground">
                Hand-picked tools that are leading the AI revolution.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href="/tools">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} variant="featured" />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/tools">
                View all tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="border-y border-border bg-card/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Browse by Category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Find AI tools organized by their primary use case.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-muted-foreground/30 hover:bg-accent/50"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category.count} tools
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Tools */}
      {newTools.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <Badge variant="secondary" className="mb-3 bg-chart-1/20 text-chart-1">
                  <Sparkles className="mr-1.5 h-3 w-3" />
                  Recently Added
                </Badge>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  New AI Tools
                </h2>
                <p className="mt-2 text-muted-foreground">
                  The latest additions to our directory.
                </p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link href="/tools?filter=new">
                  View all new
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {newTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="border-t border-border bg-card/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Why AI ToolsHub?
            </h2>
            <p className="mt-2 text-muted-foreground">
              We make it easy to find and compare the best AI tools.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-chart-1/20">
                <Zap className="h-6 w-6 text-chart-1" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Curated Selection</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every tool is hand-picked and verified for quality and usefulness.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-chart-2/20">
                <Shield className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Unbiased Reviews</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Honest ratings and reviews from real users, not sponsored content.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-chart-4/20">
                <TrendingUp className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Always Updated</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                New tools added weekly. Stay ahead of the AI curve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-chart-2/5 via-transparent to-chart-4/5" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Ready to supercharge your workflow?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Explore our complete directory and find the perfect AI tools for your needs.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/tools">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
