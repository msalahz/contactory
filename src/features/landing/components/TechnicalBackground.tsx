import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

import { cn } from '@/integrations/shadcn/lib/utils'

interface TechnicalBackgroundProps {
  className?: string
}

export function TechnicalBackground({ className }: TechnicalBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const beamOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const beamScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 1.05])

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none fixed inset-0 overflow-x-hidden overflow-y-hidden',
        className,
      )}
    >
      {/* Animated beam effect */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-transparent"
        style={{
          opacity: beamOpacity,
          scale: beamScale,
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 60%)',
        }}
      />
      {/* Left side path with icons - Dark theme */}
      <motion.div
        className="absolute top-0 left-1/5 hidden h-[200%] w-37.5 -translate-x-1/2 overflow-hidden dark:block"
        style={{ y: y1 }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 20 0 Q 70 150, 50 300 Q 30 450, 60 600 Q 90 750, 40 900 Q 10 1050, 50 1200 Q 80 1350, 30 1500"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="10 10"
            opacity="0.5"
          />
          <g transform="translate(40, 280)" opacity="0.4">
            <circle cx="12" cy="8" r="8" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <path
              d="M 0 32 Q 0 20, 12 20 Q 24 20, 24 32"
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
            />
          </g>
          <g transform="translate(55, 580)" opacity="0.4">
            <rect
              x="0"
              y="4"
              width="28"
              height="22"
              rx="3"
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
            />
            <path d="M 0 8 L 14 18 L 28 8" stroke="#94a3b8" strokeWidth="2" fill="none" />
          </g>
          <g transform="translate(30, 880)" opacity="0.4">
            <path
              d="M 6 0 L 22 0 Q 28 0, 28 6 L 28 28 Q 28 34, 22 34 L 6 34 Q 0 34, 0 28 L 0 6 Q 0 0, 6 0"
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="14" cy="28" r="3" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
          </g>
          <g transform="translate(50, 1180)" opacity="0.4">
            <path
              d="M 0 6 Q 0 0, 6 0 L 26 0 Q 32 0, 32 6 L 32 20 Q 32 26, 26 26 L 12 26 L 4 34 L 4 26 Q 0 26, 0 20 Z"
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
            />
          </g>
        </svg>
      </motion.div>

      {/* Right side path with icons - Dark theme */}
      <motion.div
        className="absolute top-0 right-1/5 hidden h-[200%] w-37.5 translate-x-1/2 overflow-hidden dark:block"
        style={{ y: y2 }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 100 100 Q 50 250, 70 400 Q 90 550, 40 700 Q 20 850, 60 1000 Q 100 1150, 50 1300"
            fill="none"
            stroke="#475569"
            strokeWidth="1.5"
            strokeDasharray="8 12"
            opacity="0.4"
          />
          <g transform="translate(70, 380)" opacity="0.35">
            <circle cx="14" cy="14" r="6" stroke="#64748b" strokeWidth="2" fill="none" />
            <circle cx="0" cy="0" r="4" stroke="#64748b" strokeWidth="1.5" fill="none" />
            <circle cx="28" cy="0" r="4" stroke="#64748b" strokeWidth="1.5" fill="none" />
            <circle cx="28" cy="28" r="4" stroke="#64748b" strokeWidth="1.5" fill="none" />
            <line x1="10" y1="10" x2="4" y2="4" stroke="#64748b" strokeWidth="1.5" />
            <line x1="18" y1="10" x2="24" y2="4" stroke="#64748b" strokeWidth="1.5" />
            <line x1="18" y1="18" x2="24" y2="24" stroke="#64748b" strokeWidth="1.5" />
          </g>
          <g transform="translate(30, 680)" opacity="0.35">
            <path
              d="M 14 0 Q 28 0, 28 14 Q 28 24, 14 34 Q 0 24, 0 14 Q 0 0, 14 0"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="14" cy="14" r="5" stroke="#64748b" strokeWidth="1.5" fill="none" />
          </g>
          <g transform="translate(60, 980)" opacity="0.35">
            <rect
              x="0"
              y="6"
              width="28"
              height="28"
              rx="3"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
            />
            <line x1="0" y1="14" x2="28" y2="14" stroke="#64748b" strokeWidth="1.5" />
            <line x1="8" y1="0" x2="8" y2="8" stroke="#64748b" strokeWidth="2" />
            <line x1="20" y1="0" x2="20" y2="8" stroke="#64748b" strokeWidth="2" />
          </g>
        </svg>
      </motion.div>

      {/* Left side path with icons - Light theme */}
      <motion.div
        className="absolute top-0 left-1/5 h-[200%] w-37.5 -translate-x-1/2 overflow-hidden dark:hidden"
        style={{ y: y1 }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 20 0 Q 70 150, 50 300 Q 30 450, 60 600 Q 90 750, 40 900 Q 10 1050, 50 1200 Q 80 1350, 30 1500"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="10 10"
            opacity="0.6"
          />
          <g transform="translate(40, 280)" opacity="0.5">
            <circle cx="12" cy="8" r="8" stroke="#64748b" strokeWidth="2" fill="none" />
            <path
              d="M 0 32 Q 0 20, 12 20 Q 24 20, 24 32"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
            />
          </g>
          <g transform="translate(55, 580)" opacity="0.5">
            <rect
              x="0"
              y="4"
              width="28"
              height="22"
              rx="3"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
            />
            <path d="M 0 8 L 14 18 L 28 8" stroke="#64748b" strokeWidth="2" fill="none" />
          </g>
          <g transform="translate(30, 880)" opacity="0.5">
            <path
              d="M 6 0 L 22 0 Q 28 0, 28 6 L 28 28 Q 28 34, 22 34 L 6 34 Q 0 34, 0 28 L 0 6 Q 0 0, 6 0"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="14" cy="28" r="3" stroke="#64748b" strokeWidth="1.5" fill="none" />
          </g>
          <g transform="translate(50, 1180)" opacity="0.5">
            <path
              d="M 0 6 Q 0 0, 6 0 L 26 0 Q 32 0, 32 6 L 32 20 Q 32 26, 26 26 L 12 26 L 4 34 L 4 26 Q 0 26, 0 20 Z"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
            />
          </g>
        </svg>
      </motion.div>

      {/* Right side path with icons - Light theme */}
      <motion.div
        className="absolute top-0 right-1/5 h-[200%] w-37.5 translate-x-1/2 overflow-hidden dark:hidden"
        style={{ y: y2 }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 100 100 Q 50 250, 70 400 Q 90 550, 40 700 Q 20 850, 60 1000 Q 100 1150, 50 1300"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="8 12"
            opacity="0.5"
          />
          <g transform="translate(70, 380)" opacity="0.4">
            <circle cx="14" cy="14" r="6" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <circle cx="0" cy="0" r="4" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
            <circle cx="28" cy="0" r="4" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
            <circle cx="28" cy="28" r="4" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
            <line x1="10" y1="10" x2="4" y2="4" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="18" y1="10" x2="24" y2="4" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="18" y1="18" x2="24" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
          </g>
          <g transform="translate(30, 680)" opacity="0.4">
            <path
              d="M 14 0 Q 28 0, 28 14 Q 28 24, 14 34 Q 0 24, 0 14 Q 0 0, 14 0"
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="14" cy="14" r="5" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
          </g>
          <g transform="translate(60, 980)" opacity="0.4">
            <rect
              x="0"
              y="6"
              width="28"
              height="28"
              rx="3"
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
            />
            <line x1="0" y1="14" x2="28" y2="14" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="8" y1="0" x2="8" y2="8" stroke="#94a3b8" strokeWidth="2" />
            <line x1="20" y1="0" x2="20" y2="8" stroke="#94a3b8" strokeWidth="2" />
          </g>
        </svg>
      </motion.div>
    </div>
  )
}
