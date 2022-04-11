import React, { useState } from "react";
import PropTypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";

import { Modal } from "../Modal";
import { Title } from "../Title";

import "./styles.css";
import { useSelector } from "react-redux";

function ModalSaveProducts({ onCloseModalSaveProducts }) {
  const products = useSelector((state) => state.products.all);
  const [state, setState] = useState({
    selectedSetter: new Set()
  });

  const onToggleSelected = (value) => {
    const newSelectedSetter = new Set(state.selectedSetter);

    if (state.selectedSetter.has(value)) {
      newSelectedSetter.delete(value);

      setState({
        ...state,
        selectedSetter: newSelectedSetter
      });
    } else {
      newSelectedSetter.add(value);

      setState({
        ...state,
        selectedSetter: newSelectedSetter
      });
    }
  };

  return (
    <Modal>
      {
        ({
          onToggleOverlay
        }) => (
          <div className="Modal CategorySaveModal">
            <div className="ModalContent">
              <button
                className="button-without-styles closeIcon"
                onClick={() => onCloseModalSaveProducts(onToggleOverlay)}
              >
                <XIcon />
              </button>
              <Title
                isTitle={false}
                className="SubTitle TitleModal"
              >
                { !(products && products.length) ? "Aún no tienes ningún producto" : "Añadir productos" }
              </Title>
              <div className="SaveExistentProduct">
                {
                  (products && products.length) ? products.map((product) => (
                    <li key={product.id} className="ProductItemSaveModal">
                      <button
                        onClick={() => onToggleSelected(product.id)}
                        className="button-without-styles"
                      >
                        <img className={`ProductItemSaveModal--image
                          ${(state.selectedSetter.has(product.id)) && "SelectedButton"}
                        `} src={product.srcImage} alt={product.name} />
                      </button>
                    </li>
                  )) : ""
                }
              </div>
            </div>
          </div>
        )
      }
    </Modal>
  );
}

ModalSaveProducts.propTypes = {
  onCloseModalSaveProducts: PropTypes.func,
  updateData: PropTypes.any,
  cpItemToCreateProduct: PropTypes.object,
  categoriesProducts: PropTypes.any
};

export {
  ModalSaveProducts
};
