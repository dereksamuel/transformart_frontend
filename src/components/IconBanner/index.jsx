import React from "react";

import PropTypes from "prop-types";
import "./styles.css";

function IconBanner(props) {
  return (
    <div className="IconBanner" {...props}>{props.children}</div>
  );
}

IconBanner.propTypes = {
  children: PropTypes.any
};

export {
  IconBanner
};
