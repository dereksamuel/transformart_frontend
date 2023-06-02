import React from "react";

import { Title } from "../../components/Title";
import srcLogoIcon from "../../assets/images/mobile/logoIcon.svg";

import { useParams } from "react-router";
import { useCP } from "../../hooks/useCP";
import { ProductItem } from "../../components/ProductItem";

import "../Categories/styles.css";
import "./category-media-queries.css";

function Category() {
  const params = useParams();
  const categoriesProductsObject = useCP(params.categoryId);

  return (
    <div className="CategoriesArray CategoryPageInd page">
      {
        (categoriesProductsObject && categoriesProductsObject.length && categoriesProductsObject[0][1].category) && (
          <>
            <Title className="SubTitle TitleButterFly" isTitle={false}>
              <img src={srcLogoIcon} alt="srcLogoIcon" className="Categories-srcLogoIcon" />
              <span>{ categoriesProductsObject[0][1].category.name }</span>
            </Title>
            <div className="CategoriesGrid">
              {
                [...categoriesProductsObject[0][1].products].map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))
              }
            </div>
          </>
        )
      }
    </div>
  );
}

export {
  Category
};
