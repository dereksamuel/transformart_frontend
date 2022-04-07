import React from "react";
import PropTypes from "prop-types";

import "./styles.css";
import { Link } from "react-router-dom";

function ProductItem({
  product,
  toBuy,
  children
}) {
  return (
    <section>
      <Link to={`/oneProduct/${product.id}`} className="ProductItem">
        <li>
          <div className="tap"></div>
          {
            product.offer ? (
              <div className="OfferBox">
                Oferta del { product.offer }%
              </div>
            ) : null
          }
          <img src={product.srcImage} alt={product.name} />
          <h3>
            <span>{ product.name }</span>
            {
              toBuy ? (
                <span className="SizeProduct">
                  { product.selectedSize }
                </span>
              ) : null
            }
          </h3>
        </li>
      </Link>
      { children }
    </section>
  );
}

ProductItem.propTypes = {
  product: PropTypes.any,
  children: PropTypes.any,
  toBuy: PropTypes.bool
};

export {
  ProductItem
};
