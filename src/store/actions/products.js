import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

import { storage } from "../../utils/connectFirebase";
import { fetchQuery } from "../../utils/fetchQuery";
import { setState } from "../../utils/setState";
import { SET_ALL, SET_CREATED, SET_ERROR, SET_LOADING, SET_ONE, SET_SOURCES, SET_DELETED_FILES } from "../types/products";

const expectedValues = `
  id
  srcImage
  srcVideo
  description
  name
  price
  offer
  facebookLink
  instagramLink
`;

const getProducts = () => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data, error } = await fetchQuery(`
    query {
      getProducts {
        ${expectedValues}
      }
    }
  `);

  dispatch(setState({ type: SET_ALL, payload: data.getProducts }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const getProduct = (productId) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data, error } = await fetchQuery(`
    query {
      getProduct(productId: ${productId}) {
        ${expectedValues}
      }
    }
  `);

  dispatch(setState({ type: SET_ONE, payload: data.getProduct }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const deleteProduct = (productId) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      deleteProduct(id: ${productId})
    }
  `);

  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));

  dispatch(getProducts());
};

const uploadFiles = (video, image) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const storageImageRef = ref(storage, `productImages/${image.name}`);
  const storageVideoRef = ref(storage, `productsVideos/${video.name}`);

  try {
    await Promise.all([
      uploadBytes(storageImageRef, image),
      uploadBytes(storageVideoRef, video)
    ]);

    const [
      urlImage,
      urlVideo
    ] = await Promise.all([
      getDownloadURL(storageImageRef),
      getDownloadURL(storageVideoRef)
    ]);

    dispatch(setState({ type: SET_LOADING, payload: false }));
    dispatch(setState({ type: SET_SOURCES, payload: {
      srcVideo: urlVideo,
      srcImage: urlImage
    } }));
  } catch (error) {
    console.log("[error-fb-storage]:", error);

    dispatch(setState({ type: SET_LOADING, payload: false }));
    dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
  }
};

const deleteFiles = ({ srcVideo, srcImage }) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));
  dispatch(setState({ type: SET_DELETED_FILES, payload: false }));

  const storageImageRef = ref(storage, srcImage);
  const storageVideoRef = ref(storage, srcVideo);

  try {
    await Promise.all([
      deleteObject(storageImageRef),
      deleteObject(storageVideoRef)
    ]);

    dispatch(setState({ type: SET_LOADING, payload: false }));
    dispatch(setState({ type: SET_DELETED_FILES, payload: true }));
  } catch (error) {
    console.log("[error-fb-storage]:", error);

    dispatch(setState({ type: SET_LOADING, payload: false }));
    dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
  }
};

const createProduct = (data) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data: dataQuery, error } = await fetchQuery(`
    mutation {
      createProduct(
        name: "${data.name}"
        price: ${data.price}
        offer: ${data.offer}
        description: "${data.description}"
        srcImage: "${data.srcImage}"
        srcVideo: "${data.srcVideo}"
        facebookLink: "${data.facebookLink}"
        instagramLink: "${data.instagramLink}"
      ) {
        id
        name
        price
        offer
        description
        srcImage
        srcVideo
        facebookLink
        instagramLink
      }
    }
  `);

  dispatch(setState({ type: SET_CREATED, payload: dataQuery.createProduct }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));

  await dispatch(getProducts());
};

const updateProduct = ({ id, data }) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data: dataQuery, error } = await fetchQuery(`
    mutation {
      updateProduct(
        id: ${id}
        name: "${data.name}"
        price: ${data.price}
        offer: ${data.offer}
        description: "${data.description}"
        srcImage: "${data.srcImage}"
        srcVideo: "${data.srcVideo}"
        facebookLink: "${data.facebookLink}"
        instagramLink: "${data.instagramLink}"
      ) {
        id
        name
        price
        offer
        description
        srcImage
        srcVideo
        facebookLink
        instagramLink
      }
    }
  `);

  dispatch(setState({ type: SET_CREATED, payload: dataQuery.updateProduct }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));

  await dispatch(getProducts());
};

export {
  getProducts,
  getProduct,
  deleteProduct,
  uploadFiles,
  createProduct,
  updateProduct,
  deleteFiles
};
