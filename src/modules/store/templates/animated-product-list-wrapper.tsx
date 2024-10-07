'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface AnimatedProductListWrapperProps {
  children: React.ReactNode
}

const AnimatedProductListWrapper: React.FC<AnimatedProductListWrapperProps> = ({ children }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [childrenArray, setChildrenArray] = useState<React.ReactNode[]>([])

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  useEffect(() => {
    setChildrenArray(React.Children.toArray(children))
  }, [children])

  return (
    <ul 
      ref={ref}
      className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
      data-testid="products-list"
    >
      {childrenArray.map((child, index) => (
        <motion.li
          key={index}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: (i) => ({
              opacity: 1,
              y: 0,
              transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: 'easeInOut',
              },
            }),
          }}
          initial="hidden"
          animate={controls}
          custom={index}
        >
          {child}
        </motion.li>
      ))}
    </ul>
  )
}

export default AnimatedProductListWrapper