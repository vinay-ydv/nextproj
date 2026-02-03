import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">Page Not Found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tools">
            <Search className="mr-2 h-4 w-4" />
            Browse Tools
          </Link>
        </Button>
      </div>
    </div>
  )
}
