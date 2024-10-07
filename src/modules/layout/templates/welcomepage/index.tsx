'use client'
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDrag } from '@use-gesture/react';
import { SwipeUpContext } from '../../../../lib/context/swipe-up-context';
import { Transition } from '@headlessui/react';
import { clx } from '@medusajs/ui';
import Lottie from 'lottie-react';
const Cosmore = 'https://cosmore-server.s3.ca-central-1.amazonaws.com/cosmore.json';
const DownArrow = 'https://cosmore-server.s3.ca-central-1.amazonaws.com/arrow-down-3101.png'

const WelcomePage: React.FC = () => {
  const swipeUpContext = useContext(SwipeUpContext);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState<boolean>(false);

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

  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventDefault, { passive: false });
    };

    const enableScroll = () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', preventDefault);
    };

    if (!isSwipeUp && window.innerHeight > window.innerWidth) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [isSwipeUp]);

  setTimeout(() => {
    setShowSwipeIndicator(true);
  }, 3500);

  return (
    <Transition
      show={!isSwipeUp}
      leave="transition ease-in duration-300 transform-gpu"
      leaveFrom="blur-none tranlate-y-0"
      leaveTo="blur-lg -translate-y-1"
    >
      <div
        {...bind()}
        className={clx('md:hidden min-[300px]:block h-screen w-screen flex justify-around bg-primary-color', (!isSwipeUp)?'absolute inset-0 z-50':'')}
        style={{ touchAction: 'pan-y' }}
        id="element-to-remove"
      >
        <Lottie
          animationData={Cosmore}
          loop={false}
        />
        <div className="absolute top-[70%] inset-0 z-30 w-full h-full sm:hidden min-[300px]:block">
          <Transition
          show={showSwipeIndicator}
          enter="transition-opacity ease-in duration-300 transform-gpu"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          >
            <div className="flex justify-center items-center  scale-y-[-1]">
              <Image
                src={DownArrow}
                alt="Arrow"
                width={100}
                height={100}
                className="animate-bounce"
              />
              
            </div>
            <p className="inline-flex justify-center w-full pt-10">Swipe up</p>
          </Transition>
        </div>
      </div>
    </Transition>
  );
};

export default WelcomePage;