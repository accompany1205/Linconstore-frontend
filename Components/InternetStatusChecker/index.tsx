import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { baseUrl } from "../../Helpers/baseUrl";

const InternetStatusChecker = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkInternetConnection = async () => {
      try {
        await fetch(baseUrl, {
          method: "HEAD",
          mode: "no-cors",
        });

        if (!isOnline) {
          setIsOnline(true);
          setIsVisible(true);
        }
      } catch (error) {
        if (isOnline) {
          setIsOnline(false);
          setIsVisible(true);
        }
      }
    };

    checkInternetConnection();

    const intervalId = setInterval(() => {
      checkInternetConnection();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isOnline]);

  const handleCloseSnackbar = () => {
    setIsVisible(false);
  };

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={isOnline ? 3000 : null}
      onClose={handleCloseSnackbar}
    >
      <Alert
        severity={isOnline ? "success" : "error"}
        onClose={handleCloseSnackbar}
      >
        {isOnline
          ? "Internet connected!"
          : "Internet disconnected! Please check your internet"}
      </Alert>
    </Snackbar>
  );
};

export default InternetStatusChecker;
