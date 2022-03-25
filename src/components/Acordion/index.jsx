import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function Acordion(props) {
  return (
    <div className="Acordion">
      { props.children }
    </div>
  );
}

Acordion.propTypes = {
  children: PropTypes.any
};

export {
  Acordion
};
