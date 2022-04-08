import React from "react";
import { useSelector } from "react-redux";
import { ProductItem } from "../ProductItem";

import "./styles.css";

function Products() {
  const products = useSelector((state) => state.products.all);

  return (
    <div className="ContainerProducts">
      <div className="CategoriesGrid">
        {
          (products && products.length) && products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  );
}

export {
  Products
};
