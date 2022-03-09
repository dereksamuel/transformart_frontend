import React from "react";
import { PlayIcon } from "@heroicons/react/outline";

import logoSrc from "../assets/images/LogoTipo.svg";
import pigSrc from "../assets/images/Pig.svg";
import instagramIcon from "../assets/images/InstagramIcon.svg";
import facebookIcon from "../assets/images/FacebookIcon.svg";
import tweeterIcon from "../assets/images/TweeterIcon.svg";

import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { IconBanner } from "../components/IconBanner";

import "./Home.css";

function Home() {
  return (
    <>
      <img src={logoSrc} alt="Logo" className="Logo" />
      <img src={pigSrc} alt="Pig" className="Pig" />
      <div className="BackgroundWave">
        <div className="BackgroundWave-ButtonContainer">
          <Button className="PrimaryWave">Ver productos</Button>
        </div>
        <div className="BackgroundWave-Container_text">
          <Title isTitle={false}>Sobre nosotros...</Title>
          <p>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.</p>
          <div className="BackgroundWave-Video_Container">
            <PlayIcon className="PlayIcon" />
            <video src="" className="BackgroundWave-Video"></video>
          </div>
          <p className="SubTitleSecondaryContainer"><strong className="SubTitleSecondary">Datos de contacto</strong></p>
          <p className="SubTitleThered"><strong>Tel</strong><span>: 3154494547</span></p>
          <p className="SubTitleThered"><strong>Cel</strong><span>: 34498</span></p>
          <p className="SubTitleThered"><span>hectorpaulc@gmail.com</span></p>
          <p className="SubTitleSecondaryContainer centered socialMediaText"><strong className="SubTitleSecondary">Redes Sociales</strong></p>
          <div className="IconsContainer">
            <Button className="button-without-styles">
              <IconBanner className="IconBanner facebookIcon">
                <img src={facebookIcon} alt="facebookIcon" />
              </IconBanner>
            </Button>
            <Button className="button-without-styles">
              <IconBanner className="IconBanner tweeterIcon">
                <img src={tweeterIcon} alt="tweeterIcon" />
              </IconBanner>
            </Button>
            <Button className="button-without-styles">
              <IconBanner className="IconBanner instagramIcon">
                <img src={instagramIcon} alt="instagramIcon" />
              </IconBanner>
            </Button>
          </div>
        </div>
        <p className="centered copyright">
          <span>@copyright Derechos reservados - 2022 enero</span>
          <div className="bgWave"></div>
        </p>
      </div>
    </>
  );
}

export {
  Home
};
