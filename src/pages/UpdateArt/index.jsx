import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";

import { Title } from "../../components/Title";
import { Acordion } from "../../components/Acordion";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { Alert } from "../../components/Alert";
import { ModalSaveCategory } from "../../components/ModalSaveCategory";
import { ModalDeleteProduct } from "../../components/ModalDeleteProduct";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";

import { useCP } from "../../hooks/useCP";
import { setState as setStateUtils } from "../../utils/setState";

import "../Categories/styles.css";
import "./styles.css";
import { SET_ALERT } from "../../store/types/alert";
import { ModalDeleteCategory } from "../../components/ModalDeleteCategory";

function UpdateArt() {
  const [state, setState] = useState({
    modalDeleteText: "",
    productId: null,
    categoriesProductsItem1: [],
    showModalCreateCategory: false,
    showModalDelete: false,
    category: null,
    categoryIdDelete: null
  });
  const alert = useSelector((stateLocal) => stateLocal.alert.alert);
  const categoriesProductsArray = useCP();
  const dispatch = useDispatch();

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

  const onCloseModalDeleteCategory = (onToggleOverlay) => {
    setState({
      ...state,
      categoryIdDelete: null
    });

    onToggleOverlay();
  };

  const onCloseModalSaveCategory = (onToggleOverlay) => {
    setState({
      ...state,
      showModalCreateCategory: false,
      category: null
    });

    onToggleOverlay();
  };

  const onEditCategory = (category) => {
    setState({
      ...state,
      category
    });
  };

  const onDeleteCategory = (categoryIdDelete) => {
    setState({
      ...state,
      categoryIdDelete
    });
  };

  const onHideAlert = () => {
    dispatch(setStateUtils({
      type: SET_ALERT,
      payload: {}
    }));
  };

  return (
    <div className="UpdateArt">
      {
        (alert && alert.showAlert) && (
          <Alert
            title={alert.title}
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
        state.categoryIdDelete && (
          <ModalDeleteCategory
            onCloseModalDelete={onCloseModalDeleteCategory}
            state={state}
            setState={setState}
          />
        )
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
                        <button
                          className="button-without-styles buttonAction"
                          onClick={() => onDeleteCategory(categoriesProductsItem[1].categoriesProductId)}
                        >
                          <TrashIcon />
                        </button>
                        <button
                          className="button-without-styles buttonAction"
                          onClick={() => onEditCategory(categoriesProductsItem[1].category)}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          className="button-without-styles buttonAction">
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
