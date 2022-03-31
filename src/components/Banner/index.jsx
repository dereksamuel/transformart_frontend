import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function Banner(props) {
  return (
    <div className="Banner">
      { props.children }
    </div>
  );
}

Banner.propTypes = {
  children: PropTypes.any,
};


export {
  Banner
};
