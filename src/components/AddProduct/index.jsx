import React from "react";
import PropTypes from "prop-types";
import { CameraIcon, PhotographIcon, VideoCameraIcon, XIcon } from "@heroicons/react/outline";

import { Banner } from "../Banner";
import { Input } from "../Input";
import { Button } from "../Button";

import "./styles.css";

function AddProduct(props) {
  return (
    <>
      <figure className="ContainerImage">
        {
          props.srcImage ? (
            <img src={props.srcImage} alt={props.name} />
          ) : (
            <PhotographIcon className="PhotographIcon" />
          )
        }
        <div className="buttonActionsPicture">
          <Banner>
            <CameraIcon className="Icon" />
            <span className="Text">Hola.jpg</span>
          </Banner>
          <Banner>
            <VideoCameraIcon className="Icon" />
            <span className="Text">Hola video.mp4</span>
          </Banner>
        </div>
      </figure>
      <div className="ContainerInputs">
        <Input
          className="Input"
          placeholder="* Nombre"
          defaultValue={props.name}
        />
        <Input
          className="Input"
          placeholder="* Precio"
          defaultValue={props.price}
        />
        <textarea
          placeholder="Descripción"
          className="Input"
          defaultValue={props.description}
          cols="30"
          rows="10"></textarea>
        <Input
          className="Input"
          placeholder="Oferta"
          defaultValue={props.offer}
        />
        <p className="TitleContainer">Links de referidos:</p>
        <div className="LinksContainer">
          <Banner>
            <CameraIcon className="Icon" />
            <input className="Text" placeholder="url de Facebook" />
          </Banner>
          <Banner>
            <CameraIcon className="Icon" />
            <input className="Text" placeholder="url de Instagram" />
          </Banner>
          <Banner>
            <CameraIcon className="Icon" />
            <input className="Text" placeholder="url de Tweeter" />
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
        <Button className="PrimaryWave ButtonModalAddProducts">Guardar cambios</Button>
      </div>
    </>
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
