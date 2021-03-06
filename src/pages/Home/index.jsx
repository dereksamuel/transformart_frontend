import React from "react";
import { PlayIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router";

import logoSrc from "../../assets/images/mobile/LogoTipo.svg";
import pigSrc from "../../assets/images/mobile/Pig.svg";
import instagramIcon from "../../assets/images/mobile/InstagramIcon.svg";
import facebookIcon from "../../assets/images/mobile/FacebookIcon.svg";
import tweeterIcon from "../../assets/images/mobile/TweeterIcon.svg";

import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { IconBanner } from "../../components/IconBanner";

import "./styles.css";

function Home() {
  const navigate = useNavigate();

  const onGoToCategories = () => {
    navigate({ pathname: "/products" });
  };

  return (
    <div className="Home page" id="Home">
      <div className="HomeImages">
        <div className="PC__ContainerHero">
          <p>Bienvenido a transform art</p>
          <h3>Donde <strong>embellecemos</strong></h3>
          <h3>tu arte</h3>
        </div>
        <img src={logoSrc} alt="Logo" className="Logo" />
        <img src={pigSrc} alt="Pig" className="Pig" />
      </div>
      <div className="BackgroundWave">
        <div className="BackgroundWave-ButtonContainer">
          <Button className="PrimaryWave" onClick={onGoToCategories}>Ver productos</Button>
        </div>
        <div className="BackgroundWave-Container_text">
          <Title isTitle={false}>Sobre nosotros...</Title>
          <p>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.</p>
          <div className="BackgroundWave-Video_Container">
            <PlayIcon className="PlayIcon" />
            <video src="" className="BackgroundWave-Video"></video>
          </div>
          <p className="SubTitleSecondaryContainer"><strong className="SubTitleSecondary">Datos de contacto</strong></p>
          <p className="SubTitleThered"><strong>Tel</strong><span>: 22453</span></p>
          <p className="SubTitleThered"><strong>Cel</strong><span>: 3156979296</span></p>
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
        <div className="centered copyright">
          <span>@copyright Derechos reservados - 2022 enero</span>
          <div className="bgWave"></div>
        </div>
      </div>
    </div>
  );
}

export {
  Home
};
