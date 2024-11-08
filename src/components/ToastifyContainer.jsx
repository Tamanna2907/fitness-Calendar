// src/utils/toast.js
import { toast } from 'react-toastify';

const options = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const showToast = {
  success: (message) => toast.success(message, options),
  error: (message) => toast.error(message, options),
  warning: (message) => toast.warning(message, options),
  info: (message) => toast.info(message, options),
};