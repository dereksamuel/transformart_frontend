import { useState, useEffect } from "react";

function useModel({ initialValue = "", domEl }) {
  const [model, setModel] = useState(initialValue);

  const onChangeModel = (event) => {
    setModel((
      event.target.files &&
      event.target.files.length
    ) ? event.target.files[0] : event.target.value);
  };

  useEffect(() => {
    document.querySelector(domEl)?.addEventListener("change", onChangeModel);

    return () => {
      return document.querySelector(domEl)?.removeEventListener("change", onChangeModel);
    };
  }, []);

  return [model, setModel];
}

export {
  useModel
};
