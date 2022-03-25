import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TrashIcon } from "@heroicons/react/outline";

import { Title } from "../../components/Title";
import { Acordion } from "../../components/Acordion";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";

import { useCP } from "../../hooks/useCP";

import { deleteProduct } from "../../store/actions/products";

import "../Categories/styles.css";
import "./styles.css";

function UpdateArt() {
  const [state, setState] = useState({
    modalDeleteText: "",
    showModalDelete: false,
    productId: null
  });
  const categoriesProductsArray = useCP();
  const dispatch = useDispatch();

  const onDeleteProduct = async () => {
    await dispatch(deleteProduct(state.productId));

    setState({
      ...state,
      productId: null,
      modalDeleteText: "",
      showModalDelete: false
    });
  };

  const onToggleModalDelete = (productId) => {
    setState({
      ...state,
      productId,
      modalDeleteText: "Quieres borrar este producto",
      showModalDelete: true
    });
  };

  return (
    <div className="UpdateArt">
      {
        state.showModalDelete ? (
          <Modal>
            <div className="Modal DeleteModal">
              <div className="ModalContent">
                <p>DeleteModal</p>
                <button onClick={onDeleteProduct}>onDeleteProduct</button>
              </div>
            </div>
          </Modal>
        ) : ""
      }

      <Title className="SubTitle TitleCategories" isTitle={false}>
        <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
        <span>Actualizar arte</span>
      </Title>
      <div className="AcordionContainer">
        {
          (categoriesProductsArray && categoriesProductsArray.length) ? categoriesProductsArray.map((categoriesProductsItem) => (
            <Acordion key={categoriesProductsItem[1].category.id}>
              <div className="AcordionTitle">
                <p>{ categoriesProductsItem[1].category.name }</p>
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
                              onClick={() => onToggleModalDelete(product.id)}
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
          )) : ""
        }
      </div>
      <div className="ZoneOfButton">
        <Button
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
