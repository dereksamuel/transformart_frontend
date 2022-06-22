import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function Acordion({ children, className }) {
  return (
    <div className={"Acordion " + className}>
      { children }
    </div>
  );
}

Acordion.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export {
  Acordion
};
