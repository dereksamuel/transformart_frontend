import React, { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

import { Modal } from "../Modal";
import { Title } from "../Title";
import { Button } from "../Button";
import { AddProduct } from "../AddProduct";

import "./styles.css";
import { useSelector } from "react-redux";

function ModalAddProducts({
  categoriesProducts,
  cpItemToCreateProduct,
  onCloseModalAddProducts
}) {
  const products = useSelector((stateLocal) => stateLocal.products.all);
  const [state, setState] = useState({
    view: 1
  });
  const cpComplete = categoriesProducts.map((cpItem) => ({
    ...cpItem[1]
  }));
  let relationCategories = [...cpItemToCreateProduct.products][0] ? cpComplete.filter((cp) =>
    [...cpItemToCreateProduct.products].find(
      (product) => {
        return [...cp.products][0] ? [...cp.products].find((productLocal) => {
          return productLocal.id === product.id;
        }) : null;
      }
    )) : [cpItemToCreateProduct.category];
  relationCategories = [...cpItemToCreateProduct.products][0] ?
    relationCategories.map((relationCategoryItem) => relationCategoryItem.category) :
    relationCategories;

  const onCreateNewArt = () => {
    setState({
      ...state,
      view: 2
    });
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
                onClick={() => onCloseModalAddProducts(onToggleOverlay)}
              >
                <XIcon />
              </button>
              <Title
                isTitle={false}
                className="SubTitle TitleModal"
              >
                Añadir arte
              </Title>
              {
                state.view === 1 && (
                  <div className="buttonsModalSecodaries">
                    {
                      (products && products.length) ? (
                        <Button
                          className="PrimaryWave ButtonSecondaryClick ButtonSecondaryModal"
                        >
                          <span>Arte existente</span>
                        </Button>
                      ) : ""
                    }
                    <Button
                      className="PrimaryWave ButtonSecondaryClick ButtonSecondaryModal"
                      onClick={onCreateNewArt}
                    >
                      <span>Nuevo arte</span>
                    </Button>
                  </div>
                )
              }
              {
                state.view === 2 && (
                  <AddProduct
                    relationCategories={relationCategories}
                    categoriesProductId={cpItemToCreateProduct.categoriesProductId}
                    onCloseModalAddProducts={onCloseModalAddProducts}
                    onToggleOverlay={onToggleOverlay}
                  />
                )
              }
            </div>
          </div>
        )
      }
    </Modal>
  );
}

ModalAddProducts.propTypes = {
  onCloseModalAddProducts: PropTypes.func,
  updateData: PropTypes.any,
  cpItemToCreateProduct: PropTypes.object,
  categoriesProducts: PropTypes.any
};

export {
  ModalAddProducts
};
