import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import StoreProvider from './app/provider/store-provider'
import router from './app/router/router'
import ToastProvider from './widgets/toast/providers/toast-provider'



createRoot(document.querySelector('#root')).render(
<>
<StoreProvider>
    <ToastProvider>
        <RouterProvider router={router} ></RouterProvider>  
    </ToastProvider>
</StoreProvider>
</>
)
