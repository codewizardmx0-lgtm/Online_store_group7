// src/context/ToastContext.jsx
import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext()

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />,
  error:   <XCircle    className="w-5 h-5 text-red-500   flex-shrink-0" />,
  info:    <Info       className="w-5 h-5 text-blue-500  flex-shrink-0" />,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = `toast_${Date.now()}_${Math.random()}`
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 bg-white border border-gray-200 rounded-[10px] shadow-lg px-4 py-3 min-w-[280px] max-w-sm animate-in"
          >
            {icons[toast.type]}
            <p className="text-sm text-gray-800 flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
