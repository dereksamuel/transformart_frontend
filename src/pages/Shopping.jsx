import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";

import { ProductItem } from "../components/ProductItem";
import { Button } from "../components/Button";

import { useStorage } from "../hooks/useStorage";

import "./Categories.css";

function Shopping() {
  const {
    storageInfo: products,
    error
  } = useStorage("products");

  if (error && (!products && !products.length)) {
    return <div className="Error">No tienes productos</div>;
  }

  return (
    <>
      <div className="CategoriesGrid">
        {
          (products && products.length) && products.map((product) => (
            <ProductItem
              key={`${product.id} ${product.selectedSize}`}
              product={product}
              toBuy={true}>
              <div className="ZoneButtons">
                <Button className="ButtonToggleSize"><MinusIcon /></Button>
                <Button className="ButtonToggleSize"><PlusIcon /></Button>
              </div>
            </ProductItem>
          ))
        }
      </div>
    </>
  );
}

export {
  Shopping
};
