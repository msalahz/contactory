import React from 'react'
import { motion } from 'motion/react'

import type { JSX, ReactNode } from 'react'
import type { Variants } from 'motion/react'

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing'

export type AnimatedGroupProps = {
  children: ReactNode
  className?: string
  variants?: {
    container?: Variants
    item?: Variants
  }
  preset?: PresetType
  // Allow intrinsic element names (e.g. 'div') or custom components
  as?: keyof JSX.IntrinsicElements | React.ElementType
  asChild?: keyof JSX.IntrinsicElements | React.ElementType
}

const defaultContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
  },
  blur: {
    hidden: { filter: 'blur(4px)' },
    visible: { filter: 'blur(0px)' },
  },
  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 300, damping: 8 },
    },
  },
}

const addDefaultVariants = (variants: Variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
})

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = 'div',
  asChild = 'div',
}: AnimatedGroupProps) {
  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : ({} as Variants)),
    container: addDefaultVariants(defaultContainerVariants),
  }
  const containerVariants = variants?.container || selectedVariants.container
  const itemVariants = variants?.item || selectedVariants.item

  // Memoize the chosen motion components so we don't create components during render.
  const MotionComponent: React.ElementType = React.useMemo(() => {
    if (typeof as === 'string') {
      const intrinsic = (motion as unknown as Record<string, any>)[as]
      return intrinsic ?? motion.div
    }
    return as ?? motion.div
  }, [as])

  const MotionChild: React.ElementType = React.useMemo(() => {
    if (typeof asChild === 'string') {
      const intrinsic = (motion as unknown as Record<string, any>)[asChild]
      return intrinsic ?? motion.div
    }
    return asChild ?? motion.div
  }, [asChild])

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  )
}

export { AnimatedGroup }
