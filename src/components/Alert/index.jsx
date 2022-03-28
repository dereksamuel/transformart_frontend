import React from "react";
import PropTypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";

import "./styles.css";

function Alert(props) {
  return (
    <div className={`Alert ${(props.toLeft ? "Alert-left" : "Alert-right")} ${props.theme}`}>
      <article>
        <h3 className="title">{ props.title }</h3>
        <p className="description">{ props.description }</p>
      </article>
      <span className="IconContainer" {...props}>
        <XIcon />
      </span>
    </div>
  );
}

Alert.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  theme: PropTypes.string,
  toLeft: PropTypes.bool
};

export {
  Alert
};
