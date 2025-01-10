'use client'
import React, { RefObject } from 'react';
import { useInView, motion } from "framer-motion"
import { useRef } from "react"

interface ProductPreviewWrapperProps {
    children: React.ReactNode;
    index: number;
}


const ProductPreviewWrapper: React.FC<ProductPreviewWrapperProps> = ({children, index}) => {
  const ref = useRef(null)
  //@ts-ignore
  const isInView = useInView(ref, {once: true})

  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeIn',
        duration: 0.25,
        delay: index*0.1,
      },
    },
    hide: {
      y: 50,
      opacity: 0,
    },
  };

    return (
        //@ts-ignore
        <motion.div 
        variants={variants}
        animate={isInView ? "show" : "hide"}
        // transition={{ ease: "easeInOut", duration: 0.5 }}
        ref={ref}
        > 
        {children}
        </motion.div>
    );
};


export default ProductPreviewWrapper;