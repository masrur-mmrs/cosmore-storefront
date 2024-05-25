'use client'

import React, { createContext, useState, ReactNode } from 'react';

type SwipeUpContextType = {
  isSwipeUp: boolean;
  setIsSwipeUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const SwipeUpContext = createContext<SwipeUpContextType | undefined>(undefined);

const SwipeUpProvider = ({ children }: { children: ReactNode }) => {
  const [isSwipeUp, setIsSwipeUp] = useState(false);

  return (
    <SwipeUpContext.Provider value={{ isSwipeUp, setIsSwipeUp }}>
      {children}
    </SwipeUpContext.Provider>
  );
};

export { SwipeUpContext, SwipeUpProvider };