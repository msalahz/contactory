import { motion, useScroll, useTransform } from 'motion/react'

import { cn } from '@/integrations/shadcn/lib/utils'

interface TechnicalBackgroundProps {
  className?: string
}

export function TechnicalBackground({ className }: TechnicalBackgroundProps) {
  const { scrollYProgress } = useScroll()

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <div className={cn('pointer-events-none fixed inset-0 overflow-hidden', className)}>
      {/* Slow layer - Dark theme */}
      <motion.div className="absolute inset-0 hidden opacity-20 dark:block" style={{ y: y1 }}>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shine1-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0" />
              <stop offset="30%" stopColor="#e2e8f0" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="70%" stopColor="#e2e8f0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
            </linearGradient>
            <filter id="glow1-dark" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line
            x1="0%"
            y1="20%"
            x2="40%"
            y2="35%"
            stroke="url(#shine1-dark)"
            strokeWidth="2"
            filter="url(#glow1-dark)"
          />
          <line
            x1="100%"
            y1="55%"
            x2="60%"
            y2="40%"
            stroke="url(#shine1-dark)"
            strokeWidth="2"
            filter="url(#glow1-dark)"
          />
          <line
            x1="0%"
            y1="80%"
            x2="35%"
            y2="70%"
            stroke="url(#shine1-dark)"
            strokeWidth="2"
            filter="url(#glow1-dark)"
          />
        </svg>
      </motion.div>

      {/* Slow layer - Light theme */}
      <motion.div className="absolute inset-0 block opacity-20 dark:hidden" style={{ y: y1 }}>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shine1-light" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0" />
              <stop offset="30%" stopColor="#334155" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#1e293b" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#334155" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0" />
            </linearGradient>
            <filter id="glow1-light" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line
            x1="0%"
            y1="20%"
            x2="40%"
            y2="35%"
            stroke="url(#shine1-light)"
            strokeWidth="2"
            filter="url(#glow1-light)"
          />
          <line
            x1="100%"
            y1="55%"
            x2="60%"
            y2="40%"
            stroke="url(#shine1-light)"
            strokeWidth="2"
            filter="url(#glow1-light)"
          />
          <line
            x1="0%"
            y1="80%"
            x2="35%"
            y2="70%"
            stroke="url(#shine1-light)"
            strokeWidth="2"
            filter="url(#glow1-light)"
          />
        </svg>
      </motion.div>

      {/* Fast layer - Dark theme */}
      <motion.div className="absolute inset-0 hidden opacity-20 dark:block" style={{ y: y2 }}>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shine2-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0" />
              <stop offset="30%" stopColor="#f1f5f9" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="70%" stopColor="#f1f5f9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0" />
            </linearGradient>
            <filter id="glow2-dark" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line
            x1="100%"
            y1="15%"
            x2="55%"
            y2="30%"
            stroke="url(#shine2-dark)"
            strokeWidth="2"
            filter="url(#glow2-dark)"
          />
          <line
            x1="0%"
            y1="45%"
            x2="45%"
            y2="60%"
            stroke="url(#shine2-dark)"
            strokeWidth="2"
            filter="url(#glow2-dark)"
          />
          <line
            x1="100%"
            y1="85%"
            x2="65%"
            y2="75%"
            stroke="url(#shine2-dark)"
            strokeWidth="2"
            filter="url(#glow2-dark)"
          />
        </svg>
      </motion.div>

      {/* Fast layer - Light theme */}
      <motion.div className="absolute inset-0 block opacity-20 dark:hidden" style={{ y: y2 }}>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shine2-light" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0" />
              <stop offset="30%" stopColor="#334155" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#1e293b" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#334155" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0" />
            </linearGradient>
            <filter id="glow2-light" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line
            x1="100%"
            y1="15%"
            x2="55%"
            y2="30%"
            stroke="url(#shine2-light)"
            strokeWidth="2"
            filter="url(#glow2-light)"
          />
          <line
            x1="0%"
            y1="45%"
            x2="45%"
            y2="60%"
            stroke="url(#shine2-light)"
            strokeWidth="2"
            filter="url(#glow2-light)"
          />
          <line
            x1="100%"
            y1="85%"
            x2="65%"
            y2="75%"
            stroke="url(#shine2-light)"
            strokeWidth="2"
            filter="url(#glow2-light)"
          />
        </svg>
      </motion.div>
    </div>
  )
}
