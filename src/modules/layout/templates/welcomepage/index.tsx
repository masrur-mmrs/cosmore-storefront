'use client';
import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Cosmore from '../../../../app/cosmore.jpg';
import { useDrag } from '@use-gesture/react';
import { SwipeUpContext } from '../../../../lib/context/swipe-up-context';

const WelcomePage: React.FC = () => {
  const swipeUpContext = useContext(SwipeUpContext);

  if (!swipeUpContext) {
    throw new Error('WelcomePage component must be used within SwipeUpProvider');
  }

  const { setIsSwipeUp } = swipeUpContext;

  const bind = useDrag(({ direction: [, y], last }) => {
    if (y === -1 && last) {
      setIsSwipeUp(true);
    }
  });

  useEffect(() => {
    if (swipeUpContext.isSwipeUp) {
      console.log(`Swipe Up`, swipeUpContext.isSwipeUp);
    }

  }, [swipeUpContext.isSwipeUp]);

  return (
    <div
      {...bind()}
      className="md:hidden min-[300px]:block h-screen w-screen"
      style={{ touchAction: 'pan-up' }}
    >
      <Image src={Cosmore} alt="Cosmore Logo" sizes="100vw" priority className="pt-48"/>
    </div>
  );
};

export default WelcomePage;