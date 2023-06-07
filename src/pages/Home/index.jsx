import React, { useState } from "react";
import { PlayIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router";

import logoSrc from "../../assets/images/mobile/LogoTipo.svg";
import pigSrc from "../../assets/images/mobile/Pig.svg";
import instagramIcon from "../../assets/images/mobile/InstagramIcon.svg";
import facebookIcon from "../../assets/images/mobile/FacebookIcon.svg";
import whatsappIcon from "../../assets/images/mobile/WhatsappIcon.svg";
import welcomeSrc from "../../assets/images/pc/Bienvenido a TransformArt.mp4";

import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { IconBanner } from "../../components/IconBanner";

import "./styles.css";

function Home() {
  const [isHiddenIcon, setIsHiddenIcon] = useState(false);
  const navigate = useNavigate();

  const onGoToCategories = () => {
    navigate({ pathname: "/products" });
  };

  const onPlay = () => {
    const timer = setTimeout(() => {
      const $videoWelcome = document.getElementById("videoWelcome");
      $videoWelcome.play();
      setIsHiddenIcon(true);
      clearTimeout(timer);
    }, 100);
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
          <div className="AboutUs">
            <Title isTitle={false}>¿Quiénes somos?</Title>
            <p>Nos dedicamos a <i>transformar</i> tus obras de arte para darles vida en relieve con un arte que no se consigue en otras partes. Por eso mismo te damos la bienvenida a nuestra página web esperando tus pedidos.</p>
            <div className="BackgroundWave-Video_Container" onClick={onPlay}>
              {isHiddenIcon ? null : <PlayIcon className="PlayIcon" />}
              <video controls={isHiddenIcon} src={welcomeSrc} className="BackgroundWave-Video" id="videoWelcome"></video>
            </div>
          </div>
          <div className="ContactIcons">
            <div className="ContactDetails">
              <p className="SubTitleSecondaryContainer"><strong className="SubTitleSecondary">Datos de contacto</strong></p>
              <p className="SubTitleThered"><strong>Tel</strong><span>: 22453</span></p>
              <p className="SubTitleThered"><strong>Cel</strong><span>: 3156979296</span></p>
              <p className="SubTitleThered"><span>hectorpaulc@gmail.com</span></p>
            </div>
            <div className="ContainerIconsTitle">
              <p className="SubTitleSecondaryContainer centered socialMediaText"><strong className="SubTitleSecondary">Conocenos más en:</strong></p>
              <div className="IconsContainer">
                <a href="https://www.facebook.com/profile.php?id=100076232175404&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                  <Button className="button-without-styles">
                    <IconBanner className="IconBanner facebookIcon">
                      <img src={facebookIcon} alt="facebookIcon" />
                    </IconBanner>
                  </Button>
                </a>
                <a href="https://wa.me/573156979296" target="_blank" rel="noopener noreferrer">
                  <Button className="button-without-styles">
                    <IconBanner className="IconBanner tweeterIcon">
                      <img src={whatsappIcon} alt="whatsappIcon" />
                    </IconBanner>
                  </Button>
                </a>
                <a href="https://instagram.com/transformart_belleza_en_arte?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer">
                  <Button className="button-without-styles">
                    <IconBanner className="IconBanner instagramIcon">
                      <img src={instagramIcon} alt="instagramIcon" />
                    </IconBanner>
                  </Button>
                </a>
              </div>
            </div>
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
