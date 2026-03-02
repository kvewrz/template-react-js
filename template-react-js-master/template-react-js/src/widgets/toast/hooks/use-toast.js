import { useContext } from "react";
import { ToastContext } from "../context/toast-context";

export function useToast(){
    const res = useContext(ToastContext)
    if(!res) throw new Error('не подключен провайдер')
        return res 
}