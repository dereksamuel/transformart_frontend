import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function Button(props) {
  return (
    <button {...props}>{ props.children }</button>
  );
}

Button.propTypes = {
  children: PropTypes.any
};

export {
  Button
};
