import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { PencilIcon, PhotographIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";

import { Alert } from "../../components/Alert";
import { Title } from "../../components/Title";
import { Acordion } from "../../components/Acordion";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { Products } from "../../components/Products";
import { EmptyDraw } from "../../components/EmptyDraw";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";
import { onChangeAlert } from "../../store/actions/alert";

import "../Categories/styles.css";
import "./styles.css";

function UpdateartUI({
  toModalRenders,
  onDeleteCategory,
  onDeleteProduct,
  onEditCategory,
  onCreateProduct,
  onToggleModalCreateCategory,
  onToggleModalCreateProduct,
  onChangeToUpdateData,
  onToggleModalUpdateProduct
}) {
  const alert = useSelector((stateLocal) => stateLocal.alert.alert);
  const products = useSelector((state) => state.products.all);
  const categories = useSelector((state) => state.categories.all);
  const [state, setState] = useState({
    isModeCategory: true
  });
  const dispatch = useDispatch();

  const onChangeModeCategory = (isModeCategoryVal) => {
    setState({
      ...state,
      isModeCategory: isModeCategoryVal
    });
  };

  const ContainerCP = useMemo(() => (
    <div className="AcordionContainer">
      {
        (toModalRenders.categoriesProductsArray && toModalRenders.categoriesProductsArray.length) ?
          toModalRenders.categoriesProductsArray.map((categoriesProductsItem, indexCPI) => (
            <div key={indexCPI}>
              {
                categoriesProductsItem.category && (
                  <Acordion>
                    <div className="AcordionTitle">
                      <p>{ categoriesProductsItem.category?.name }</p>
                      <div className="buttonsActions">
                        <button
                          aria-label="Delete Category Button"
                          className="button-without-styles buttonAction"
                          onClick={() => onDeleteCategory(categoriesProductsItem)}
                        >
                          <TrashIcon />
                        </button>
                        <button
                          aria-label="Edit Category Button"
                          className="button-without-styles buttonAction"
                          onClick={() => onEditCategory(categoriesProductsItem.category)}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          aria-label="Add Product Button"
                          className="button-without-styles buttonAction"
                          onClick={() => onCreateProduct(categoriesProductsItem)}
                        >
                          <PhotographIcon />
                        </button>
                      </div>
                    </div>
                    <div className="CategoriesGrid">
                      {
                        [...categoriesProductsItem.products].map((product, index) => (
                          <div key={product ? product.id : index}>
                            {
                              product && (
                                <ProductItem key={product.id} product={product} />
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
          )) : (
            <div className="CategoriesEmpty ContainerProducts">
              <EmptyDraw titleEmpty="Aún no tienes categorias" />
            </div>
          )
      }
    </div>
  ), [toModalRenders.categoriesProductsArray]);

  const Children = useMemo(() => (
    <ul className="ContainerCategories ContainerCategoriesSticky">
      <li
        onClick={onChangeModeCategory}
        className={`SizeBanner ${state.isModeCategory && "SelectedSizeBanner"}`}
      >Categorias ({categories.length})</li>
      <li
        onClick={() => onChangeModeCategory(false)}
        className={`SizeBanner ${!state.isModeCategory && "SelectedSizeBanner"}`}
      >Productos ({products.length})</li>
    </ul>
  ), [state.isModeCategory, products.length, categories.length]);

  return (
    <div className="UpdateArt page">
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
      <Title className="SubTitle TitleButterFly" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Actualizar arte</span>
        <Button
          onClick={() => state.isModeCategory ? onToggleModalCreateCategory() : onToggleModalCreateProduct()}
          className={"PrimaryWave ProductButton PCBtnUpdate"}
        >
          {
            `Crear ${state.isModeCategory ? "categoria" : "producto"}`
          }
        </Button>
      </Title>
      { Children }
      {
        state.isModeCategory ?
          ContainerCP : (
            <Products
              onToggleModalUpdateProduct={onToggleModalUpdateProduct}
              onDeleteProduct={onDeleteProduct}
              onChangeToUpdateData={onChangeToUpdateData}
            />
          )
      }
      <div className="ZoneOfButton">
        <Button
          onClick={() => state.isModeCategory ? onToggleModalCreateCategory() : onToggleModalCreateProduct()}
          className={"PrimaryWave ProductButton"}
        >
          {
            `Crear ${state.isModeCategory ? "categoria" : "producto"}`
          }
        </Button>
      </div>
    </div>
  );
}

UpdateartUI.propTypes = {
  toModalRenders: PropTypes.object,
  onToggleModalCreateCategory: PropTypes.func,
  onToggleModalCreateProduct: PropTypes.func,
  onDeleteCategory: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onEditCategory: PropTypes.func,
  onCreateProduct: PropTypes.func,
  onChangeToUpdateData: PropTypes.func,
  onToggleModalUpdateProduct: PropTypes.func,
  children: PropTypes.any
};

export {
  UpdateartUI
};
