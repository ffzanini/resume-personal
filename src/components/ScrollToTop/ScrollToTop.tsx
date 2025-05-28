'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useScroll } from 'framer-motion'
import { RxArrowUp } from 'react-icons/rx'

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    })
  }, [])

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    scrollY.set(0)
  }, [pathname, scrollY])

  return (
    <motion.button
      className="fixed opacity-70 bottom-36 2xl:bottom-24 right-4 p-2 bg-primary-color-300 dark:bg-primary-color-800 rounded-full"
      whileHover={{ scale: 1.1 }}
      style={{ display: isVisible ? 'block' : 'none' }}
      onClick={goTop}
    >
      <RxArrowUp width={24} height={24} />
    </motion.button>
  )
}
