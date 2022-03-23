import React from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";

import { ProductItem } from "../components/ProductItem";
import { Button } from "../components/Button";
import { Title } from "../components/Title";

import srcLogoIcon from "../assets/images/mobile/logoIcon.svg";
import { useStorage } from "../hooks/useStorage";

import "./Categories.css";
import "./Shopping.css";
import { setLocalStorage } from "../utils/localStorage";

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