import { cn } from '@/integrations/shadcn/lib/utils'

export function FAQs({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      id="faq"
      className={cn('scroll-py-16 py-16 md:scroll-py-32 md:py-32', className)}
      {...props}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-y-12 px-2 lg:grid-cols-[1fr_auto]">
          <div className="text-center lg:text-left">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
              Questions
            </h2>
            <p>Centralize and manage your integrations and connections with ease — all for free.</p>
          </div>

          <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
            <div className="pb-6">
              <h3 className="font-medium">What is connection management?</h3>
              <p className="text-muted-foreground mt-4">
                Connection management lets you add, monitor and organize external integrations and
                device connections from one place. It surfaces status, metadata and secure tokens so
                you can manage integrations without switching tools.
              </p>
            </div>

            <div className="py-6">
              <h3 className="font-medium">How do I manage sharing and permissions?</h3>
              <p className="text-muted-foreground my-4">
                You can tag and categorize connections, revoke tokens, and control access when
                sharing connections with collaborators. All management features are currently free;
                there are no paid plans yet.
              </p>
            </div>

            <div className="py-6">
              <h3 className="font-medium">Do you offer phone support?</h3>
              <p className="text-muted-foreground mt-4">
                We do not offer phone support at this time. However, you can contact us via email or
                live chat for any questions or concerns you may have.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
