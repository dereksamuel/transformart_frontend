import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function ProductItem(props) {
  return (
    <li className="ProductItem">
      <img src={props.product.srcImage} alt={props.product.name} />
      <h3>{ props.product.name }</h3>
    </li>
  );
}

ProductItem.propTypes = {
  product: PropTypes.any
};

export {
  ProductItem
};
