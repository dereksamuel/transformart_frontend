import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function Banner({ children }) {
  return (
    <div className="Banner">
      { children }
    </div>
  );
}

Banner.propTypes = {
  children: PropTypes.any,
};

export {
  Banner
};
