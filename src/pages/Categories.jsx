import React from "react";
import { EyeIcon } from "@heroicons/react/outline";

import srcLogoIcon from "../assets/images/mobile/logoIcon.svg";

import { Title } from "../components/Title";
import { ProductItem } from "../components/ProductItem";
import { Button } from "../components/Button";

import "./Categories.css";
import { useNavigate } from "react-router";
import { useCP } from "../hooks/useCP";
import { EmptyDraw } from "../components/EmptyDraw";

function Categories() {
  const categoriesProductsArray = useCP();
  const navigate = useNavigate();

  const onSeeMore = (categoryId) => {
    navigate({ pathname: `/products/${categoryId}` });
  };

  return (
    <div className="Categories">
      <article>
        <Title className="SubTitle TitleCategories" isTitle={false}>
          <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
          <span>Productos</span>
        </Title>
        {
          categoriesProductsArray.length ? categoriesProductsArray.map((categoriesProductsItem) => (
            <div className="CategoriesArray" key={categoriesProductsItem[1].category.id}>
              <Title
                className="SubTitle TitleEachCategory"
              >{categoriesProductsItem[1].category.name}</Title>
              <div className="CategoriesGrid">
                {
                  [...categoriesProductsItem[1].products].map((product, indexProduct) => (
                    (indexProduct + 1) <= 4 &&
                      <ProductItem key={product.id} product={product} />
                  ))
                }
              </div>
              {
                [...categoriesProductsItem[1].products].length > 4 && (
                  <Button
                    className="PrimaryWave ButtonSecondaryClick"
                    onClick={() => onSeeMore(categoriesProductsItem[1].categoriesProductId)}
                  >
                    <span>Ver más</span>
                    <span className="IconSeeMore"><EyeIcon /></span>
                  </Button>
                )
              }
            </div>
          )) : (
            <div className="CategoriesEmpty">
              <EmptyDraw titleEmpty="No hay productos" />
            </div>
          )
        }
      </article>
    </div>
  );
}

export {
  Categories
};
