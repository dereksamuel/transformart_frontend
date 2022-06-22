import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const app = initializeApp(JSON.parse(process.env.REACT_APP_FB_CONFIG));
const auth = getAuth(app);
const storage = getStorage(app);

export {
  app,
  auth,
  storage
};
