"use client"
import React from 'react';
import dynamic from "next/dynamic"
import Animation from "../../../app/Animation - 1741484634567.json"
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


interface ConstructionProps {
    
}


const Construction: React.FC<ConstructionProps> = ({}) => {
    return (
        <div>
            <Lottie
                loop={true}
                animationData={Animation}
            />
        </div>
    );
};


export default Construction;