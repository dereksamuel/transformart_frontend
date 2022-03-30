import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

import { Modal } from "../Modal";
import { Title } from "../Title";
import { Button } from "../Button";
import { AddProduct } from "../AddProduct";

import "./styles.css";

function ModalAddProducts(props) {
  const [state, setState] = useState({
    view: 1
  });
  // const categoryCreatedId = useSelector((state) => state.categories.createdId);
  // const [categoryName] = useModel({
  //   initialValue: "",
  //   domEl: "#categoryName"
  // });

  // const dispatch = useDispatch();

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
                onClick={() => props.onCloseModalAddProducts(onToggleOverlay)}
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
                      [...props.cpItemToCreateProduct.products][1] && (
                        <Button
                          className="PrimaryWave ButtonSecondaryClick ButtonSecondaryModal"
                        >
                          <span>Arte existente</span>
                        </Button>
                      )
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
                  <AddProduct />
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
  cpItemToCreateProduct: PropTypes.object
};

export {
  ModalAddProducts
};
