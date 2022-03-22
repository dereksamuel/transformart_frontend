import React from "react";
import PropTypes from "prop-types";

import "./styles.css";
import { Link } from "react-router-dom";

function ProductItem(props) {
  return (
    <section>
      <Link to={`/oneProduct/${props.product.id}`} className="ProductItem">
        <li>
          <div className="tap"></div>
          {
            props.product.offer ? (
              <div className="OfferBox">
                Oferta del { props.product.offer }%
              </div>
            ) : null
          }
          <img src={props.product.srcImage} alt={props.product.name} />
          <h3>
            <span>{ props.product.name }</span>
            {
              props.toBuy ? (
                <span className="SizeProduct">
                  { props.product.selectedSize }
                </span>
              ) : null
            }
          </h3>
        </li>
      </Link>
      { props.children }
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
