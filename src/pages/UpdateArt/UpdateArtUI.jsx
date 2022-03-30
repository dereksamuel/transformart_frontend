import React from "react";
import PropTypes from "prop-types";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";

import { Title } from "../../components/Title";
import { Acordion } from "../../components/Acordion";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { Alert } from "../../components/Alert";
import { ModalSaveCategory } from "../../components/ModalSaveCategory";
import { ModalDeleteProduct } from "../../components/ModalDeleteProduct";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";

import { ModalDeleteCategory } from "../../components/ModalDeleteCategory";
import { ModalAddProducts } from "../../components/ModalAddProducts";

import "../Categories/styles.css";
import "./styles.css";

function UpdateartUI(props) {
  return (
    <div className="UpdateArt">
      {
        (props.alert && props.alert.showAlert) && (
          <Alert
            title={props.alert.title}
            description={props.alert.description}
            theme={props.alert.theme}
            toLeft={true}
            onClick={props.onHideAlert}
          />
        )
      }
      {
        props.state.showModalDelete && (
          <ModalDeleteProduct
            onCloseModalDelete={props.onCloseModalDelete}
            state={props.state}
            setState={props.setState}
          />
        )
      }

      {
        props.state.showModalCreateCategory && (
          <ModalSaveCategory
            onCloseModalSaveCategory={props.onCloseModalSaveCategory}
          />
        )
      }

      {
        props.state.category && (
          <ModalSaveCategory
            onCloseModalSaveCategory={props.onCloseModalSaveCategory}
            updateData={props.state.category}
          />
        )
      }

      {
        props.state.cpItemToCreateProduct && (
          <ModalAddProducts
            onCloseModalAddProducts={props.onCloseModalAddProducts}
            cpItemToCreateProduct={props.state.cpItemToCreateProduct}
          />
        )
      }

      {
        props.state.categoryIdDelete && (
          <ModalDeleteCategory
            onCloseModalDelete={props.onCloseModalDeleteCategory}
            state={props.state}
            setState={props.setState}
          />
        )
      }

      <Title className="SubTitle TitleCategories" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Actualizar arte</span>
      </Title>
      <div className="AcordionContainer">
        {
          (props.categoriesProductsArray && props.categoriesProductsArray.length) ?
            props.categoriesProductsArray.map((categoriesProductsItem, indexCPI) => (
              <div key={indexCPI}>
                {
                  categoriesProductsItem[1].category && (
                    <Acordion>
                      <div className="AcordionTitle">
                        <p>{ categoriesProductsItem[1].category?.name }</p>
                        <div className="buttonsActions">
                          <button
                            className="button-without-styles buttonAction"
                            onClick={() => props.onDeleteCategory(categoriesProductsItem[1].categoriesProductId)}
                          >
                            <TrashIcon />
                          </button>
                          <button
                            className="button-without-styles buttonAction"
                            onClick={() => props.onEditCategory(categoriesProductsItem[1].category)}
                          >
                            <PencilIcon />
                          </button>
                          <button
                            className="button-without-styles buttonAction"
                            onClick={() => props.onCreateProduct(categoriesProductsItem[1])}
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
                                    <Button
                                      className="ButtonToggleSize-danger"
                                      onClick={() => props.onToggleModalDelete(categoriesProductsItem[1], product.id)}
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
          onClick={props.onToggleModalCreateCategory}
          className={"PrimaryWave ProductButton"}
        >
          <span>Crear Categoria</span>
        </Button>
      </div>
    </div>
  );
}

UpdateartUI.propTypes = {
  state: PropTypes.any,
  alert: PropTypes.object,
  categoriesProductsArray: PropTypes.array,
  onToggleModalCreateCategory: PropTypes.func,
  onToggleModalDelete: PropTypes.func,
  onDeleteCategory: PropTypes.func,
  onEditCategory: PropTypes.func,
  onCreateProduct: PropTypes.func,
  setState: PropTypes.func,
  onCloseModalSaveCategory: PropTypes.func,
  onCloseModalDeleteCategory: PropTypes.func,
  onCloseModalAddProducts: PropTypes.func,
  onCloseModalDelete: PropTypes.func,
  onHideAlert: PropTypes.func
};

export {
  UpdateartUI
};
