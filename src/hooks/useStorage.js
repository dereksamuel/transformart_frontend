import { useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

const useStorage = (key) => {
  const [storageInfo, setStorageInfo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const storageSaved = getLocalStorage(key);

    if (!storageInfo) setError(true);

    setStorageInfo(JSON.parse(storageSaved));
  }, []);

  return {
    storageInfo,
    error
  };
};

export {
  useStorage
};
