import React from "react";
import { TrashIcon } from "@heroicons/react/outline";

import { Title } from "../../components/Title";
import { Acordion } from "../../components/Acordion";

import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";

import { useCP } from "../../hooks/useCP";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";

import "../Categories/styles.css";
import "./styles.css";

function UpdateArt() {
  const categoriesProductsArray = useCP();

  return (
    <div className="UpdateArt">
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
                  [...categoriesProductsItem[1].products].map((product) => (
                    <ProductItem key={product.id} product={product}>
                      <Button className="ButtonToggleSize-danger">
                        <TrashIcon />
                        <span>Borrar</span>
                      </Button>
                    </ProductItem>
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
