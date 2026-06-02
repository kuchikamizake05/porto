"use client";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import type { AdminToastState } from "./admin-toast-state";

type AdminToastProps = AdminToastState & {
  onClose: () => void;
};

export default function AdminToast({
  open,
  severity,
  message,
  onClose,
}: AdminToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2200}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          borderRadius: "14px",
          boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
          fontWeight: 700,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
