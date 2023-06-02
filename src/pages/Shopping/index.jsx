import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";

import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { EmptyDraw } from "../../components/EmptyDraw";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";
import { useStorage } from "../../hooks/useStorage";

import { setLocalStorage } from "../../utils/localStorage";

import "../Categories/styles.css";
import "./styles.css";
import "./shopping-media-queries.css";

function Shopping() {
  const {
    storageInfo: products,
    setStorageInfo
  } = useStorage("products");

  const toggleOneProduct = (rest, uniqId) => {
    const productsCopy = JSON.parse(JSON.stringify(products));
    const productFiltered = productsCopy.map((product) => {
      if (`${product.id} ${product.selectedSize}` === uniqId) {
        if (rest) {
          product.count -= 1;
        } else {
          product.count += 1;
        }
      }

      return product;
    });

    setStorageInfo(productFiltered);
    setLocalStorage("products", productFiltered);
  };

  const deleteProduct = (uniqId) => {
    const productsCopy = JSON.parse(JSON.stringify(products));
    const index = productsCopy.findIndex((product) => `${product.id} ${product.selectedSize}` === uniqId);

    productsCopy.splice(index, 1);

    setStorageInfo(productsCopy);
    setLocalStorage("products", productsCopy);
  };

  const totalProductsCount = (products && products.length) ? products.reduce((acc, current) => acc + current.count, 0) : 0;

  return (
    <div className="Shopping page">
      <Title className="SubTitle TitleButterFly" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Mis compras</span>
      </Title>
      <Title className="SubTitle TitleButterFly TitleButterFlyPC" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <p>Mis compras <span className="descPCTB">(Tienes {totalProductsCount} producto{`${totalProductsCount !== 1 ? "s" : ""}`})</span></p>
        <Link to={{
          pathname: "/resume"
        }} className="link-without-styles">
          <Button
            disabled={!products || !products.length}
            className={"PrimaryWave ProductButton"}
          >Vamos a comprar</Button>
        </Link>
      </Title>
      {
        (products && products.length) ? (
          <div className="CategoriesGrid">
            {
              (products && products.length) && products.map((product) => (
                <section key={`${product.id} ${product.selectedSize}`}>
                  <ProductItem
                    product={product}
                    toBuy={true}>
                    <div className="ZoneButtons">
                      {
                        product.count > 1 ? (
                          <Button
                            className="ButtonToggleSize"
                            onClick={() => toggleOneProduct(true, `${product.id} ${product.selectedSize}`)}
                          ><MinusIcon /></Button>
                        ) : (
                          <Button
                            className="ButtonToggleSize-danger"
                            onClick={() => deleteProduct(`${product.id} ${product.selectedSize}`)}
                          ><TrashIcon /></Button>
                        )
                      }
                      <p className="Count">{product.count}</p>
                      <Button
                        className="ButtonToggleSize"
                        onClick={() => toggleOneProduct(false, `${product.id} ${product.selectedSize}`)}
                      ><PlusIcon /></Button>
                    </div>
                  </ProductItem>
                </section>
              ))
            }
          </div>
        ) : (
          <div className="EmptyShopping">
            <EmptyDraw titleEmpty="Aún no tienes compras" />
            <p className="textEmpty">Puedes ver nuestros productos llendo al</p>
            <Link to={{ pathname: "/" }} className="Menu-link-empty align-center">
              <span className="IconMenuLink">
                <HomeIcon />
              </span>
              <span>Inicio</span>
            </Link>
          </div>
        )
      }
      <div className="ZoneOfButton">
        <Link to={{
          pathname: "/resume"
        }} className="link-without-styles">
          <Button
            disabled={!products || !products.length}
            className={"PrimaryWave ProductButton"}
          >Vamos a comprar</Button>
        </Link>
      </div>
      <div className="spaceButton"></div>
    </div>
  );
}

export {
  Shopping
};
