"use client";
import React from "react";

import Lottie from "react-lottie-player";
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import fire from "../../../public/assets/fire.json";

const FireLogo = () => {
  return (
    <div className="w-full flex justify-center">
      <Lottie
        loop
        animationData={fire}
        play
        style={{ width: 120, height: 120 }}
      />
    </div>
  );
};

export default FireLogo;
