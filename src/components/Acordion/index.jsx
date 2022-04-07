import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function Acordion({ children }) {
  return (
    <div className="Acordion">
      { children }
    </div>
  );
}

Acordion.propTypes = {
  children: PropTypes.any
};

export {
  Acordion
};
