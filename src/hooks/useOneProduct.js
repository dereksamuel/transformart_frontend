import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/actions/products";

const useOneProduct = (productId) => {
  const product = useSelector((state) => state.products.one);
  const dispatch = useDispatch();

  const onLoadProduct = async () => {
    await dispatch(getProduct(productId));
  };

  useEffect(() => {
    onLoadProduct();
  }, []);

  return product;
};

export {
  useOneProduct
};
