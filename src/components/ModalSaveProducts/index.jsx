import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";

import { Modal } from "../Modal";
import { Title } from "../Title";
import { Button } from "../Button";

import { createCategoriesProduct, deleteCategoriesProduct } from "../../store/actions/categoriesProducts";
import { SET_ALERT } from "../../store/types/alert";

import { setState as setStateRedux } from "../../utils/setState";
import { refreshQueries } from "../../utils/refreshQueries";

import "./styles.css";

function ModalSaveProducts({ onCloseModalSaveProducts, cpItemToCreateProduct, categoriesProducts }) {
  const products = useSelector((state) => state.products.all);
  const [state, setState] = useState({
    selectedSetter: new Set()
  });
  // const productsInThis = new Set();
  const dispatch = useDispatch();
  const selectedCP = categoriesProducts.find((cp) => cp.categoriesProductId === cpItemToCreateProduct.categoriesProductId);
  const resultsWithoutAdd = new Set();

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

  const onAddProducts = async (onToggleOverlay) => {
    if (state.selectedSetter) {
      const selectedProducts = products.map((product) => ({
        ...product,
        selected: [...state.selectedSetter].find((selected) => selected === product.id),
        isInDB: [...cpItemToCreateProduct.products].some((productCp) => productCp.id === product.id)
      }));

      for (const selectedProduct of selectedProducts) {
        if (!(selectedProduct.isInDB && selectedProduct.selected)) {
          if (!selectedProduct.isInDB && selectedProduct.selected) {
            dispatch(createCategoriesProduct(cpItemToCreateProduct.category.id, selectedProduct.id));
          }

          if (selectedProduct.isInDB && !selectedProduct.selected) {
            await dispatch(deleteCategoriesProduct(
              cpItemToCreateProduct.categoriesProductId,
              selectedProduct.id,
              cpItemToCreateProduct.category.id
            ));
          }
        }
      }

      await refreshQueries(dispatch);

      dispatch(setStateRedux({
        type: SET_ALERT,
        payload: {
          description: "Productos actualizados dentro de la categoria",
          theme: "Success",
          showAlert: true,
        }
      }));

      onToggleOverlay();
      onCloseModalSaveProducts();
    }
  };

  const isInCP = (productId) => {
    const results = [...selectedCP.products].find((product) => {
      const response = product.id === productId;

      if (!response) {
        resultsWithoutAdd.add(product);
      }

      return response;
    });

    return results;
  };

  const newSetter = new Set();

  useEffect(() => {
    products.map((product) => {
      if (isInCP(product.id))
        newSetter.add(isInCP(product.id).id);

      setState({
        ...state,
        selectedSetter: newSetter
      });
    });
  }, []);

  return (
    <Modal>
      {
        ({
          onToggleOverlay
        }) => (
          <div className="Modal CategorySaveModal">
            <div className="ModalContent">
              <header className="HeaderModal">
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
              </header>
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
              {
                products && products.length ? (
                  <footer className="FooterModal">
                    <Button
                      onClick={() => onAddProducts(onToggleOverlay)}
                      className="PrimaryWave ButtonModalSaveProductsUpgrade"
                    >Guardar cambios</Button>
                  </footer>
                ) : ""
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
