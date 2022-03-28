import React, { useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";

import { Title } from "../../components/Title";
import { Acordion } from "../../components/Acordion";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";

import { useCP } from "../../hooks/useCP";

import "../Categories/styles.css";
import "./styles.css";
import { ModalCreateCategory } from "../../components/ModalCreateCategory";
import { ModalDeleteProduct } from "../../components/ModalDeleteProduct";

function UpdateArt() {
  const [state, setState] = useState({
    modalDeleteText: "",
    productId: null,
    categoriesProductsItem1: [],
    showModalCreateCategory: false,
    showModalDelete: false
  });
  const categoriesProductsArray = useCP();

  const onToggleModalDelete = (categoriesProductsItem1, productId) => {
    setState({
      ...state,
      productId,
      categoriesProductsItem1,
      modalDeleteText: "Quieres borrar este producto",
      showModalDelete: !state.showModalDelete
    });
  };

  const onToggleModalCreateCategory = () => {
    setState({
      ...state,
      showModalCreateCategory: !state.showModalCreateCategory
    });
  };

  const onCloseModalDelete = (onToggleOverlay) => {
    setState({
      ...state,
      showModalDelete: false
    });

    onToggleOverlay();
  };

  const onCloseModalCreateCategory = (onToggleOverlay) => {
    setState({
      ...state,
      showModalCreateCategory: false
    });

    onToggleOverlay();
  };

  return (
    <div className="UpdateArt">
      {
        state.showModalDelete ? (
          <ModalDeleteProduct
            onCloseModalDelete={onCloseModalDelete}
            state={state}
            setState={setState}
          />
        ) : ""
      }

      {
        state.showModalCreateCategory ? (
          <ModalCreateCategory onCloseModalCreateCategory={onCloseModalCreateCategory} />
        ) : ""
      }

      <Title className="SubTitle TitleCategories" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Actualizar arte</span>
      </Title>
      <div className="AcordionContainer">
        {
          (categoriesProductsArray && categoriesProductsArray.length) ? categoriesProductsArray.map((categoriesProductsItem, indexCPI) => (
            <div key={indexCPI}>
              {
                categoriesProductsItem[1].category && (
                  <Acordion>
                    <div className="AcordionTitle">
                      <p>{ categoriesProductsItem[1].category?.name }</p>
                      <div className="buttonsActions">
                        <button className="button-without-styles">
                          <TrashIcon />
                        </button>
                        <button className="button-without-styles">
                          <PencilIcon />
                        </button>
                        <button className="button-without-styles">
                          <PlusIcon />
                        </button>
                      </div>
                    </div>
                    <div className="CategoriesGrid">
                      {
                        [...categoriesProductsItem[1].products].map((product, index) => (
                          <div key={product ? product.id : index}>
                            {
                              product && (
                                <ProductItem key={product.id} product={product}>
                                  <Button
                                    className="ButtonToggleSize-danger"
                                    onClick={() => onToggleModalDelete(categoriesProductsItem[1], product.id)}
                                  >
                                    <TrashIcon />
                                    <span>Borrar</span>
                                  </Button>
                                </ProductItem>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  </Acordion>
                )
              }
            </div>
          )) : ""
        }
      </div>
      <div className="ZoneOfButton">
        <Button
          onClick={onToggleModalCreateCategory}
          className={"PrimaryWave ProductButton"}
        >
          <span>Crear Categoria</span>
        </Button>
      </div>
    </div>
  );
}

export {
  UpdateArt
};
