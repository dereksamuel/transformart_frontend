import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { CheckIcon } from "@heroicons/react/solid";
import { CameraIcon, LinkIcon, PhotographIcon, VideoCameraIcon, XIcon } from "@heroicons/react/outline";

import { createProduct, uploadFiles } from "../../store/actions/products";
import { onChangeAlert } from "../../store/actions/alert";
import { SET_CREATED, SET_SOURCES } from "../../store/types/products";

import { setState } from "../../utils/setState";
import { onClickModel, toUrl } from "../../utils/addProduct";
import { useModel } from "../../hooks/useModel";

import { VideoContainer } from "../VideoContainer";
import { Title } from "../Title";
import { Modal } from "../Modal";
import { Banner } from "../Banner";
import { Input } from "../Input";
import { Button } from "../Button";
import { Alert } from "../Alert";

import "./styles.css";

function SaveProduct({
  onToggleModalCreateProduct,
  srcImage,
  srcVideo,
  name,
  price,
  offer,
  tweeterUrl,
  description,
  instagramUrl,
  facebookUrl
}) {
  const sources = useSelector((stateLocal) => stateLocal.products.sources);
  const createdId = useSelector((stateLocal) => stateLocal.products.createdId);
  const alert = useSelector((stateLocal) => stateLocal.alert.alert);
  const loading = useSelector((stateLocal) => stateLocal.products.loading);

  const [stateLocal, setStateLocal] = useState({
    onToggleOverlay: () => {},
    modeImage: true
  });
  const saveProductFormRef = useRef(null);

  const [videoModel] = useModel({ initialValue: "", domEl: "#videoModel" });
  const [imageModel] = useModel({ initialValue: "", domEl: "#imageModel" });

  const dispatch = useDispatch();

  const onSaveProduct = async (event, onToggleOverlay) => {
    event.preventDefault();
    setStateLocal({
      ...stateLocal,
      onToggleOverlay
    });

    if (!videoModel || !imageModel) {
      dispatch(onChangeAlert({
        description: "Es requerido que subas imagen y video para el producto",
        theme: "Error",
        showAlert: true
      }));
      return;
    }

    await dispatch(uploadFiles(videoModel, imageModel));
  };

  const onChangeModalImage = () => {
    setStateLocal({
      ...stateLocal,
      modeImage: !stateLocal.modeImage
    });
  };

  const onCreatedProduct = () => {
    dispatch(setState({ type: SET_CREATED, payload: null }));
    dispatch(setState({ type: SET_SOURCES, payload: null }));
    onToggleModalCreateProduct(stateLocal.onToggleOverlay);
  };

  useEffect(async () => {
    if (sources) {
      let formData = new FormData(saveProductFormRef.current);

      const data = {
        name: formData.get("nameModel"),
        price: Number(formData.get("priceModel")),
        description: formData.get("descriptionModel"),
        offer: Number(formData.get("offerModel")),
        tweeterLink: formData.get("tweeterUrlModel"),
        facebookLink: formData.get("facebookUrlModel"),
        instagramLink: formData.get("instagramUrlModel"),
        srcVideo: sources.srcVideo,
        srcImage: sources.srcImage,
      };

      await dispatch(createProduct(data));
    }
  }, [sources]);

  useEffect(() => {
    if (createdId) {
      onCreatedProduct();
    }
  }, [createdId]);

  useEffect(() => {
    if (videoModel || imageModel) {
      onChangeModalImage();
    }
  }, [videoModel, imageModel]);

  return (
    <Modal>
      {
        ({
          onToggleOverlay
        }) => (
          <div className="Modal">
            <div className="ModalContent">
              <button
                className="button-without-styles closeIcon"
                onClick={() => onToggleModalCreateProduct(onToggleOverlay)}
              >
                <XIcon />
              </button>
              <Title
                className="SubTitle TitleModal"
              >
                {
                  !name ? "Añadir productos" : `Editar ${name}`
                }
              </Title>
              <form onSubmit={(event) => onSaveProduct(event, onToggleOverlay)} ref={saveProductFormRef}>
                {
                  (alert && alert.showAlert) && (
                    <Alert
                      description={alert.description}
                      theme={alert.theme}
                      toLeft={true}
                      onClick={() => dispatch(onChangeAlert({}))}
                    />
                  )
                }
                <figure className="ContainerImage">
                  {
                    ((videoModel && imageModel) || (srcImage && srcVideo)) && (
                      <button
                        className="button-without-styles ChangeMode"
                        type="button"
                        onClick={onChangeModalImage}
                      >
                        {
                          stateLocal.modeImage ? (
                            <VideoCameraIcon className="Icon" />
                          ) : (
                            <CameraIcon className="Icon" />
                          )
                        }
                      </button>
                    )
                  }
                  {
                    stateLocal.modeImage ? (
                      <>
                        {
                          (srcImage || imageModel) ? (
                            <>
                              <img src={!imageModel ? srcImage : toUrl(imageModel)} alt={name || "imageName"} />
                            </>
                          ) : (
                            <PhotographIcon className="PhotographIcon" />
                          )
                        }
                      </>
                    ) : (
                      <>
                        {
                          (srcVideo || videoModel) ? (
                            <VideoContainer
                              srcImage={!imageModel ? srcImage : toUrl(imageModel)}
                              srcVideo={!videoModel ? srcVideo : toUrl(videoModel)}
                            />
                          ) : (
                            <p>Hola</p>
                          )
                        }
                      </>
                    )
                  }
                  <div className="buttonActionsPicture">
                    <Banner>
                      <CameraIcon className="Icon" />
                      <span className="Text">Imagen</span>
                      {
                        (imageModel || srcImage) && <CheckIcon className="Icon IconCheck" />
                      }
                      <div
                        className="tapBanner"
                        onClick={() => onClickModel("imageModel")}
                      ></div>
                    </Banner>
                    <Banner>
                      <VideoCameraIcon className="Icon" />
                      <span className="Text">Video</span>
                      {
                        (videoModel || srcVideo) && <CheckIcon className="Icon IconCheck" />
                      }
                      <div
                        className="tapBanner"
                        onClick={() => onClickModel("videoModel")}
                      ></div>
                    </Banner>
                    <input
                      type="file"
                      id="videoModel"
                      className="videoModel"
                      accept=".mp4"
                    />
                    <input
                      type="file"
                      id="imageModel"
                      className="imageModel"
                      accept="image/*"
                    />
                  </div>
                </figure>
                <div className="ContainerInputs">
                  <Input
                    name="nameModel"
                    className="Input"
                    placeholder="* Nombre"
                    type="text"
                    required
                    defaultValue={name}
                  />
                  <Input
                    name="priceModel"
                    className="Input"
                    placeholder="* Precio"
                    type="number"
                    min="0"
                    required
                    defaultValue={price}
                  />
                  <textarea
                    name="descriptionModel"
                    placeholder="Descripción"
                    className="Input"
                    defaultValue={description}
                    required
                    cols="30"
                    rows="10"></textarea>
                  <Input
                    name="offerModel"
                    className="Input"
                    placeholder="Oferta"
                    type="number"
                    max="100"
                    min="0"
                    defaultValue={offer}
                    required
                  />
                  <p className="TitleContainer">Links de referidos:</p>
                  <div className="LinksContainer">
                    <Banner>
                      <LinkIcon className="Icon" />
                      <input
                        name="facebookUrlModel"
                        required
                        type="url"
                        defaultValue={facebookUrl}
                        placeholder="url de Facebook" />
                    </Banner>
                    <Banner>
                      <LinkIcon className="Icon" />
                      <input
                        name="instagramUrlModel"
                        required
                        type="url"
                        defaultValue={instagramUrl}
                        placeholder="url de Instagram" />
                    </Banner>
                    <Banner>
                      <LinkIcon className="Icon" />
                      <input
                        name="tweeterUrlModel"
                        required
                        type="url"
                        defaultValue={tweeterUrl}
                        placeholder="url de Tweeter" />
                    </Banner>
                  </div>
                  <Button
                    className="PrimaryWave ButtonModalSaveProducts"
                    type="submit"
                    disabled={loading}
                  >
                    {
                      loading ? "Guardando" : "Guardar cambios"
                    }
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </Modal>
  );
}

SaveProduct.propTypes = {
  srcImage: PropTypes.string,
  srcVideo: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  offer: PropTypes.number,
  description: PropTypes.string,
  links: PropTypes.array,
  relationCategories: PropTypes.array,
  tweeterUrl: PropTypes.string,
  facebookUrl: PropTypes.string,
  instagramUrl: PropTypes.string,
  categoriesProductId: PropTypes.number,
  onToggleModalCreateProduct: PropTypes.func,
  onToggleOverlay: PropTypes.func,
  toEdit: PropTypes.bool
};

export {
  SaveProduct
};
