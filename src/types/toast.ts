export interface Toast {
  show: boolean;
  message: string;
  status: 0 | 200 | 400;
}

export interface ToastProps {
  message: string;
  setToast: React.Dispatch<React.SetStateAction<Toast>>
}

