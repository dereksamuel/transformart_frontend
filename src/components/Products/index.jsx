import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { ProductItem } from "../ProductItem";
import { EmptyDraw } from "../EmptyDraw";
import { Button } from "../Button";

import { getProduct } from "../../store/actions/products";

import "./styles.css";

function Products({
  onToggleModalUpdateProduct,
  onDeleteProduct
}) {
  const [state, setState] = useState({
    canIChangeProducts: false
  });
  const products = useSelector((state) => state.products.all);
  const product = useSelector((state) => state.products.one);

  const dispatch = useDispatch();

  const handleEditProduct = async (productId) => {
    await dispatch(getProduct(productId));
    setState({
      ...state,
      canIChangeProducts: true
    });
  };

  useEffect(async () => {
    if (product && state.canIChangeProducts) {
      onToggleModalUpdateProduct(null, {
        idProduct: product.id,
        srcImageProduct: product.srcImage,
        srcVideoProduct: product.srcVideo,
        nameProduct: product.name,
        priceProduct: product.price,
        offerProduct: product.offer,
        descriptionProduct: product.description,
        instagramUrlProduct: product.instagramLink,
        facebookUrlProduct: product.facebookLink
      });
    }
  }, [product, state.canIChangeProducts]);

  return (
    <>
      {
        (products && products.length) ? (
          <div className="ContainerProducts">
            <div className="CategoriesGrid">
              {
                products.map((product) => (
                  <section key={product.id}>
                    <ProductItem product={product}>
                    </ProductItem>
                    <div className="ContainerButtonProducts">
                      <Button
                        className="ButtonToggleSize-danger"
                        onClick={() => onDeleteProduct(product)}
                      ><TrashIcon /></Button>
                      <Button
                        className="ButtonToggleSize"
                        onClick={() => handleEditProduct(product.id)}
                      ><PencilIcon /></Button>
                    </div>
                  </section>
                ))
              }
            </div>
          </div>
        ) : (
          <div className="CategoriesEmpty ContainerProducts">
            <EmptyDraw titleEmpty="Aún no tienes productos" />
          </div>
        )
      }
    </>
  );
}

Products.propTypes = {
  onToggleModalUpdateProduct: PropTypes.func,
  onChangeToUpdateData: PropTypes.func,
  onDeleteProduct: PropTypes.func
};

export {
  Products
};
