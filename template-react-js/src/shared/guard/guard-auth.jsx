import { useSelector } from "react-redux"
import { Navigate } from "react-router"


function GuardAuth({children}) {
    const isAuth = useSelector((state) => state.auth.isAuth)
    if(!isAuth) return <Navigate to={'/'} replace ></Navigate>
return children
}

export default GuardAuth