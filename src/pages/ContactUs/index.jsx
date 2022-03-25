import React from "react";

import { Title } from "../../components/Title";
import { Button } from "../../components/Button";

import WaveFlowHeader from "../../assets/images/mobile/WaveFlowHeader.svg";
import PigDone from "../../assets/images/mobile/PigDone.svg";
import Whatsapp from "../../assets/images/mobile/Whatsapp.svg";
import Gmail from "../../assets/images/mobile/Gmail.svg";

import { useStorage } from "../../hooks/useStorage";

import "./styles.css";

function ContactUs() {
  const {
    storageInfo: products,
  } = useStorage("products");

  const number = "+573154494547";
  const finalMessage = `
    Mis compras:
      ${(products && products.length) && products.map((product) => `
        - ${product.name}
          | Precio: ${product.price}
          | Cantidad: ${product.count}
          | Tamaño: ${product.selectedSize}
          | Oferta ${product.offer}%
      `).join("")}
  `;

  const openWhatsappLink = () => {
    window.open("https://wa.me/" + `${number}?text=${finalMessage}`);
  };

  return (
    <div className="ContactUs">
      <img src={WaveFlowHeader} alt="WaveFlowHeader" className="WaveFlowHeader" />
      <Title
        isTitle={false}
        className="SubTitle TitleContactUs"
      >
        Gracias por elegirnos
      </Title>
      <div className="InformativeBox">
        <img src={PigDone} alt="PigDone" className="PigDone" />
        <p className="InformativeBox--message">
          Contactanos por Whatsapp o Gmail y enviaremos tus compras allí:
        </p>
      </div>
      <div className="buttonContainer">
        <Button
          className="PrimaryWave Icon"
          onClick={openWhatsappLink}
        >
          <img src={Whatsapp} alt="Whatsapp" className="Whatsapp" />
          <span>Por Whatsapp</span>
        </Button>
        <Button className="PrimaryWave Icon">
          <img src={Gmail} alt="Gmail" className="Gmail" />
          <span>Por Gmail</span>
        </Button>
      </div>
    </div>
  );
}

export {
  ContactUs
};
