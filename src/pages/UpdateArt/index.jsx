import React, { useState, useMemo } from "react";

import { useCP } from "../../hooks/useCP";

import "../Categories/styles.css";
import "./styles.css";
import { UpdateartUI } from "./UpdateArtUI";
import { ModalRenders } from "../../components/ModalRenders";

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
  const categoriesProductsArray = useCP();

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

  const onCloseModalAddProducts = (onToggleOverlay) => {
    setState({
      ...state,
      cpItemToCreateProduct: null
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

  const toModalRenders = {
    state,
    categoriesProductsArray,
    setState,
    onCloseModalSaveCategory,
    onCloseModalAddProducts,
    onCloseModalDelete,
    onCloseModalDeleteCategory
  };

  const UpdateartUIMemo = useMemo(() => (
    <UpdateartUI
      toModalRenders={toModalRenders}
      onToggleModalCreateCategory={onToggleModalCreateCategory}
      onToggleModalDelete={onToggleModalDelete}
      onDeleteCategory={onDeleteCategory}
      onEditCategory={onEditCategory}
      onCreateProduct={onCreateProduct}
    />
  ), [categoriesProductsArray]);

  return (
    <>
      <ModalRenders {...toModalRenders} />
      { UpdateartUIMemo }
    </>
  );
}

export {
  UpdateArt
};
