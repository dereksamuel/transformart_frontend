import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { Title } from "../components/Title";
import { Button } from "../components/Button";

import { useCP } from "../hooks/useCP";
import { useOneProduct } from "../hooks/useOneProduct";

import { setState } from "../utils/setState";
import { SET_SELECTED } from "../store/types/products";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

import "./Product.css";

function Product() {
  const [productsCategories, setProductsCategories] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const categoriesProductsArray = useCP();
  const product = useOneProduct(params.productId);
  const formatPrice = new Intl.NumberFormat("es-CO", {
    currency: "COP"
  }).format(product.price);

  const totalPrice = (productOffer) => {
    const offerValue = 100 - productOffer;
    const totalPriceResult = (product.price * offerValue) / 100;

    return new Intl.NumberFormat("es-CO", {
      currency: "COP"
    }).format(totalPriceResult);
  };

  const onAddToPay = async () => {
    const products = getLocalStorage("products");

    setLocalStorage("products", [
      ...products ? JSON.parse(products) : [],
      {
        ...product,
        categories: productsCategories,
        selectedSize
      }
    ]);

    await dispatch(setState({
      type: SET_SELECTED,
      payload: {
        ...product,
        categories: productsCategories,
        selectedSize
      }
    }));

    navigate({ pathname: "/myshopping" });
  };

  useEffect(() => {
    const filteredCP = categoriesProductsArray.filter((categoriesProductsItem) =>
      [...categoriesProductsItem[1].products].filter((productLocal) =>
        productLocal.id === product.id).length);

    setProductsCategories(filteredCP);
  }, [categoriesProductsArray, product]);

  return (
    <div className="ProductContainer">
      <figure className="ContainerImage">
        {
          product.offer ? (
            <p className="Offer">Oferta del { product.offer }%</p>
          ) : null
        }
        <img src={product.srcImage} alt={product.name} />
      </figure>
      <section className="ContainerBody">
        <ul className="ContainerCategories">
          {
            productsCategories.length && productsCategories.map((productsCategory) => (
              <li className="CategoryBanner" key={productsCategory[1].category.id}>
                <span>
                  { productsCategory[1].category.name }
                </span>
              </li>
            ))
          }
        </ul>
        <Title isTitle={true} className="Title ProductTitle">{ product.name }</Title>
        <p className={`Price ${product.offer && "Disabled"}`}>
          Precio:
          <span className="PriceValue">
            ${ formatPrice }
          </span>
        </p>
        {
          product.offer ? (
            <p className="Price">
              Precio con oferta:
              <span className="PriceValue">
                ${ totalPrice(product.offer) }
              </span>
            </p>
          ) : null
        }
        <p className="Description">
          { product.description }
        </p>
        <Title className="SubTitle SubTitle-sub SubTitle2">
          Lo puedes ver en:
        </Title>
        <ul className="ContainerLinks">
          <li className="ContainerLink">
            <a href={product.facebookLink} about="_blank" className="Link">facebook</a>
          </li>
          <li className="ContainerLink">
            <a href={product.tweeterLink} about="_blank" className="Link">tweeter</a>
          </li>
          <li className="ContainerLink">
            <a href={product.instagramLink} about="_blank" className="Link">instagram</a>
          </li>
        </ul>
        <Title className="SubTitle SubTitle-sub">
          Elige el tamaño de { product.name }:
        </Title>
        <ul className="ContainerCategories">
          <li
            className={`SizeBanner ${selectedSize === "Pequeño (120cm x 120)" && "SelecteSizeBanner"}`}
            onClick={() => setSelectedSize("Pequeño (120cm x 120)")}
          >
            <span>Pequeño (120cm x 120)</span>
          </li>
          <li
            className={`SizeBanner ${selectedSize === "Mediano (15m x 1m)" && "SelecteSizeBanner"}`}
            onClick={() => setSelectedSize("Mediano (15m x 1m)")}
          >
            <span>Mediano (15m x 1m)</span>
          </li>
          <li
            className={`SizeBanner ${selectedSize === "Grande (120cm x 120)" && "SelecteSizeBanner"}`}
            onClick={() => setSelectedSize("Grande (120cm x 120)")}
          >
            <span>Grande (120cm x 120)</span>
          </li>
        </ul>
        <div className="ZoneOfButton">
          <Button
            className="PrimaryWave ProductButton"
            disabled={!selectedSize}
            onClick={onAddToPay}
          >Agregar a mis compras</Button>
        </div>
        <div className="spaceButton"></div>
      </section>
    </div>
  );
}

export {
  Product
};
