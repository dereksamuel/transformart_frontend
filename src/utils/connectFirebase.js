import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp(JSON.parse(process.env.REACT_APP_FB_CONFIG));
const auth = getAuth(app);

export {
  app,
  auth
};
