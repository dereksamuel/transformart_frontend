import React from "react";
import PropTypes from "prop-types";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";

import { Title } from "../../components/Title";
import { Acordion } from "../../components/Acordion";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";

import "../Categories/styles.css";
import "./styles.css";

function UpdateartUI({
  toModalRenders,
  onDeleteCategory,
  onEditCategory,
  onCreateProduct,
  onToggleModalDelete,
  onToggleModalCreateCategory
}) {
  return (
    <div className="UpdateArt">
      <Title className="SubTitle TitleCategories" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Actualizar arte</span>
      </Title>
      <div className="AcordionContainer">
        {
          (toModalRenders.categoriesProductsArray && toModalRenders.categoriesProductsArray.length) ?
            toModalRenders.categoriesProductsArray.map((categoriesProductsItem, indexCPI) => (
              <div key={indexCPI}>
                {
                  categoriesProductsItem[1].category && (
                    <Acordion>
                      <div className="AcordionTitle">
                        <p>{ categoriesProductsItem[1].category?.name }</p>
                        <div className="buttonsActions">
                          <button
                            aria-label="Delete Category Button"
                            className="button-without-styles buttonAction"
                            onClick={() => onDeleteCategory(categoriesProductsItem[1])}
                          >
                            <TrashIcon />
                          </button>
                          <button
                            aria-label="Edit Category Button"
                            className="button-without-styles buttonAction"
                            onClick={() => onEditCategory(categoriesProductsItem[1].category)}
                          >
                            <PencilIcon />
                          </button>
                          <button
                            aria-label="Add Product Button"
                            className="button-without-styles buttonAction"
                            onClick={() => onCreateProduct(categoriesProductsItem[1])}
                          >
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
                                    <div className="ContainerButtonsProduct">
                                      <Button
                                        className="ButtonToggleSize-danger"
                                        onClick={() => onToggleModalDelete(categoriesProductsItem[1], product.id)}
                                      >
                                        <TrashIcon />
                                      </Button>
                                      <Button
                                        className="PrimaryWave"
                                        onClick={() => onToggleModalDelete(categoriesProductsItem[1], product.id)}
                                      >
                                        <PencilIcon />
                                      </Button>
                                    </div>
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

UpdateartUI.propTypes = {
  toModalRenders: PropTypes.object,
  onToggleModalCreateCategory: PropTypes.func,
  onToggleModalDelete: PropTypes.func,
  onDeleteCategory: PropTypes.func,
  onEditCategory: PropTypes.func,
  onCreateProduct: PropTypes.func
};

const UpdateartUIMemo = React.memo(UpdateartUI);

export {
  UpdateartUIMemo
};
