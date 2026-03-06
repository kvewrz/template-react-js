import { useCallback, useState } from "react"
import { ToastContext } from "../context/toast-context";
import './toast.css'

function ToastProvider({children}) {
    const [items , setItems]  = useState([])

    const showToast = useCallback((message , type = 'info') => {
        const id = Date.now()
        setItems((prev) => [...prev , {id , message , type}]);
        setTimeout(() => {
            setItems((prev) => prev.filter((el) => el.id !== id))
        }, 3000)
    } , []) 
    const remove = useCallback((id) => {
        setItems((prev) => prev.filter((el) => el.id !== id))
    } , [] ) 
  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast__container">
        {items.map(item => (
            <div key={item.id} className={`toast toast-${item.type}`}>
                <div className="toast_message">
                {item.message}
                </div>
                <button type="button" onClick={() => remove(item.id)}>X</button>
                 </div>
        ))} 

      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
