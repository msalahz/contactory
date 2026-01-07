import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function NotFound({ children }: { children?: any }) {
  const { t } = useTranslation('common')

  return (
    <div className="space-y-2 p-2">
      <div className="text-gray-600 dark:text-gray-400">
        {children || <p>{t('The page you are looking for does not exist.')}</p>}
      </div>
      <p className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => window.history.back()}
          className="rounded-sm bg-emerald-500 px-2 py-1 text-sm font-black text-white uppercase"
        >
          {t('Go back')}
        </button>
        <Link
          to="/"
          className="rounded-sm bg-cyan-600 px-2 py-1 text-sm font-black text-white uppercase"
        >
          {t('Start over')}
        </Link>
      </p>
    </div>
  )
}
