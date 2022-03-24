import { useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

const useStorage = (key) => {
  const [storageInfo, setStorageInfo] = useState(null);
  const [error, setError] = useState(false);

  const onStartedStorage = () => {
    const storageSaved = getLocalStorage(key);

    if (!storageSaved) setError(true);

    setStorageInfo(JSON.parse(storageSaved));
  };

  useEffect(() => {
    onStartedStorage();
  }, []);

  return {
    storageInfo,
    setStorageInfo,
    error
  };
};

export {
  useStorage
};
