import React from "react";
import PropTypes from "prop-types";

import { ModalSaveCategory } from "../ModalSaveCategory";
import { ModalDeleteProduct } from "../ModalDeleteProduct";
import { ModalSaveProducts } from "../ModalSaveProducts";
import { ModalDeleteCategory } from "../ModalDeleteCategory";

import { SaveProduct } from "../SaveProduct";

function ModalRenders({
  state,
  setState,
  categoriesProductsArray,
  onToggleModalDeleteProduct,
  onCloseModalSaveCategory,
  onCloseModalAddProducts,
  onCloseModalDeleteCategory,
  onToggleModalCreateProduct,
  onToggleModalUpdateProduct
}) {
  return (
    <>
      {
        state.showModalDelete && (
          <ModalDeleteProduct
            onToggleModalDeleteProduct={onToggleModalDeleteProduct}
            state={state}
            setState={setState}
          />
        )
      }
      {
        state.showModalCreateProduct && (
          <SaveProduct
            onToggleModalCreateProduct={onToggleModalCreateProduct}
          />
        )
      }
      {
        state.showModalUpdateProduct && (
          <SaveProduct
            id={state.idProduct}
            onToggleModalCreateProduct={onToggleModalUpdateProduct}
            srcImage={state.srcImageProduct}
            srcVideo={state.srcVideoProduct}
            name={state.nameProduct}
            price={state.priceProduct && Number(state.priceProduct)}
            offer={state.offerProduct && Number(state.offerProduct)}
            description={state.descriptionProduct}
            instagramUrl={state.instagramUrlProduct}
            facebookUrl={state.facebookUrlProduct}
          />
        )
      }
      {
        state.showModalCreateCategory && (
          <ModalSaveCategory
            onCloseModalSaveCategory={onCloseModalSaveCategory}
          />
        )
      }
      {
        state.category && (
          <ModalSaveCategory
            onCloseModalSaveCategory={onCloseModalSaveCategory}
            updateData={state.category}
          />
        )
      }
      {
        state.cpItemToCreateProduct && (
          <ModalSaveProducts
            onCloseModalSaveProducts={onCloseModalAddProducts}
            cpItemToCreateProduct={state.cpItemToCreateProduct}
            categoriesProducts={categoriesProductsArray}
          />
        )
      }
      {
        state.categoryDelete && (
          <ModalDeleteCategory
            onCloseModalDelete={onCloseModalDeleteCategory}
            state={state}
          />
        )
      }
    </>
  );
}

ModalRenders.propTypes = {
  state: PropTypes.any,
  categoriesProductsArray: PropTypes.array,
  setState: PropTypes.func,
  onCloseModalSaveCategory: PropTypes.func,
  onCloseModalDeleteCategory: PropTypes.func,
  onCloseModalAddProducts: PropTypes.func,
  onToggleModalDeleteProduct: PropTypes.func,
  onToggleModalCreateProduct: PropTypes.func,
  onToggleModalUpdateProduct: PropTypes.func
};

export {
  ModalRenders
};
