# AI ToolsHub - Content Directory Website

A polished, production-ready AI tools directory built as part of the Intern Assessment project.

## Dataset Used

**Dataset:** AI Tools Catalog  
**Source:** Custom curated dataset combining information from:
- [There's An AI For That](https://theresanaiforthat.com/) - AI tools directory
- [Future Tools](https://www.futuretools.io/) - AI tools aggregator
- Official product websites for accurate descriptions and features

### How the Dataset Was Generated

The dataset was manually curated and structured to include 24 popular AI tools across 10 categories. Each tool entry contains:
- Name, slug, and tagline
- Full description and feature list
- Category, pricing tier, and tags
- Logo URL, website link, and rating
- Use cases and related tools

The data was organized into a TypeScript file (`/lib/data.ts`) with helper functions for filtering, searching, and retrieving tools by various criteria.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety and better DX |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui** | Pre-built accessible components |
| **next-themes** | Dark/light mode support |
| **Lucide React** | Icon library |
| **Geist Font** | Modern typography by Vercel |

### Design Inspiration

- **Vercel's Template Gallery** - Clean grid layout with sidebar filters
- **There's An AI For That** - Card-based tool presentation
- **Linear.app** - Navy/black/white color scheme with subtle depth
- **Raycast** - Minimal UI with excellent information hierarchy

## AI Prompt Examples Used

### 1. Initial Project Setup
```
Build me a polished content directory website for AI Tools with:
- Homepage with hero section and featured tools
- Listing page with search, filters, and sorting
- Individual tool detail pages
- Category permutation pages (e.g., "Best AI Writing Tools")
- Dark mode support and responsive design
```

### 2. Design Direction
```
Create a design brief for an AI Tools directory website with modern SaaS 
aesthetic, featuring tool cards with logos, search functionality, category 
filters, and detail modals. Use a navy, black, and white color palette.
```

### 3. Bug Fix - Hydration Error
```
The dark/light/system theme button is not working. Getting React hydration 
mismatch error #418. Fix the theme toggle component to prevent server/client 
rendering differences.
```

## Features Implemented

- **Home Page** - Hero section, stats, featured tools, category grid, new arrivals
- **Tools Directory** - Full listing with real-time search, category/pricing filters, sorting
- **Tool Detail Pages** - Complete information with features, use cases, related tools
- **Categories** - Browse all 10 categories with tool counts
- **Collections** - Curated lists (Featured, Free, Top Rated, New, etc.)
- **Theme Toggle** - Light/Dark/System preference with smooth transitions
- **Responsive Design** - Mobile-first approach with collapsible navigation
- **SEO Ready** - Dynamic metadata, sitemap, robots.txt

## What I Would Improve with 2 More Days

### Day 1: Enhanced Functionality
1. **Database Integration** - Move from static data to Supabase/PostgreSQL for dynamic content
2. **User Authentication** - Allow users to save favorite tools and submit new ones
3. **Advanced Search** - Implement fuzzy search with Algolia or Meilisearch
4. **Tool Comparison** - Side-by-side comparison feature for similar tools

### Day 2: Polish & Performance
1. **Image Optimization** - Generate and host tool logos with Next.js Image optimization
2. **Analytics Dashboard** - Track popular tools, search queries, and user behavior
3. **API Integration** - Fetch real-time data from tool APIs (pricing, status, updates)
4. **Accessibility Audit** - Full WCAG 2.1 compliance review and fixes
5. **Performance Optimization** - Implement ISR, add loading skeletons, optimize bundle size

## Project Structure

```
/app
  /page.tsx              # Homepage
  /tools
    /page.tsx            # Tools listing
    /[slug]/page.tsx     # Tool detail
  /categories
    /page.tsx            # All categories
    /[slug]/page.tsx     # Category detail
  /collections
    /page.tsx            # All collections
    /[slug]/page.tsx     # Collection detail
  /sitemap.ts            # Dynamic sitemap
  /robots.ts             # Robots.txt
/components
  /navigation.tsx        # Global header
  /footer.tsx            # Global footer
  /tool-card.tsx         # Reusable tool card
  /tools-list.tsx        # Tools grid with filters
  /theme-toggle.tsx      # Dark/light mode toggle
/lib
  /data.ts               # AI tools dataset
  /types.ts              # TypeScript interfaces
```

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Live Demo

Deployed on Vercel: [AI ToolsHub](https://ai-tools-hub.vercel.app)

---

Built with v0 by Vercel
