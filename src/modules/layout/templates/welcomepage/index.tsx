'use client'

import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import Cosmore from '../../../../app/cosmore.jpg';
import { useDrag } from '@use-gesture/react';
import { SwipeUpContext } from '../../../../lib/context/swipe-up-context';
import { Transition } from '@headlessui/react';
import { clx } from '@medusajs/ui';

const WelcomePage: React.FC = () => {
  const swipeUpContext = useContext(SwipeUpContext);

  if (!swipeUpContext) {
    throw new Error('WelcomePage component must be used within SwipeUpProvider');
  }

  const { isSwipeUp, setIsSwipeUp } = swipeUpContext;

  const bind = useDrag(({ direction: [, y], last }) => {
    if (y === -1 && last) {
      setIsSwipeUp(true);
    }
  });

  useEffect(() => {
    if (swipeUpContext.isSwipeUp) {
      console.log(`Swipe Up`, swipeUpContext.isSwipeUp);
      setTimeout(() => {
        document.querySelector('#element-to-remove')?.remove();
      }, 300);
    }

  }, [swipeUpContext.isSwipeUp]);

  return (
    <Transition
    show={!isSwipeUp}
    leave="transition ease-in duration-300 transform-gpu"
    leaveFrom="blur-none tranlate-y-0"
    leaveTo="blur-lg -translate-y-1"
    >
      <div
        {...bind()}
        className={clx('md:hidden min-[300px]:block h-screen w-screen flex justify-around bg-primary-color ', (!isSwipeUp)?'absolute inset-0 z-50':'')}
        style={{ touchAction: 'pan-up' }}
        id="element-to-remove"
      >
        <Image src={Cosmore} alt="Cosmore Logo" sizes="100vw" priority/>
        <div className="absolute top-[45%] inset-0 z-30 flex justify-center items-center sm:hidden min-[300px]:block">
          <div className="scroll scale-y-[-1]"></div>
        </div>
      </div>
    </Transition>
  );
};

export default WelcomePage;