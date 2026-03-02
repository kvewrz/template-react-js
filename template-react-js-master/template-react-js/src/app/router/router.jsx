import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router"
import NoteFound from "../../widgets/error/note-found"
import Layouts from "../layouts/layouts"


const AdsOnePage  = lazy(() => import("../../pages/ads/ads-one-page"))
const AdsPage = lazy(() => import("../../pages/ads/ads-page"))
const LoginPage  = lazy(() => import("../../pages/auth/login-page"))
const  RegisterPage   = lazy(() => import("../../pages/auth/register-page"))
const CategoriesOnePage  = lazy(() => import("../../pages/categories/categories-one-page"))
const  CategoriesPage = lazy(() => import("../../pages/categories/categories-page"))
const  FavoritesOnePage = lazy(() => import("../../pages/favorites/favorites-one-page"))
const FavoritesPage= lazy(() => import("../../pages/orders/orders-page"))
const  OrdersPage= lazy(() => import("../../pages/categories/categories-page"))
const  UsersPage= lazy(() => import("../../pages/users/users-page"))


const router  = createBrowserRouter([
    {
        path:'/',
        element: (
            <Suspense>
               <Layouts />  
            </Suspense>
        
    ),
        errorElement:<NoteFound />,
        children:[
            {
                path:'/ads',
                element:<AdsPage />
            },
            {
                path:'/ads/:id',
                element:<AdsOnePage />
            },
            {
                path:'/categories',
                element:<CategoriesPage />
            },
            {
                path:"/categories/:id",
                element:<CategoriesOnePage />
            },
            {
                path:'/favorites',
                element:<FavoritesPage />
            },
            {
                path:'/favorites/:id',
                element:<FavoritesOnePage />
            },
            {
                path:"/orders",
                element:<OrdersPage />
            },
            {
             path:'/profile',
             element:<UsersPage />
            },
            {
                path:"/register",
                element:<RegisterPage />
            },
            {
                path:"/login",
                element:<LoginPage />
            }
        ]
    }
])

export default router
