import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import WaveFlowHeader from "../../assets/images/mobile/WaveFlowHeader.svg";

import { Button } from "../../components/Button";
import { Title } from "../../components/Title";

import { useStorage } from "../../hooks/useStorage";

import { priceConverter } from "../../utils/priceConverter";
import { totalToPay } from "../../utils/totalToPay";

import "./styles.css";
import "./resume-media-queries.css";

function Resume () {
  const {
    storageInfo: products
  } = useStorage("products");

  const navigate = useNavigate();

  useEffect(() => {
    if (products) {
      if (!products || !products.length)
        navigate({
          pathname: "/"
        });
    }
  }, [products]);

  return (
    <div className="Resume page">
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
              <div className="ItemListFirst">
                <p className="ProductName">
                  {product.name} - {product.selectedSize}
                </p>
                <p className="ProductSize">
                  Cantidad: {product.count}
                </p>
              </div>
              <p className="ProductPrice">
                Precio: ${priceConverter(product.price)}
              </p>
            </li>
          ))
        }
      </ul>
      <p className="TotalPrice MobilePrice">Total: ${ (products && products.length) && totalToPay(products) }</p>
      <div className="TotalPriceContainerPC">
        <p className="TotalPrice">Total: ${ (products && products.length) && totalToPay(products) }</p>
        <Link to={{
          pathname: "/contact_us"
        }} className="link-without-styles">
          <Button
            disabled={!products || !products.length}
            className={"PrimaryWave"}
          >Contactanos</Button>
        </Link>
      </div>
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
