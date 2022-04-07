import React, { useState } from "react";

import "./styles.css";
import { useSelector } from "react-redux";

const SaveExistentProduct = () => {
  const products = useSelector((state) => state.products.all);
  const [state, setState] = useState({
    selectedSetter: new Set()
  });

  const onToggleSelected = (value) => {
    const newSelectedSetter = new Set(state.selectedSetter);

    if (state.selectedSetter.has(value)) {
      newSelectedSetter.delete(value);

      setState({
        ...state,
        selectedSetter: newSelectedSetter
      });
    } else {
      newSelectedSetter.add(value);

      setState({
        ...state,
        selectedSetter: newSelectedSetter
      });
    }
  };

  return (
    <div className="SaveExistentProduct">
      {
        (products && products.length) ? products.map((product) => (
          <li key={product.id} className="ProductItemSaveModal">
            <button
              onClick={() => onToggleSelected(product.id)}
              className={`button-without-styles ${
                state.selectedSetter.has(product.id) && "SelectedButton"
              }`}
            >
              <img className="ProductItemSaveModal--image" src={product.srcImage} alt={product.name} />
            </button>
          </li>
        )) : "Chao"
      }
    </div>
  );
};

export {
  SaveExistentProduct
};
