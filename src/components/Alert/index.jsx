import React from "react";
import PropTypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";

import "./styles.css";

function Alert(props) {
  const propsWithouttoLeft = {
    ...props
  };
  delete propsWithouttoLeft.toLeft;

  return (
    <div className={`Alert ${(props.toLeft ? "Alert-left" : "Alert-right")} ${props.theme}`}>
      <article>
        <p className="description">{ props.description }</p>
      </article>
      <div className="Icon" {...propsWithouttoLeft}>
        <XIcon />
      </div>
    </div>
  );
}

Alert.propTypes = {
  description: PropTypes.string,
  theme: PropTypes.string,
  toLeft: PropTypes.bool
};

export {
  Alert
};
