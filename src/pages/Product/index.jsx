import React, { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@heroicons/react/outline";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { Title } from "../../components/Title";
import { Button } from "../../components/Button";

import { useCP } from "../../hooks/useCP";
import { useOneProduct } from "../../hooks/useOneProduct";

import { setState } from "../../utils/setState";
import { SET_SELECTED } from "../../store/types/products";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

import "./styles.css";

function Product() {
  const [stateLocal, setStateLocal] = useState({
    playingVideo: false,
    showGreenGuide: false,
    productsCategories: [],
    selectedSize: ""
  });

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
    if (!stateLocal.selectedSize) {
      setStateLocal({
        ...stateLocal,
        showGreenGuide: true
      });
      return;
    }

    let products = getLocalStorage("products");
    products = products ? JSON.parse(products) : [];

    let isRepeated = [];
    let oneRepeated = false;

    if (products.length) {
      isRepeated = products.map((productLocal) => {
        if ((
          productLocal.selectedSize === stateLocal.selectedSize
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
          categories: stateLocal.productsCategories,
          selectedSize: stateLocal.selectedSize
        }
      ]);
    } else {
      setLocalStorage("products", isRepeated);
    }

    await dispatch(setState({
      type: SET_SELECTED,
      payload: {
        ...product,
        categories: stateLocal.productsCategories,
        selectedSize: stateLocal.selectedSize
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
      setStateLocal({
        ...stateLocal,
        playingVideo: true
      });

      refVideo.current.play();
    }
  };

  useEffect(() => {
    const filteredCP = categoriesProductsArray.filter((categoriesProductsItem) =>
      [...categoriesProductsItem[1].products].filter((productLocal) =>
        productLocal.id === product.id).length);

    setStateLocal({
      ...stateLocal,
      productsCategories: filteredCP
    });
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
                !stateLocal.playingVideo && (
                  <PlayIcon className="PlayIcon" />
                )
              }
              <video
                src={product.srcVideo}
                controls={stateLocal.playingVideo}
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
            stateLocal.productsCategories.length && stateLocal.productsCategories.map((productsCategory) => (
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
        <div className={`ContainerSizes ${stateLocal.showGreenGuide && "ContainerSizes-green"}`} id="containerSizes">
          <Title className="SubTitle SubTitle-sub">
            Primero Elige el tamaño de { product.name }:
          </Title>
          <ul className="ContainerCategories">
            <li
              className={`SizeBanner ${stateLocal.selectedSize === "Pequeño (120cm x 120)" && "SelecteSizeBanner"}`}
              onClick={() => setStateLocal({
                ...stateLocal,
                selectedSize: "Pequeño (120cm x 120)"
              })}
            >
              <span>Pequeño (120cm x 120)</span>
            </li>
            <li
              className={`SizeBanner ${stateLocal.selectedSize === "Mediano (15m x 1m)" && "SelecteSizeBanner"}`}
              onClick={() => setStateLocal({
                ...stateLocal,
                selectedSize: "Mediano (15m x 1m)"
              })}
            >
              <span>Mediano (15m x 1m)</span>
            </li>
            <li
              className={`SizeBanner ${stateLocal.selectedSize === "Grande (120cm x 120)" && "SelecteSizeBanner"}`}
              onClick={() => setStateLocal({
                ...stateLocal,
                selectedSize: "Grande (120cm x 120)"
              })}
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
              className={`PrimaryWave ProductButton ${!stateLocal.selectedSize && "Disabled"}`}
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
