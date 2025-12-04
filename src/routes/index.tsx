import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-6 py-20 text-center">
        Contacts App
      </section>
    </div>
  )
}
