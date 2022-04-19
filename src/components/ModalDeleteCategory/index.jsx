import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

import { deleteCategory } from "../../store/actions/categories";
import { deleteCategoriesProduct } from "../../store/actions/categoriesProducts";
import { SET_ALERT } from "../../store/types/alert";

import { setState } from "../../utils/setState";

import { Modal } from "../Modal";
import { Button } from "../Button";

import "./styles.css";

function ModalDeleteCategory({
  state,
  onCloseModalDelete
}) {
  const [categoryDeleted, setCategoryDeleted] = useState(false);
  const deletedId = useSelector((state) => state.categories.deletedId);
  const dispatch = useDispatch();

  const onDeleteCategoriesProduct = async () => {
    await dispatch(deleteCategoriesProduct(deletedId));
  };

  const onDeleteCategory = async (onToggleOverlay) => {
    setCategoryDeleted(true);

    await dispatch(deleteCategory(state.categoryDelete.categoriesProductId));
    dispatch(setState({
      type: SET_ALERT,
      payload: {
        description: "Producto " + state.categoryDelete.category.name + " eliminado con éxito",
        theme: "Success",
        showAlert: true,
      }
    }));
    onCloseModalDelete(onToggleOverlay);
  };

  useEffect(async () => {
    if (deletedId && categoryDeleted) {
      await onDeleteCategoriesProduct();
    }
  }, [deletedId]);

  return (
    <Modal>
      {
        ({
          onToggleOverlay
        }) => (
          <div className="Modal DeleteModal">
            <div className="ModalContent">
              <header className="HeaderModal">
                <button
                  className="button-without-styles closeIcon"
                  onClick={() => onCloseModalDelete(onToggleOverlay)}
                >
                  <XIcon />
                </button>
              </header>
              <p className="labelModal">¿Quieres eliminar esta categoria?</p>
              <div className="ContainerButtonDelete">
                <Button
                  className="PrimaryWave DeleteButton"
                  onClick={() => onDeleteCategory(onToggleOverlay)}
                >Eliminar</Button>
              </div>
            </div>
          </div>
        )
      }
    </Modal>
  );
}


ModalDeleteCategory.propTypes = {
  onCloseModalDelete: PropTypes.func,
  state: PropTypes.any
};

export {
  ModalDeleteCategory
};
