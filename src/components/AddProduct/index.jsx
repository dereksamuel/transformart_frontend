import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { CameraIcon, PhotographIcon, VideoCameraIcon, XIcon } from "@heroicons/react/outline";

import { setState } from "../../utils/setState";
import { SET_ALERT } from "../../store/types/alert";
import { useModel } from "../../hooks/useModel";

import { Banner } from "../Banner";
import { Input } from "../Input";
import { Button } from "../Button";
import { Alert } from "../Alert";

import "./styles.css";
import { uploadFiles } from "../../store/actions/products";

function AddProduct(props) {
  const sources = useSelector((stateLocal) => stateLocal.products.sources);
  const alert = useSelector((stateLocal) => stateLocal.alert.alert);

  const addProductFormRef = useRef(null);

  const [videoModel] = useModel({ initialValue: "", domEl: "#videoModel" });
  const [imageModel] = useModel({ initialValue: "", domEl: "#imageModel" });

  const dispatch = useDispatch();

  const onClickModel = (id) => {
    const $model = document.getElementById(id);

    $model.click();
  };

  const toUrl = (blob) => URL.createObjectURL(blob);

  const onHideAlert = () => {
    dispatch(setState({
      type: SET_ALERT,
      payload: {}
    }));
  };

  const onSaveProduct = async (event) => {
    event.preventDefault();

    let formData = new FormData(addProductFormRef.current);

    if (!videoModel || !imageModel) {
      dispatch(setState({
        type: SET_ALERT,
        payload: {
          title: "Error al guardar datos",
          description: "Es requerido que subas imagen y video para el producto",
          theme: "Error",
          showAlert: true,
        }
      }));
      return;
    }

    await dispatch(uploadFiles(videoModel, imageModel));

    console.log({
      name: formData.get("nameModel"),
      price: formData.get("priceModel"),
      description: formData.get("descriptionModel"),
      offer: formData.get("offerModel"),
      tweeterUrl: formData.get("tweeterUrlModel"),
      facebookUrl: formData.get("facebookUrlModel"),
      instagramUrl: formData.get("instagramUrlModel"),
      srcVideo: sources.srcVideo,
      srcImage: sources.srcImage,
    });
  };

  return (
    <form onSubmit={onSaveProduct} ref={addProductFormRef}>
      {
        (alert && alert.showAlert) && (
          <Alert
            title={alert.title}
            description={alert.description}
            theme={alert.theme}
            toLeft={true}
            onClick={onHideAlert}
          />
        )
      }
      <figure className="ContainerImage">
        {
          (props.srcImage || imageModel) ? (
            <img src={props.srcImage || toUrl(imageModel)} alt={props.name || "imageName"} />
          ) : (
            <PhotographIcon className="PhotographIcon" />
          )
        }
        <div className="buttonActionsPicture">
          <Banner>
            <CameraIcon className="Icon" />
            <span className="Text">{imageModel?.name || "Imagen"}</span>
            <div
              className="tapBanner"
              onClick={() => onClickModel("imageModel")}
            ></div>
          </Banner>
          <Banner>
            <VideoCameraIcon className="Icon" />
            <span className="Text">{videoModel?.name || "Video"}</span>
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
          defaultValue={props.name}
        />
        <Input
          name="priceModel"
          className="Input"
          placeholder="* Precio"
          type="number"
          min="0"
          required
          defaultValue={props.price}
        />
        <textarea
          name="descriptionModel"
          placeholder="Descripción"
          className="Input"
          defaultValue={props.description}
          required
          cols="30"
          rows="10"></textarea>
        <Input
          name="offerModel"
          className="Input"
          placeholder="Oferta"
          type="number"
          max="100"
          defaultValue={props.offer}
          required
        />
        <p className="TitleContainer">Links de referidos:</p>
        <div className="LinksContainer">
          <Banner>
            <CameraIcon className="Icon" />
            <input
              className="Text"
              name="facebookUrlModel"
              required
              type="url"
              defaultValue={props.facebookUrl}
              placeholder="url de Facebook" />
          </Banner>
          <Banner>
            <CameraIcon className="Icon" />
            <input
              className="Text"
              name="instagramUrlModel"
              required
              type="url"
              defaultValue={props.instagramUrl}
              placeholder="url de Instagram" />
          </Banner>
          <Banner>
            <CameraIcon className="Icon" />
            <input
              className="Text"
              name="tweeterUrlModel"
              required
              type="url"
              defaultValue={props.tweeterUrl}
              placeholder="url de Tweeter" />
          </Banner>
        </div>
        <p className="TitleContainer">Categorias relacionadas:</p>
        <div className="LinksContainer">
          {
            props.relationCategories.length && props.relationCategories.map((relationCategory) => (
              <div
                key={relationCategory.id}
                className={props.relationCategories.length === 1 && "DisabledBanner"}
              >
                <Banner>
                  <button className="button-without-styles" type="button">
                    <XIcon className="Icon" />
                  </button>
                  <span className="Text">{ relationCategory.name }</span>
                </Banner>
              </div>
            ))
          }
        </div>
        <Button
          className="PrimaryWave ButtonModalAddProducts"
          type="submit"
        >Guardar cambios</Button>
      </div>
    </form>
  );
}

AddProduct.propTypes = {
  srcImage: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  offer: PropTypes.number,
  description: PropTypes.string,
  links: PropTypes.array,
  relationCategories: PropTypes.array,
  tweeterUrl: PropTypes.string,
  facebookUrl: PropTypes.string,
  instagramUrl: PropTypes.string
};

export {
  AddProduct
};
