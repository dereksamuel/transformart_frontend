import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

import { Modal } from "../Modal";
import { Input } from "../Input";
import { Button } from "../Button";
import { Title } from "../Title";

import { useModel } from "../../hooks/useModel";

import { createCategory, updateCategory } from "../../store/actions/categories";
import { createCategoriesProduct } from "../../store/actions/categoriesProducts";

import "./styles.css";

function ModalCreateCategory(props) {
  const categoryCreatedId = useSelector((state) => state.categories.createdId);
  const [categoryName] = useModel({
    initialValue: "",
    domEl: "#categoryName"
  });

  const dispatch = useDispatch();

  const onCreateCategoriesProduct = async () => {
    await dispatch(createCategoriesProduct(categoryCreatedId.id, null));
  };

  const onSaveCategory = async (event, onToggleOverlay) => {
    event.preventDefault();
    if (!categoryName) return;

    const action = props.updateData ? updateCategory : createCategory;

    await dispatch(action(props.updateData ? {
      id: props.updateData.id,
      categoryName
    } : categoryName));

    props.onCloseModalCreateCategory(onToggleOverlay);
  };

  useEffect(async () => {
    if (categoryCreatedId && categoryName) {
      await onCreateCategoriesProduct();
    }
  }, [categoryCreatedId]);

  return (
    <Modal>
      {
        ({
          onToggleOverlay
        }) => (
          <div className="Modal CategoryCreateModal">
            <div className="ModalContent">
              <button
                className="button-without-styles closeIcon"
                onClick={() => props.onCloseModalCreateCategory(onToggleOverlay)}
              >
                <XIcon />
              </button>
              <Title
                isTitle={false}
                className="SubTitle TitleModal"
              >
                {
                  `${props.updateData ? "Actualizar" : "Crear"} Categoria`
                }
              </Title>
              <form onSubmit={(event) => onSaveCategory(event, onToggleOverlay)}>
                <div className="NameContainer">
                  <Input
                    id="categoryName"
                    className="Input InputModalCreateCategory"
                    placeholder="Nombre de la categoria"
                    defaultValue={props.updateData?.name || ""}
                    required
                  />
                </div>
                <div className="ContainerButtonCreateCategory">
                  <Button
                    type="submit"
                    className="PrimaryWave ButtonCreateCategory"
                  >Guardar Cambios</Button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </Modal>
  );
}

ModalCreateCategory.propTypes = {
  onCloseModalCreateCategory: PropTypes.func,
  updateData: PropTypes.any
};

export {
  ModalCreateCategory
};
