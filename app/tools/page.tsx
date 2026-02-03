import type { Metadata } from "next"
import { ToolsList } from "@/components/tools-list"
import { aiTools } from "@/lib/data"

export const metadata: Metadata = {
  title: "Browse AI Tools",
  description: "Explore our complete directory of AI tools. Search, filter, and find the perfect AI-powered solution for writing, design, coding, video, audio, and more.",
}

interface ToolsPageProps {
  searchParams: Promise<{ filter?: string }>
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams
  const initialFilter = params.filter

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Browse AI Tools</h1>
        <p className="mt-2 text-muted-foreground">
          Discover {aiTools.length}+ AI-powered tools across multiple categories.
        </p>
      </div>

      <ToolsList tools={aiTools} initialFilter={initialFilter} />
    </div>
  )
}
