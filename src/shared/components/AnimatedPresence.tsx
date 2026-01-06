import { AnimatePresence, motion } from 'motion/react'

export function AnimatedPresence(props: React.ComponentProps<typeof motion.div>) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 1.5, ease: 'easeInOut' }}
        {...props}
      />
    </AnimatePresence>
  )
}
