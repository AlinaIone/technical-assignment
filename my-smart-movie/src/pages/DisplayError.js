import React, { useRef } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DisplayError() {
  const rootRef = useRef(null);
  const thereAreErrors = useSelector((store) => store.errors.errors);

  return (
    <Box
      sx={{
        height: "75vh",
        flexGrow: 1,
        minWidth: 300,
      }}
      ref={rootRef}
    >
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            position: "relative",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >
          {thereAreErrors.length === 0 ? (
            <>
              <Typography
                id="server-modal-wrong-page"
                variant="h6"
                component="h2"
              >
                {`Oops! This page does not exist! Please go to`}{" "}
              </Typography>
              <Typography
                id="server-modal-wrong-page-2"
                variant="h6"
                component="h4"
                sx={{ pt: 2 }}
              >
                Please go to <Link to="/">home</Link>{" "}
              </Typography>
            </>
          ) : (
            <>
              <Typography id="server-modal-title" variant="h6" component="h2">
                {`Oops! Something went wrong with status: ${thereAreErrors[0].status} `}
              </Typography>
              <Typography id="server-modal-description" sx={{ pt: 2 }}>
                {`We're sorry! ${thereAreErrors[0].message}`}. Please try again
                later.
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
