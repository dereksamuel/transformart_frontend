import React from "react";

import logoSrc from "../assets/images/LogoTipo.svg";
import pigSrc from "../assets/images/Pig.svg";

function Home() {
  return (
    <>
      <img src={logoSrc} alt="Logo" className="Logo" />
      <img src={pigSrc} alt="Pig" className="Pig" />
      <div className="BackgroundWave"></div>
    </>
  );
}

export {
  Home
};
