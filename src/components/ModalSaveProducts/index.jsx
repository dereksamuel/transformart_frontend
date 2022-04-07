import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/solid";

import { Modal } from "../Modal";
import { Title } from "../Title";
import { Button } from "../Button";
import { SaveProduct } from "../SaveProduct";
import { SaveExistentProduct } from "../SaveExistentProduct";

import "./styles.css";

function ModalSaveProducts({
  categoriesProducts,
  cpItemToCreateProduct,
  onCloseModalSaveProducts
}) {
  const products = useSelector((stateLocal) => stateLocal.products.all);
  const [state, setState] = useState({
    view: 1,
  });
  const cpComplete = categoriesProducts.map((cpItem) => cpItem[1]);

  let relationCategories = [...cpItemToCreateProduct.products][0] ? cpComplete.filter((cpItem) => {
    return [...cpItemToCreateProduct.products].find(
      (product) => {
        return [...cpItem.products][0] ? [...cpItem.products].find((productLocal) => {
          return productLocal.id === product.id;
        }) : null;
      }
    );
  }) : [cpItemToCreateProduct.category];

  const onCreateNewArt = () => setState({
    ...state,
    view: 2
  });

  const onCreateExistentArt = () => setState({
    ...state,
    view: 3
  });

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
                Añadir arte
              </Title>
              {
                state.view === 1 && (
                  <div className="buttonsModalSecodaries">
                    {
                      (products && products.length) ? (
                        <Button
                          onClick={onCreateExistentArt}
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
                  <SaveProduct
                    relationCategories={relationCategories}
                    categoriesProductId={cpItemToCreateProduct.categoriesProductId}
                    onCloseModalSaveProducts={onCloseModalSaveProducts}
                    onToggleOverlay={onToggleOverlay}
                  />
                )
              }
              {
                state.view === 3 && (
                  <SaveExistentProduct
                    cpComplete={cpComplete}
                    categoriesProductId={cpItemToCreateProduct.categoriesProductId}
                    onCloseModalSaveProducts={onCloseModalSaveProducts}
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

ModalSaveProducts.propTypes = {
  onCloseModalSaveProducts: PropTypes.func,
  updateData: PropTypes.any,
  cpItemToCreateProduct: PropTypes.object,
  categoriesProducts: PropTypes.any
};

export {
  ModalSaveProducts
};
