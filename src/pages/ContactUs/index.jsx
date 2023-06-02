/* eslint-disable indent */
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { Title } from "../../components/Title";
import { Button } from "../../components/Button";

import WaveFlowHeader from "../../assets/images/mobile/WaveFlowHeader.svg";
import PigDone from "../../assets/images/mobile/PigDone.svg";
import PigDonePC from "../../assets/images/pc/PigDonePC.svg";
import Whatsapp from "../../assets/images/mobile/Whatsapp.svg";
import Gmail from "../../assets/images/mobile/Gmail.svg";

import { totalToPay } from "../../utils/totalToPay";
import { setLocalStorage } from "../../utils/localStorage";
import { useStorage } from "../../hooks/useStorage";

import "./styles.css";
import "./contactus-media-queries.css";

function ContactUs() {
  const {
    storageInfo: products,
  } = useStorage("products");

  const navigate = useNavigate();

  const number = "+573154494547";
  const finalMessage = `
    Hola, quisiera pagar por estos productos:
    ${
      (products && products.length) && products?.map((product) => {
        return `
      - ${product.name}
        | Precio: $${product.priceText}
        | Cantidad: ${product.count}
        | Tamaño: ${product.selectedSize}
        | Oferta: ${product.offer}%
        `;
      }).join("") || ""
    }
    *Total a pagar: $${(products && products.length) ? totalToPay(products) : ""}*
  `;

  const onOpenWhatsappLink = () => {
    window.open("https://api.whatsapp.com/send" + `?phone=${number}&text=${encodeURIComponent(finalMessage)}`);
    navigate({
      pathname: "/"
    });
  };

  const onOpenGmailLink = () => {
    window.open(
      "https://mail.google.com/mail?view=cm&tf=0" +
      "&to=transformart@gmail.com" +
      "&su=Quiero comprar algo en Transformart" +
      `&body=${encodeURIComponent(finalMessage)}`
      );
    navigate({
      pathname: "/"
    });
  };

  useEffect(() => {
    if (products) {
      if (!products || !products.length)
        navigate({
          pathname: "/"
        });
    }
  }, [products]);

  useEffect(() => {
    return () => {
      setLocalStorage("products", []);
    };
  }, []);

  return (
    <div className="ContactUs page">
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
          Contactanos por Whatsapp o Gmail y enviaremos tus compras allí a nuestro correo o cuenta empresarial
        </p>
      </div>
      <img src={PigDonePC} alt="PigDonePC" className="PigDonePC" />
      <div className="buttonContainer">
        <Button
          className="PrimaryWave Icon"
          onClick={onOpenWhatsappLink}
        >
          <img src={Whatsapp} alt="Whatsapp" className="Whatsapp" />
          <span>Por Whatsapp</span>
        </Button>
        <Button
          className="Gmail PrimaryWave Icon"
          onClick={onOpenGmailLink}
        >
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
