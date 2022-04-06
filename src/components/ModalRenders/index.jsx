import React from "react";
import PropTypes from "prop-types";

import { Alert } from "../Alert";
import { ModalSaveCategory } from "../ModalSaveCategory";
import { ModalDeleteProduct } from "../ModalDeleteProduct";

import { ModalDeleteCategory } from "../ModalDeleteCategory";
import { ModalAddProducts } from "../ModalAddProducts";

function ModalRenders({
  state,
  setState,
  alert,
  categoriesProductsArray,
  onHideAlert,
  onCloseModalDelete,
  onCloseModalSaveCategory,
  onCloseModalAddProducts,
  onCloseModalDeleteCategory
}) {
  return (
    <>
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
      {
        state.showModalDelete && (
          <ModalDeleteProduct
            onCloseModalDelete={onCloseModalDelete}
            state={state}
            setState={setState}
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
          <ModalAddProducts
            onCloseModalAddProducts={onCloseModalAddProducts}
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
            setState={setState}
          />
        )
      }
    </>
  );
}

ModalRenders.propTypes = {
  state: PropTypes.any,
  alert: PropTypes.object,
  categoriesProductsArray: PropTypes.array,
  setState: PropTypes.func,
  onCloseModalSaveCategory: PropTypes.func,
  onCloseModalDeleteCategory: PropTypes.func,
  onCloseModalAddProducts: PropTypes.func,
  onCloseModalDelete: PropTypes.func,
  onHideAlert: PropTypes.func
};

export {
  ModalRenders
};
