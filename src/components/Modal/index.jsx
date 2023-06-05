import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./styles.css";
import "./modal-media-queries.css";

function Modal({
  children
}) {
  const onToggleOverlay = () => {
    const $root = document.getElementById("root");
    const $router = document.getElementById("Router");
    const $containerMenu = document.getElementById("ContainerMenu");
    // location.pathname === "/update_art" && "blurUpdate"
    $router.classList.toggle("blur");
    $containerMenu.classList.toggle("blur");
    $router.classList.toggle("blurUpdate");
    $containerMenu.classList.toggle("blurUpdate");

    $root.onclick = (event) => {
      event.preventDefault();
    };
  };

  useEffect(() => {
    onToggleOverlay();
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="Overlay"></div>
      { children({
        onToggleOverlay
      }) }
    </>,
    document.getElementById("modal-root")
  );
}

Modal.propTypes = {
  children: PropTypes.any
};

export {
  Modal
};
