'use client'
import { motion, AnimatePresence } from 'framer-motion'

import { cn, animate } from '@/lib/utils'
import { contentAnim } from '@/constants/animations'

export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AnimatePresence
      onExitComplete={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <motion.section
        className={cn(`pt-8 container grow`)}
        {...animate({
          variants: contentAnim,
        })}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  )
}
