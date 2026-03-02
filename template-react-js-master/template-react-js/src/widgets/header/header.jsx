import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router'
import './header.css'
import AuthApi from '../../features/auth/api/auth-api'
import { logoutSuccess } from '../../features/auth/models/auth-slice'
import Loader from '../loader/loader'


const  Header = memo (() => {
    const { user , loading , error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogOut = async () => {
          try{
           await AuthApi.logout()
          }finally{
            dispatch(logoutSuccess())
            navigate('/login')
          }
    }
    if(loading){
        return <Loader />
    }
  return (
      <nav className='header'>
        {!user && (
            <>
            <h2><Link to={'/register'}>Registration</Link></h2>
        <h2><Link to={'/login'}>Login</Link></h2>
            </>
        )}
        {user && (
            <>
            <h2><Link to={'/ads'}>Ads</Link></h2>
             <h2><Link to={'/favorites'}>Favorites</Link></h2>
             <h2><Link to={'/orders'}>Orders</Link></h2>
             <h2><Link to={'/profile'}>user:{user.name}</Link></h2>
             {error && <span>{error}</span>}
              <button onClick={onLogOut}>Log Out</button>
            </>
        )}
        {
            user && user.role === 'admin' && (
                <>
                 <h2><Link to={'/categories'}>Categories</Link></h2>
                </>
            )
        }
    </nav>  
   
  )
})
Header.displayName ="Header"
export default Header
