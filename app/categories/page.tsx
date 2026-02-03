import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"

export const metadata: Metadata = {
  title: "AI Tool Categories",
  description: "Browse AI tools by category. Find tools for writing, image generation, coding, video, audio, productivity, and more.",
}

const categoryIcons: Record<string, string> = {
  Writing: "Aa",
  "Image Generation": "Img",
  "Code Assistant": "</>",
  Video: "Vid",
  Audio: "Aud",
  Productivity: "Pro",
  Marketing: "Mkt",
  "Data Analysis": "Data",
  "Customer Support": "CS",
  Education: "Edu",
}

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Browse by Category</h1>
        <p className="mt-2 text-muted-foreground">
          Explore AI tools organized by their primary use case.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="group h-full transition-all hover:border-muted-foreground/30">
              <CardContent className="flex flex-col p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-foreground">
                  {categoryIcons[category.name] || category.name.charAt(0)}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{category.count} tools</span>
                  <span className="flex items-center gap-1 text-foreground group-hover:text-primary transition-colors">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
