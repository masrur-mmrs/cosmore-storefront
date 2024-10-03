'use client'
import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { Button, Modal } from "flowbite-react"
import Lottie from 'lottie-react';
import BirthdayAnimation from "../../../../app/birthdayAnimation.json"
import BirthdayImage from "../../../../app/IMG_2616.png"

interface FirstMessageProps {
  show: boolean
}

interface SecondMessageProps {
  show: boolean
}

const FirstMessage: React.FC<FirstMessageProps> = ({show}) => {

  return (
    <>
      <Transition
      show={show}
      leave="transition ease-in duration-250"
      leaveFrom="scale-100"
      leaveTo="scale-0"
      >
        <Lottie animationData={BirthdayAnimation} />
      </Transition>
      <Transition
      show={show}
      leave="transition ease-in duration-250"
      leaveFrom="scale-100"
      leaveTo="scale-0"
      >
        <h1 className="text-5xl font-bold text-center">Happy Birthday Afrin 🥳</h1>
      </Transition>
    </>
  );
}

const SecondMessage: React.FC<SecondMessageProps> = ({show}) => {
  return (
    <>
      <Transition
      show={show}
      enter="transition ease-in duration-250 delay-50"
      enterFrom="scale-0"
      enterTo="scale-100"
      >
        <Image
        src={BirthdayImage}
        alt="Birthday Image"
        width={400}
        height={400}
        className="m-auto rounded-md"
        />
      </Transition>
      <Transition
      show={show}
      enter="transition ease-in duration-250 delay-50"
      enterFrom="scale-0"
      enterTo="scale-100"
      >
        <p className="text-md font-light text-center pt-5"> Hey babe I’m sorry that I couldn’t get you much for your birthday, you know what you mean to me and I hope this helps you get ahead so Happy birthday once again and I love you ❤️</p> 
      </Transition>
    </>
  )
}


const BirthdayModal: React.FC = ({}) => {
  const [birthdaymodal, setBirthdaymodal] = useState(true);
  const [showFirstMessage, setShowFirstMessage] = useState(true);
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  const handleButtonClick = () => {
    if (showFirstMessage) {
      setShowFirstMessage(false);
      setTimeout(() => {
        setShowSecondMessage(true);
      }, 250);
    } else {
      setBirthdaymodal(false);
    }
  }

  useEffect(() => {

    return () => {
      
    };
  }, []);

  return (
    <>
   <Modal
      dismissible 
      show={birthdaymodal} 
      onClose={() => setBirthdaymodal(false)}
      size={'md'}
      position={'center'} 
      className="z-40 backdrop-blur backdrop-brightness-50"
      >
        <Modal.Body>
          <FirstMessage show={showFirstMessage} />
          <SecondMessage show={showSecondMessage}/>
          <div className="flex items-center justify-center content-center mt-3">
            <Button className="bg-[#fe7481] text-white" onClick={handleButtonClick}>{(showFirstMessage)? "Show my Site" : "Show my site already!"}</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};


export default BirthdayModal;