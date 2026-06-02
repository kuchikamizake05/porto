export type AdminToastState = {
  open: boolean;
  severity: "success" | "error";
  message: string;
};

export const emptyToast: AdminToastState = {
  open: false,
  severity: "success",
  message: "",
};
