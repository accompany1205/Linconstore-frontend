import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
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
      autoHideDuration={3000}
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
