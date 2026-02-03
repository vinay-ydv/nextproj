import Link from "next/link"
import { Star, ExternalLink, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { AITool } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  tool: AITool
  variant?: "default" | "featured"
}

export function ToolCard({ tool, variant = "default" }: ToolCardProps) {
  const isFeatured = variant === "featured"

  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card
        className={cn(
          "group relative h-full overflow-hidden transition-all duration-300 hover:border-muted-foreground/30",
          isFeatured && "border-primary/20 bg-gradient-to-b from-card to-card/50"
        )}
      >
        {tool.isNew && (
          <div className="absolute right-3 top-3 z-10">
            <Badge variant="default" className="bg-chart-1 text-foreground">
              <Sparkles className="mr-1 h-3 w-3" />
              New
            </Badge>
          </div>
        )}
        <CardContent className="flex flex-col gap-4 p-5">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-foreground">
              {tool.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{tool.category}</p>
            </div>
          </div>

          {/* Description */}
          <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {tool.shortDescription}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-chart-5 text-chart-5" />
              <span className="text-sm font-medium text-foreground">{tool.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({tool.reviewCount.toLocaleString()})
              </span>
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "text-xs",
                tool.pricing === "Free" && "bg-chart-1/20 text-chart-1",
                tool.pricing === "Freemium" && "bg-chart-2/20 text-chart-2",
                tool.pricing === "Paid" && "bg-chart-4/20 text-chart-4",
                tool.pricing === "Enterprise" && "bg-chart-3/20 text-chart-3"
              )}
            >
              {tool.pricing}
            </Badge>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </CardContent>
      </Card>
    </Link>
  )
}

export function ToolCardSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 animate-pulse rounded-xl bg-secondary" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-secondary" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-secondary" />
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="h-4 w-20 animate-pulse rounded bg-secondary" />
          <div className="h-5 w-16 animate-pulse rounded bg-secondary" />
        </div>
      </CardContent>
    </Card>
  )
}
