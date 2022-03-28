import React from "react";
import { useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

import { deleteCategory } from "../../store/actions/categories";
import { deleteProduct } from "../../store/actions/products";

import { Modal } from "../Modal";
import { Button } from "../Button";

import "./styles.css";

function ModalDeleteProduct(props) {
  const dispatch = useDispatch();

  const onDeleteProduct = async (onToggleOverlay) => {
    if (props.state.categoriesProductsItem1.products.length === 1) {
      await dispatch(deleteCategory(props.state.categoriesProductsItem1.category.id));
    }

    await dispatch(deleteProduct(props.state.productId));

    props.setState({
      ...props.state,
      productId: null,
      modalDeleteText: "",
      showModalDelete: false
    });
    props.onCloseModalDelete(onToggleOverlay);
  };

  return (
    <Modal>
      {
        ({
          onToggleOverlay
        }) => (
          <div className="Modal DeleteModal">
            <div className="ModalContent">
              <button
                className="button-without-styles closeIcon"
                onClick={() => props.onCloseModalDelete(onToggleOverlay)}
              >
                <XIcon />
              </button>
              <p className="labelModal">¿Quieres eliminar esta categoria?</p>
              <div className="ContainerButtonDelete">
                <Button
                  className="PrimaryWave DeleteButton"
                  onClick={() => onDeleteProduct(onToggleOverlay)}
                >Eliminar</Button>
              </div>
            </div>
          </div>
        )
      }
    </Modal>
  );
}


ModalDeleteProduct.propTypes = {
  onCloseModalDelete: PropTypes.func,
  state: PropTypes.any,
  setState: PropTypes.any
};

export {
  ModalDeleteProduct
};
