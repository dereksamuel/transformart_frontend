import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { PencilIcon, PhotographIcon, TrashIcon } from "@heroicons/react/outline";

import { Title } from "../../components/Title";
import { Acordion } from "../../components/Acordion";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { Products } from "../../components/Products";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";

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
  const [state, setState] = useState({
    isModeCategory: true
  });

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
          )) : ""
      }
    </div>
  ), [toModalRenders.categoriesProductsArray]);

  const Children = useMemo(() => (
    <ul className="ContainerCategories ContainerCategoriesSticky">
      <li
        onClick={onChangeModeCategory}
        className={`SizeBanner ${state.isModeCategory && "SelectedSizeBanner"}`}
      >Categorias</li>
      <li
        onClick={() => onChangeModeCategory(false)}
        className={`SizeBanner ${!state.isModeCategory && "SelectedSizeBanner"}`}
      >Productos</li>
    </ul>
  ), [state.isModeCategory]);

  return (
    <div className="UpdateArt page">
      <Title className="SubTitle TitleCategories" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Actualizar arte</span>
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
