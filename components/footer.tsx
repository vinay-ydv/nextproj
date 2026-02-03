import Link from "next/link"

const footerLinks = {
  explore: [
    { label: "All Tools", href: "/tools" },
    { label: "Categories", href: "/categories" },
    { label: "Collections", href: "/collections" },
    { label: "New Tools", href: "/tools?filter=new" },
    { label: "Free Tools", href: "/tools?filter=free" },
  ],
  categories: [
    { label: "Writing", href: "/categories/writing" },
    { label: "Image Generation", href: "/categories/image-generation" },
    { label: "Code Assistant", href: "/categories/code-assistant" },
    { label: "Video", href: "/categories/video" },
    { label: "Audio", href: "/categories/audio" },
  ],
  resources: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Submit Tool", href: "#" },
    { label: "Contact", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">AI</span>
              </div>
              <span className="text-lg font-semibold text-foreground">ToolsHub</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover the best AI tools for every task. Curated directory of AI-powered solutions.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Categories</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} AI ToolsHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
