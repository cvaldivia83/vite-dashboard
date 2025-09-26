import { ToastProps } from "../../types/toast";

const ToastWarning = ({message, setToast}: ToastProps) => {
  return (
    <div className="toast" role="alert">
      <div className="toast-icon">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        <span className="sr-only">Warning icon</span>
      </div>
      <div className="toast-text">{message}</div>
        <button type="button" className="toast-btn" data-dismiss-target="#toast-warning" aria-label="Close" onClick={() => setToast({ show: false, message: '', status: 0})}>
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  )
}

export default ToastWarning;