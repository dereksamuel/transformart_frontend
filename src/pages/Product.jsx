import React, { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@heroicons/react/outline";

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
  const [playingVideo, setPlayingVideo] = useState(false);
  const [productsCategories, setProductsCategories] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [showGreenGuide, setShowGreenGuide] = useState(false);

  const params = useParams();
  const refLink = useRef(null);
  const refVideo = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (!selectedSize) {
      setShowGreenGuide(true);
      return;
    }

    let products = getLocalStorage("products");
    products = products ? JSON.parse(products) : [];

    let isRepeated = [];
    let oneRepeated = false;

    if (products.length) {
      isRepeated = products.map((productLocal) => {
        if ((
          productLocal.selectedSize === selectedSize
        ) && (
          +productLocal.id === +product.id
        )) {
          oneRepeated = true;
          productLocal.count = productLocal.count ? productLocal.count : 0;
          productLocal.count += 1;
        }

        return productLocal;
      });
    }

    if (!oneRepeated) {
      setLocalStorage("products", [
        ...products,
        {
          ...product,
          count: 1,
          categories: productsCategories,
          selectedSize
        }
      ]);
    } else {
      setLocalStorage("products", isRepeated);
    }

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

  const onNavigateToProducts = (categoryId) => {
    navigate({
      pathname: "/products/" + categoryId
    });
  };

  const onPlayVideo = () => {
    if (refVideo.current) {
      setPlayingVideo(true);

      refVideo.current.play();
    }
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
        {
          product.srcVideo ? (
            <div
              className="BackgroundWave-Video_Container imageContainerVideo"
              onClick={onPlayVideo}
            >
              {
                !playingVideo && (
                  <PlayIcon className="PlayIcon" />
                )
              }
              <video
                src={product.srcVideo}
                controls={playingVideo}
                className="BackgroundWave-Video"
                poster={product.srcImage}
                ref={refVideo}
              ></video>
            </div>
          ) : (
            <img src={product.srcImage} alt={product.name} />
          )
        }
      </figure>
      <section className="ContainerBody">
        <ul className="ContainerCategories">
          {
            productsCategories.length && productsCategories.map((productsCategory) => (
              <li
                className="CategoryBanner"
                key={productsCategory[1].category.id}
                onClick={() => onNavigateToProducts(productsCategory[1].categoriesProductId)}
              >
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
            <a href={product.facebookLink} target="_blank" className="Link" rel="noreferrer">facebook</a>
          </li>
          <li className="ContainerLink">
            <a href={product.tweeterLink} target="_blank" className="Link" rel="noreferrer">tweeter</a>
          </li>
          <li className="ContainerLink">
            <a href={product.instagramLink} target="_blank" className="Link" rel="noreferrer">instagram</a>
          </li>
        </ul>
        <div className={`ContainerSizes ${showGreenGuide && "ContainerSizes-green"}`} id="containerSizes">
          <Title className="SubTitle SubTitle-sub">
            Primero Elige el tamaño de { product.name }:
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
        </div>
        <div className="ZoneOfButton">
          <a
            className="containerSizesClassName"
            href="#containerSizes"
            ref={refLink}
            onClick={onAddToPay}
          >
            <Button
              className={`PrimaryWave ProductButton ${!selectedSize && "Disabled"}`}
            >Agregar a mis compras</Button>
          </a>
        </div>
        <div className="spaceButton"></div>
      </section>
    </div>
  );
}

export {
  Product
};
