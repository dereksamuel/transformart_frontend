import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Alert } from "../Alert";
import { ModalSaveCategory } from "../ModalSaveCategory";
import { ModalDeleteProduct } from "../ModalDeleteProduct";
import { ModalSaveProducts } from "../ModalSaveProducts";
import { ModalDeleteCategory } from "../ModalDeleteCategory";

import { onChangeAlert } from "../../store/actions/alert";

function ModalRenders({
  state,
  setState,
  categoriesProductsArray,
  onCloseModalDelete,
  onCloseModalSaveCategory,
  onCloseModalAddProducts,
  onCloseModalDeleteCategory
}) {
  const alert = useSelector((stateLocal) => stateLocal.alert.alert);
  const dispatch = useDispatch();

  return (
    <>
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
  onCloseModalDelete: PropTypes.func
};

export {
  ModalRenders
};
