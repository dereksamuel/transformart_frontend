import React from "react";
import PropTypes from "prop-types";
import { CameraIcon, PhotographIcon, VideoCameraIcon, XIcon } from "@heroicons/react/outline";

import { useModel } from "../../hooks/useModel";

import { Banner } from "../Banner";
import { Input } from "../Input";
import { Button } from "../Button";

import "./styles.css";

function AddProduct(props) {
  const [videoModel] = useModel({
    initialValue: "",
    domEl: "#videoModel"
  });
  const [imageModel] = useModel({
    initialValue: "",
    domEl: "#imageModel"
  });

  const onClickModel = (id) => {
    const $model = document.getElementById(id);

    $model.click();
  };

  const toUrl = (blob) => URL.createObjectURL(blob);

  const onSaveProduct = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSaveProduct}>
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
          className="Input"
          placeholder="* Nombre"
          type="text"
          required
          defaultValue={props.name}
        />
        <Input
          className="Input"
          placeholder="* Precio"
          type="number"
          min="0"
          required
          defaultValue={props.price}
        />
        <textarea
          placeholder="Descripción"
          className="Input"
          defaultValue={props.description}
          required
          cols="30"
          rows="10"></textarea>
        <Input
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
              required
              placeholder="url de Facebook" />
          </Banner>
          <Banner>
            <CameraIcon className="Icon" />
            <input
              className="Text"
              required
              placeholder="url de Instagram" />
          </Banner>
          <Banner>
            <CameraIcon className="Icon" />
            <input
              className="Text"
              required
              placeholder="url de Tweeter" />
          </Banner>
        </div>
        <p className="TitleContainer">Categorias relacionadas:</p>
        <div className="LinksContainer">
          {
            props.relationCategories.length && props.relationCategories.map((relationCategory) => (
              <Banner key={relationCategory.id}>
                <button className="button-without-styles">
                  <XIcon className="Icon" />
                </button>
                <span className="Text">{ relationCategory.name }</span>
              </Banner>
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
  relationCategories: PropTypes.array
};

export {
  AddProduct
};
