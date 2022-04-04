import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { CameraIcon, PhotographIcon, VideoCameraIcon, XIcon } from "@heroicons/react/outline";

import { SET_ALERT } from "../../store/types/alert";
import { createCategoriesProduct } from "../../store/actions/categoriesProducts";
import { createProduct, uploadFiles } from "../../store/actions/products";
import { SET_CREATED } from "../../store/types/products";

import { setState } from "../../utils/setState";
import { onClickModel, toUrl } from "../../utils/addProduct";
import { useModel } from "../../hooks/useModel";

import { Banner } from "../Banner";
import { Input } from "../Input";
import { Button } from "../Button";
import { Alert } from "../Alert";

import "./styles.css";

function AddProduct(props) {
  const sources = useSelector((stateLocal) => stateLocal.products.sources);
  const createdId = useSelector((stateLocal) => stateLocal.products.createdId);
  const alert = useSelector((stateLocal) => stateLocal.alert.alert);
  const loading = useSelector((stateLocal) => stateLocal.products.loading);

  const addProductFormRef = useRef(null);

  const [videoModel] = useModel({ initialValue: "", domEl: "#videoModel" });
  const [imageModel] = useModel({ initialValue: "", domEl: "#imageModel" });

  const dispatch = useDispatch();

  const onHideAlert = () => {
    dispatch(setState({
      type: SET_ALERT,
      payload: {}
    }));
  };

  const onSaveProduct = async (event) => {
    event.preventDefault();

    if (!videoModel || !imageModel) {
      dispatch(setState({
        type: SET_ALERT,
        payload: {
          description: "Es requerido que subas imagen y video para el producto",
          theme: "Error",
          showAlert: true,
        }
      }));
      return;
    }

    await dispatch(uploadFiles(videoModel, imageModel));
  };

  const onCreatedProduct = () => {
    props.relationCategories.map((relationCategoryLocal) => {
      // dispatch(updateCategoriesProduct({
      //   createCategoriesProductId: props.categoriesProductId,
      //   categoriesId: relationCategoryLocal.id,
      //   productsId: createdId.id
      // }));
      dispatch(createCategoriesProduct(relationCategoryLocal.id, createdId.id));
    });
    dispatch(setState({ type: SET_CREATED, payload: null }));
    props.onCloseModalAddProducts(props.onToggleOverlay);
  };

  useEffect(async () => {
    if (sources) {
      let formData = new FormData(addProductFormRef.current);

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
      console.log("Printed");
      onCreatedProduct();
    }
  }, [createdId]);

  return (
    <form onSubmit={onSaveProduct} ref={addProductFormRef}>
      {
        (alert && alert.showAlert) && (
          <Alert
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
          min="0"
          defaultValue={props.offer}
          required
        />
        <p className="TitleContainer">Links de referidos:</p>
        <div className="LinksContainer">
          <Banner>
            <CameraIcon className="Icon" />
            <input
              name="facebookUrlModel"
              required
              type="url"
              defaultValue={props.facebookUrl}
              placeholder="url de Facebook" />
          </Banner>
          <Banner>
            <CameraIcon className="Icon" />
            <input
              name="instagramUrlModel"
              required
              type="url"
              defaultValue={props.instagramUrl}
              placeholder="url de Instagram" />
          </Banner>
          <Banner>
            <CameraIcon className="Icon" />
            <input
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
          disabled={loading}
        >
          {
            loading ? "Guardando" : "Guardar cambios"
          }
        </Button>
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
  instagramUrl: PropTypes.string,
  categoriesProductId: PropTypes.number,
  onCloseModalAddProducts: PropTypes.func,
  onToggleOverlay: PropTypes.func,
  toEdit: PropTypes.bool
};

export {
  AddProduct
};
