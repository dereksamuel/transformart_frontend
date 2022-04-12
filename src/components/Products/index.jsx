import React from "react";
import { useSelector } from "react-redux";

import { ProductItem } from "../ProductItem";
import { EmptyDraw } from "../EmptyDraw";
import { Button } from "../Button";

import "./styles.css";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

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
                  <ProductItem key={product.id} product={product}>
                    <Button
                      className="ButtonToggleSize"
                    ><PencilIcon /></Button>
                    <Button
                      className="ButtonToggleSize-danger"
                    ><TrashIcon /></Button>
                  </ProductItem>
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
