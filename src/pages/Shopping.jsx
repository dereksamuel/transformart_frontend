import React from "react";
import { HomeIcon, MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";

import { ProductItem } from "../components/ProductItem";
import { Button } from "../components/Button";
import { Title } from "../components/Title";

import srcLogoIcon from "../assets/images/mobile/logoIcon.svg";
import srcLogoAnimatedEmpty from "../assets/images/mobile/LogoToAnimateEmpty.svg";
import { useStorage } from "../hooks/useStorage";

import "./Categories.css";
import "./Shopping.css";
import { setLocalStorage } from "../utils/localStorage";
import { Link } from "react-router-dom";

function Shopping() {
  const {
    storageInfo: products,
    setStorageInfo,
    error
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

  const goToBuy = () => {
    console.log("goToBuy");
  };

  if (error && (!products && !products.length)) {
    return <div className="Error">No tienes productos</div>;
  }

  return (
    <div className="Shopping">
      <Title className="SubTitle TitleCategories" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Mis compras</span>
      </Title>
      {
        (products && products.length) ? (
          <div className="CategoriesGrid">
            {
              (products && products.length) && products.map((product) => (
                <ProductItem
                  key={`${product.id} ${product.selectedSize}`}
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
              ))
            }
          </div>
        ) : (
          <div className="EmptyShopping">
            <h2 className="EmptyTitle">Aún no tienes compras</h2>
            <div className="relative">
              <svg className="svg" width="165" height="68" viewBox="0 0 165 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 25.2746C12.3008 78.2652 49.0678 41.2631 58.146 35.7813C67.2243 30.2996 76.4586 26.6041 84.9269 27.1018C102.107 28.1117 114.445 52.5081 101.268 63.6471C84.6607 77.6851 56.6691 44.4173 62.6852 23.4473C68.6721 2.5791 100.32 -7.14906 114.431 9.28601C124.746 21.2998 126.233 40.8063 118.063 40.8063C108.415 40.8063 105.208 33.4924 110.346 25.2746C115.219 17.4797 123.377 18.023 130.772 23.4473C139.224 29.6467 146.34 49.4432 137.127 44.4608C130.91 41.0988 131.68 36.2382 137.127 30.2995C142.574 24.3609 163 38.979 163 38.979" stroke="white" strokeOpacity="0.87" strokeWidth="2" strokeLinecap="square"/>
              </svg>
              <img src={srcLogoAnimatedEmpty} alt="srcLogoAnimatedEmpty" className="LogoToAnimateEmpty" />
            </div>
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
        <Button
          disabled={!products || !products.length}
          className={"PrimaryWave ProductButton"}
          onClick={goToBuy}
        >Vamos a comprar</Button>
      </div>
      <div className="spaceButton"></div>
    </div>
  );
}

export {
  Shopping
};
