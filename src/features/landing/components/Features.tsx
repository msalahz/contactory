import {
  ArrowUpDown,
  Contact,
  Fingerprint,
  FolderHeart,
  GitMerge,
  QrCode,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'

import { useTranslation } from 'react-i18next'
import type { JSX } from 'react'

import { cn } from '@/integrations/shadcn/lib/utils'

export interface Feature {
  id: string
  title: string
  description: string
  icon: JSX.Element
  badge?: string
}

export function Features({ className, ...props }: React.ComponentProps<'section'>) {
  const { t } = useTranslation('landing')
  const features: Array<Feature> = [
    {
      id: 'search',
      title: t('Search'),
      description: t('Find anyone instantly with powerful search and filtering options.'),
      icon: <Search className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'sync',
      title: t('Sync'),
      description: t('Stay up to date across all your devices with automatic syncing.'),
      icon: <RefreshCw className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'security',
      title: t('Security'),
      description: t(
        'Your contacts are safe with us. We prioritize your privacy and data security.',
      ),
      icon: <Fingerprint className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'import-export',
      title: t('Import/Export'),
      description: t('Quickly import or export your contacts in various formats.'),
      icon: <ArrowUpDown className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'share',
      title: t('Share'),
      description: t('Easily share contacts with friends, family, or colleagues.'),
      icon: <Share2 className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'organize',
      title: t('Organize'),
      description: t('Keep all your contacts in one place, neatly organized and easy to manage.'),
      icon: <Contact className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'duplicate-detection',
      title: t('Duplicate Detection'),
      description: t('Find and merge duplicate contacts automatically.'),
      icon: <GitMerge className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'groups-labels',
      title: t('Groups/Labels'),
      description: t('Organize contacts into custom groups like Family, Work, or Friends.'),
      icon: <FolderHeart className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'teams',
      title: t('Teams'),
      description: t('Collaborate and share contacts seamlessly in your organization.'),
      icon: <Users className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'favorites',
      title: t('Favorites'),
      description: t('Mark important contacts for quick and easy access.'),
      icon: <Star className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'ask-ai',
      title: t('Ask AI'),
      description: t('Leverage AI to get insights and suggestions about your contacts.'),
      icon: <Sparkles className="size-4" />,
      badge: t('Coming Soon'),
    },
    {
      id: 'qr-code-sharing',
      title: t('QR Code Sharing'),
      description: t('Share contact info via scannable QR code.'),
      icon: <QrCode className="size-4" />,
      badge: t('Coming Soon'),
    },
  ]
  return (
    <section id="features" className={cn('py-12 md:py-20', className)} {...props}>
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium text-balance lg:text-5xl">
            {t('The foundation for creative contact management')}
          </h2>
          <p>
            {t(
              'Contactory is evolving to be more than just a CRUD solution. It supports an entire ecosystem helping users & organizations manage, link, share, control, sync, and innovate with their contacts.',
            )}
          </p>
        </div>

        <div className="relative mx-auto grid max-w-5xl divide-x divide-y border *:p-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.id} className="space-y-2">
              <div className="flex items-center gap-2">
                {feature.icon}
                <h3 className="text-sm font-medium">
                  {t(feature.title, { defaultValue: feature.title })}
                </h3>
              </div>
              <p className="text-sm">
                {t(feature.description, { defaultValue: feature.description })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
