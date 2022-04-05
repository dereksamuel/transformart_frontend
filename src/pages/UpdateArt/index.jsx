import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCP } from "../../hooks/useCP";
import { setState as setStateUtils } from "../../utils/setState";

import "../Categories/styles.css";
import "./styles.css";
import { SET_ALERT } from "../../store/types/alert";
import { UpdateartUIMemo } from "./UpdateArtUI";

function UpdateArt() {
  const [state, setState] = useState({
    modalDeleteText: "",
    productId: null,
    categoriesProductsItem1: [],
    showModalCreateCategory: false,
    showModalDelete: false,
    category: null,
    categoryDelete: null,
    cpItemToCreateProduct: null
  });
  const alert = useSelector((stateLocal) => stateLocal.alert.alert);
  const categoriesProductsArray = useCP();
  const dispatch = useDispatch();

  const onToggleModalDelete = (categoriesProductsItem1, productId) => {
    setState({
      ...state,
      productId,
      categoriesProductsItem1,
      modalDeleteText: "Quieres borrar este producto",
      showModalDelete: !state.showModalDelete
    });
  };

  const onToggleModalCreateCategory = () => {
    setState({
      ...state,
      showModalCreateCategory: !state.showModalCreateCategory
    });
  };

  const onCloseModalDelete = (onToggleOverlay) => {
    setState({
      ...state,
      showModalDelete: false
    });

    onToggleOverlay();
  };

  const onCloseModalDeleteCategory = (onToggleOverlay) => {
    setState({
      ...state,
      categoryDelete: null
    });

    onToggleOverlay();
  };

  const onCloseModalSaveCategory = (onToggleOverlay) => {
    setState({
      ...state,
      showModalCreateCategory: false,
      category: null
    });

    onToggleOverlay();
  };

  const onCloseModalAddProducts = (onToggleOverlay) => {
    setState({
      ...state,
      cpItemToCreateProduct: null
    });

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

  const onHideAlert = () => {
    dispatch(setStateUtils({
      type: SET_ALERT,
      payload: {}
    }));
  };

  const onCreateProduct = (cpItemToCreateProduct) => {
    setState({
      ...state,
      cpItemToCreateProduct
    });
  };

  return (
    <UpdateartUIMemo
      alert={alert}
      state={state}
      categoriesProductsArray={categoriesProductsArray}
      onToggleModalCreateCategory={onToggleModalCreateCategory}
      onToggleModalDelete={onToggleModalDelete}
      onDeleteCategory={onDeleteCategory}
      onEditCategory={onEditCategory}
      onCreateProduct={onCreateProduct}
      setState={setState}
      onCloseModalSaveCategory={onCloseModalSaveCategory}
      onCloseModalDeleteCategory={onCloseModalDeleteCategory}
      onCloseModalAddProducts={onCloseModalAddProducts}
      onCloseModalDelete={onCloseModalDelete}
      onHideAlert={onHideAlert}
    />
  );
}

export {
  UpdateArt
};
