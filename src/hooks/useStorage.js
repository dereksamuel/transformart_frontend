import { useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

const useStorage = (key) => {
  const [storageInfo, setStorageInfo] = useState(null);

  const onStartedStorage = () => {
    const storageSaved = getLocalStorage(key);

    setStorageInfo(JSON.parse(storageSaved));
  };

  useEffect(() => {
    onStartedStorage();
  }, []);

  return {
    storageInfo,
    setStorageInfo
  };
};

export {
  useStorage
};
