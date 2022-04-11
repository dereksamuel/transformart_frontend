import React from "react";
import { useSelector } from "react-redux";

import { ProductItem } from "../ProductItem";
import { EmptyDraw } from "../EmptyDraw";

import "./styles.css";

function Products() {
  const products = useSelector((state) => state.products.all);

  return (
    <>
      {
        (products && products.length) ? (
          <div className="ContainerProducts">
            <div className="CategoriesGrid">
              {
                products.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))
              }
            </div>
          </div>
        ) : (
          <div className="CategoriesEmpty ContainerProducts">
            <EmptyDraw titleEmpty="Aún no tienes ningún producto" />
          </div>
        )
      }
    </>
  );
}

export {
  Products
};
