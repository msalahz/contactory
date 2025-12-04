import { cn } from '@/features/abstractions/lib/utils'

export function Footer(props: React.ComponentProps<'footer'>) {
  return (
    <footer
      {...props}
      data-slot="footer"
      className={cn(
        'text-muted-foreground bg-primary/5 border-top-black/10 dark:border-top-white/10 border-t p-4 text-center text-sm',
        props.className,
      )}
    />
  )
}

export function FooterCopyrights({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      {...props}
      data-slot="footer-copyrights"
      className={cn('text-sm', className)}
    >
      &copy; {new Date().getFullYear()}{' '}
      <a target="_blank" href="https://www.linkedin.com/in/msalahz/">
        Mohammed Zaghloul
      </a>
      . All rights reserved.
    </div>
  )
}

Footer.Copyrights = FooterCopyrights
