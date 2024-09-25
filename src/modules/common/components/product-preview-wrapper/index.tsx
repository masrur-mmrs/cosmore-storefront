'use client'
import React from 'react';
import { useInView, motion } from "framer-motion"
import { useRef } from "react"
import { delay } from 'lodash';

interface ProductPreviewWrapperProps {
    children: React.ReactNode;
    index: number;
}


const ProductPreviewWrapper: React.FC<ProductPreviewWrapperProps> = ({children, index}) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.3,
        delay: index*0.1,
      },
    },
    hide: {
      y: 50,
      opacity: 0,
    },
  };

    return (
        <motion.div 
        variants={variants}
        animate={isInView ? "show" : "hide"}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        ref={ref}
        > 
        {children}
        </motion.div>
    );
};


export default ProductPreviewWrapper;