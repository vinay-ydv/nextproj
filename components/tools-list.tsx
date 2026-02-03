"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ToolCard } from "@/components/tool-card"
import type { AITool, Category, PricingType } from "@/lib/types"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ToolsListProps {
  tools: AITool[]
  initialFilter?: string
}

type SortOption = "rating" | "reviews" | "name" | "newest"

const pricingOptions: PricingType[] = ["Free", "Freemium", "Paid", "Enterprise"]

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Highest Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
  { label: "Name A-Z", value: "name" },
  { label: "Newest First", value: "newest" },
]

export function ToolsList({ tools, initialFilter }: ToolsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedPricing, setSelectedPricing] = useState<PricingType[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("rating")
  const [showNew, setShowNew] = useState(initialFilter === "new")
  const [showFree, setShowFree] = useState(initialFilter === "free")

  const filteredTools = useMemo(() => {
    let result = [...tools]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((tool) => selectedCategories.includes(tool.category))
    }

    // Pricing filter
    if (selectedPricing.length > 0) {
      result = result.filter((tool) => selectedPricing.includes(tool.pricing))
    }

    // New filter
    if (showNew) {
      result = result.filter((tool) => tool.isNew)
    }

    // Free filter
    if (showFree) {
      result = result.filter((tool) => tool.pricing === "Free" || tool.pricing === "Freemium")
    }

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "newest":
        result.sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime())
        break
    }

    return result
  }, [tools, searchQuery, selectedCategories, selectedPricing, sortBy, showNew, showFree])

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const togglePricing = (pricing: PricingType) => {
    setSelectedPricing((prev) =>
      prev.includes(pricing) ? prev.filter((p) => p !== pricing) : [...prev, pricing]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedPricing([])
    setShowNew(false)
    setShowFree(false)
  }

  const hasActiveFilters =
    searchQuery || selectedCategories.length > 0 || selectedPricing.length > 0 || showNew || showFree

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Quick Filters */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Quick Filters</h3>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={showNew}
              onCheckedChange={(checked) => setShowNew(checked === true)}
            />
            <span className="text-sm text-muted-foreground">New Tools Only</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={showFree}
              onCheckedChange={(checked) => setShowFree(checked === true)}
            />
            <span className="text-sm text-muted-foreground">Free / Freemium</span>
          </label>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.slug} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => toggleCategory(category.name)}
              />
              <span className="text-sm text-muted-foreground">{category.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{category.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Pricing</h3>
        <div className="space-y-2">
          {pricingOptions.map((pricing) => (
            <label key={pricing} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={selectedPricing.includes(pricing)}
                onCheckedChange={() => togglePricing(pricing)}
              />
              <span className="text-sm text-muted-foreground">{pricing}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex gap-8">
      {/* Desktop Sidebar Filters */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Filters</h2>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-6 w-full bg-transparent"
                  >
                    Clear all filters
                  </Button>
                )}
              </SheetContent>
            </Sheet>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  Sort
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={cn(sortBy === option.value && "bg-accent")}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <button type="button" onClick={() => setSearchQuery("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {showNew && (
              <Badge variant="secondary" className="gap-1">
                New Only
                <button type="button" onClick={() => setShowNew(false)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {showFree && (
              <Badge variant="secondary" className="gap-1">
                Free / Freemium
                <button type="button" onClick={() => setShowFree(false)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="gap-1">
                {category}
                <button type="button" onClick={() => toggleCategory(category)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedPricing.map((pricing) => (
              <Badge key={pricing} variant="secondary" className="gap-1">
                {pricing}
                <button type="button" onClick={() => togglePricing(pricing)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing {filteredTools.length} of {tools.length} tools
        </p>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-lg font-medium text-foreground">No tools found</p>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your filters or search query.
            </p>
            <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
