import React from "react";
import PropTypes from "prop-types";

import "./styles.css";
import { Link } from "react-router-dom";

function ProductItem(props) {
  return (
    <Link to={`/oneProduct/${props.product.id}`} className="ProductItem">
      <li>
        <div className="tap"></div>
        <img src={props.product.srcImage} alt={props.product.name} />
        <h3>{ props.product.name }</h3>
      </li>
    </Link>
  );
}

ProductItem.propTypes = {
  product: PropTypes.any
};

export {
  ProductItem
};
