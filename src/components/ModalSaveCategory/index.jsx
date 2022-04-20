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
import { SET_ALERT } from "../../store/types/alert";

import { setState } from "../../utils/setState";

import "./styles.css";

function ModalSaveCategory({
  updateData,
  onCloseModalSaveCategory
}) {
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

    const action = updateData ? updateCategory : createCategory;

    await dispatch(action(updateData ? {
      id: updateData.id,
      categoryName
    } : categoryName));

    dispatch(setState({
      type: SET_ALERT,
      payload: {
        description: updateData ? `
          Producto "${categoryName}" actualizado con éxito
        ` : `
          Producto "${categoryName}" creado con éxito
        `,
        theme: "Success",
        showAlert: true,
      }
    }));
    onCloseModalSaveCategory(onToggleOverlay);
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
          <div className="Modal CategorySaveModal">
            <div className="ModalContent">
              <header className="HeaderModal">
                <button
                  className="button-without-styles closeIcon"
                  onClick={() => onCloseModalSaveCategory(onToggleOverlay)}
                >
                  <XIcon />
                </button>
                <Title
                  isTitle={false}
                  className="SubTitle TitleModal"
                >
                  {
                    `${updateData ? "Actualizar" : "Crear"} Categoria`
                  }
                </Title>
              </header>
              <form onSubmit={(event) => onSaveCategory(event, onToggleOverlay)}>
                <div className="NameContainer">
                  <Input
                    id="categoryName"
                    className="Input InputModalSaveCategory"
                    placeholder="Nombre de la categoria"
                    defaultValue={updateData?.name || ""}
                    required
                  />
                </div>
                <div className="ContainerButtonSaveCategory">
                  <Button
                    type="submit"
                    className="PrimaryWave ButtonSaveCategory"
                  >Guardar cambios</Button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </Modal>
  );
}

ModalSaveCategory.propTypes = {
  onCloseModalSaveCategory: PropTypes.func,
  updateData: PropTypes.any
};

export {
  ModalSaveCategory
};
