import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import {
  ArrowUpDown,
  FolderHeart,
  GitMerge,
  QrCode,
  RefreshCw,
  Search,
  Share2,
  Star,
  Users,
} from 'lucide-react'

import { findSessionFn } from '@/features/users/functions/find-session-fn'
import { Button } from '@/features/abstractions/components/primitives/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/abstractions/components/primitives/card'

export const Route = createFileRoute('/_site/')({
  loader: () => findSessionFn(),
  component: App,
})

function App() {
  const session = Route.useLoaderData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Outlet />
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Manage Your Contacts <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-muted-foreground mt-6 text-lg sm:text-xl">
            A simple, fast, and secure way to organize all your personal and professional contacts
            in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            {session?.user ? (
              <Button asChild size="lg">
                <Link to="/console">Manage My Contacts</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/signin">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Everything you need</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="relative text-center">
              <span className="bg-primary/20 text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
                Coming Soon
              </span>
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <Users className="size-6" />
                </div>
                <CardTitle>Organize</CardTitle>
                <CardDescription>
                  Keep all your contacts in one place, neatly organized and easy to manage.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative text-center">
              <span className="bg-primary/20 text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
                Coming Soon
              </span>
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <Search className="size-6" />
                </div>
                <CardTitle>Search</CardTitle>
                <CardDescription>
                  Find anyone instantly with powerful search and filtering options.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative text-center">
              <span className="bg-primary/20 text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
                Coming Soon
              </span>
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <RefreshCw className="size-6" />
                </div>
                <CardTitle>Sync</CardTitle>
                <CardDescription>
                  Stay up to date across all your devices with automatic syncing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative text-center">
              <span className="bg-primary/20 text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
                Coming Soon
              </span>
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <Share2 className="size-6" />
                </div>
                <CardTitle>Share</CardTitle>
                <CardDescription>
                  Easily share contacts with friends, family, or colleagues.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative text-center">
              <span className="bg-primary/20 text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
                Coming Soon
              </span>
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <ArrowUpDown className="size-6" />
                </div>
                <CardTitle>Import/Export</CardTitle>
                <CardDescription>
                  Quickly import or export your contacts in various formats.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative text-center">
              <span className="bg-primary/20 text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
                Coming Soon
              </span>
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <FolderHeart className="size-6" />
                </div>
                <CardTitle>Groups/Labels</CardTitle>
                <CardDescription>
                  Organize contacts into custom groups like Family, Work, or Friends.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative text-center">
              <span className="bg-primary/20 text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
                Coming Soon
              </span>
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <Star className="size-6" />
                </div>
                <CardTitle>Favorites</CardTitle>
                <CardDescription>
                  Mark important contacts for quick and easy access.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative text-center">
              <span className="bg-primary/20 text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
                Coming Soon
              </span>
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <GitMerge className="size-6" />
                </div>
                <CardTitle>Duplicate Detection</CardTitle>
                <CardDescription>Find and merge duplicate contacts automatically.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative text-center">
              <span className="bg-primary/20 text-primary absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium">
                Coming Soon
              </span>
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                  <QrCode className="size-6" />
                </div>
                <CardTitle>QR Code Sharing</CardTitle>
                <CardDescription>Share contact info via scannable QR code.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
