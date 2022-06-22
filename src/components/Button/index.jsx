import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function Button(props) {
  return (
    <button {...props} ref={props.refel}>{ props.children }</button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  refel: PropTypes.any
};

export {
  Button
};
