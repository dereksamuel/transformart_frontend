import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { UpdateartUI } from "./UpdateArtUI";
import { ModalRenders } from "../../components/ModalRenders";

import { useCP } from "../../hooks/useCP";

import "../Categories/styles.css";
import "./styles.css";
import "./updateart-media-queries.css";

function UpdateArt() {
  const [state, setState] = useState({
    modalDeleteText: "",
    productId: null,
    categoriesProductsItem1: [],
    showModalCreateCategory: false,
    showModalCreateProduct: false,
    showModalDelete: null,
    category: null,
    categoryDelete: null,
    cpItemToCreateProduct: null,
    showModalUpdateProduct: false,
    srcImageProduct: "",
    srcVideoProduct: "",
    nameProduct: "",
    priceProduct: 0,
    offerProduct: 0,
    tweeterUrlProduct: "",
    descriptionProduct: "",
    instagramUrlProduct: "",
    facebookUrlProduct: ""
  });
  const navigate = useNavigate();
  const categoriesProductsArray = useCP();
  const isAuth = useSelector((stateLocal) => stateLocal.authenticate.isAuth);

  const onToggleModalCreateCategory = () => {
    setState({
      ...state,
      showModalCreateCategory: !state.showModalCreateCategory
    });
  };

  const onChangeToUpdateData = async (data) => {
    setState({
      ...state,
      ...data
    });
  };

  const onToggleModalCreateProduct = (onToggleOverlay) => {
    setState({
      ...state,
      showModalCreateProduct: !state.showModalCreateProduct
    });

    if (onToggleOverlay)
      onToggleOverlay();
  };

  const onToggleModalUpdateProduct = (onToggleOverlay, data) => {
    setState({
      ...state,
      showModalUpdateProduct: !state.showModalUpdateProduct,
      ...data
    });

    if (onToggleOverlay)
      onToggleOverlay();
  };

  const onEditCategory = (category) => {
    setState({
      ...state,
      category
    });
  };

  const onDeleteCategory = (categoryDelete) => {
    setState({
      ...state,
      categoryDelete
    });
  };

  const onCreateProduct = (cpItemToCreateProduct) => {
    setState({
      ...state,
      cpItemToCreateProduct
    });
  };

  const onToggleModalDeleteProduct = (product, onToggleOverlay) => {
    setState({
      ...state,
      productId: product?.id,
      showModalDelete: product
    });

    if (onToggleOverlay)
      onToggleOverlay();
  };

  const onCloseModalDeleteCategory = (onToggleOverlay) => {
    setState({
      ...state,
      categoryDelete: null
    });

    onToggleOverlay();
  };

  const onCloseModalAddProducts = (onToggleOverlay) => {
    setState({
      ...state,
      cpItemToCreateProduct: null
    });

    onToggleOverlay?.();
  };

  const onCloseModalSaveCategory = (onToggleOverlay) => {
    setState({
      ...state,
      showModalCreateCategory: false,
      category: null
    });

    onToggleOverlay?.();
  };

  useEffect(() => {
    if (!isAuth) {
      navigate({
        pathname: "/"
      });
    }
  }, [isAuth]);

  const toModalRenders = {
    state,
    categoriesProductsArray,
    setState,
    onCloseModalSaveCategory,
    onCloseModalAddProducts,
    onToggleModalDeleteProduct,
    onCloseModalDeleteCategory,
    onToggleModalCreateProduct,
    onToggleModalUpdateProduct
  };

  return (
    <>
      <ModalRenders {...toModalRenders} />
      <UpdateartUI
        toModalRenders={toModalRenders}
        onDeleteProduct={onToggleModalDeleteProduct}
        onToggleModalCreateCategory={onToggleModalCreateCategory}
        onToggleModalUpdateProduct={onToggleModalUpdateProduct}
        onToggleModalCreateProduct={onToggleModalCreateProduct}
        onDeleteCategory={onDeleteCategory}
        onEditCategory={onEditCategory}
        onChangeToUpdateData={onChangeToUpdateData}
        onCreateProduct={onCreateProduct}
      />
    </>
  );
}

export {
  UpdateArt
};
