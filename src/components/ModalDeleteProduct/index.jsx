import React from "react";
import { useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

import { deleteProduct } from "../../store/actions/products";

import { Modal } from "../Modal";
import { Button } from "../Button";

import "./styles.css";

function ModalDeleteProduct({
  state,
  setState,
  onToggleModalDeleteProduct
}) {
  const dispatch = useDispatch();

  const onDeleteProduct = async (onToggleOverlay) => {
    await dispatch(deleteProduct(state.productId));

    setState({
      ...state,
      productId: null,
      modalDeleteText: "",
      showModalDelete: false
    });

    //FIXME: To show alert when delete a product 📍📍📍📍📍📍📍📍📍📍📍📍📍📍                                       

    onToggleModalDeleteProduct(null, onToggleOverlay);
  };

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
                  onClick={() => onToggleModalDeleteProduct(null, onToggleOverlay)}
                >
                  <XIcon />
                </button>
                <p className="labelModal">¿Quieres eliminar este producto?</p>
              </header>
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
  onToggleModalDeleteProduct: PropTypes.func,
  state: PropTypes.any,
  setState: PropTypes.any
};

export {
  ModalDeleteProduct
};
