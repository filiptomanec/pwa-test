import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

export const useIsOnline = () => {
  useEffect(() => {
    const handleOnline = () => {
      enqueueSnackbar("Jste online", { variant: "success" });
    };

    const handleOffline = () => {
      enqueueSnackbar("Jste offline", { variant: "error" });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
};
