import React from "react";
import { Link } from "react-router-dom";

import WaveFlowHeader from "../../assets/images/mobile/WaveFlowHeader.svg";

import { Button } from "../../components/Button";
import { Title } from "../../components/Title";

import { useStorage } from "../../hooks/useStorage";

import { priceConverter } from "../../utils/priceConverter";
import { totalToPay } from "../../utils/totalToPay";

import "./styles.css";

function Resume () {
  const {
    storageInfo: products
  } = useStorage("products");

  return (
    <div className="Resume">
      <img src={WaveFlowHeader} alt="WaveFlowHeader" className="WaveFlowHeader" />
      <Title
        isTitle={false}
        className="SubTitle TitleContactUs"
      >
        Resumen del pedido
      </Title>
      <ul className="ContainerList">
        {
          (products && products.length) && products.map((product) => (
            <li
              key={`${product.id} ${product.selectedSize}`}
              className="ItemList"
            >
              <p className="ProductName">
                {product.name} - {product.selectedSize}
              </p>
              <p className="ProductSize">
                Cantidad: {product.count}
              </p>
              <p className="ProductPrice">
                Precio: ${priceConverter(product.price)}
              </p>
            </li>
          ))
        }
      </ul>
      <p className="TotalPrice">Total: ${ (products && products.length) && totalToPay(products) }</p>
      <div className="spaceButton"></div>
      <div className="ZoneOfButton">
        <Link to={{
          pathname: "/contact_us"
        }} className="link-without-styles">
          <Button
            disabled={!products || !products.length}
            className={"PrimaryWave ProductButton"}
          >Contactanos</Button>
        </Link>
      </div>
    </div>
  );
}

export {
  Resume
};
