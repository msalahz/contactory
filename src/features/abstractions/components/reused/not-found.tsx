import { Link } from '@tanstack/react-router'
import { Button } from '@/features/abstractions/components/primitives/button'

export function NotFound() {
  return (
    <section className="relative overflow-hidden px-6 py-20 text-center">
      <div>Not Found</div>
      <Button asChild variant="link">
        <Link to="/">Go to Home</Link>
      </Button>
    </section>
  )
}
