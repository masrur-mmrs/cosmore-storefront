'use client'
import React, { useState, useEffect } from 'react';
import { Button, Modal } from "flowbite-react"
import Lottie from 'lottie-react';
import BirthdayAnimation from "../../../../app/birthdayAnimation.json"


const BirthdayModal: React.FC = ({}) => {
  const [birthdaymodal, setBirthdaymodal] = useState(false);

  useEffect(() => {
    if(window.innerHeight > window.innerWidth){
      setTimeout(() => {
        setBirthdaymodal(true);
      }, 3700);
    } else {
      setBirthdaymodal(true);
    }
    return () => {
      
    };
  }, []);

  return (
    <>
   <Modal
      dismissible 
      show={birthdaymodal} 
      onClose={() => setBirthdaymodal(false)}
      size={"xl"} 
      position={'center'} 
      className="z-40 backdrop-blur backdrop-brightness-50"
      >
        <Modal.Body>
          <Lottie animationData={BirthdayAnimation} />
          <h1 className="text-5xl font-bold text-center">Happy Birthday Afreen 🥳</h1>
          <div className="flex items-center justify-center content-center mt-3">
            <Button className="bg-[#fe7481] text-white" onClick={() => setBirthdaymodal(false)}>Show my Site!</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};


export default BirthdayModal;