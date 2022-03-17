import React from "react";

import PropTypes from "prop-types";
import "./styles.css";

function Title(props) {
  return (
    <>
      {
        props.isTitle ?
          <h1 className="Title" {...props}>{ props.children }</h1> :
          <h2 className="SubTitle" {...props}>{ props.children }</h2>
      }
    </>
  );
}

Title.propTypes = {
  children: PropTypes.any,
  isTitle: PropTypes.bool
};

export {
  Title
};
