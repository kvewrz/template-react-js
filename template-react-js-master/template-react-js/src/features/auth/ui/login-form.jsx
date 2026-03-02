import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import './auth.css'
import Loader from '../../../widgets/loader/loader'
import AuthApi from '../api/auth-api'
import schema from '../models/auth-schema'
import { loginFail, loginStart, loginSuccess } from '../models/auth-slice'
import AuthStorage from '../models/auth-storage'





function LoginForm() {
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver:yupResolver(schema)
    })
    const {loading , error} = useSelector((state) => state.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const onLogin = async (form) => {
    dispatch(loginStart())
    try{
        const res = await AuthApi.login(form)
        if(res){
            dispatch(loginSuccess(res.user))
            AuthStorage.setAccessToken(res.accessToken)
            AuthStorage.setRefreshToken(res.refreshToken)
            AuthStorage.setUserStorage(res.user)
            navigate('/ads')
        }
    }catch(error){
        dispatch(loginFail(error?.response?.data?.error || error.message || ''))
    }
   }
    if(loading){
        return <Loader />
    }
  return (
   <form onSubmit={handleSubmit(onLogin)}>
    {error && <span>{error}</span>}
    <label>
        Email
        {errors.email && <span>{errors.email.message}</span>}
        <input type="email" {...register('email')} id='email' />
    </label>
    <label>
        Password
        {errors.password && <span>{errors.password.message}</span>}
        <input type="password" {...register('password')} id='password' />
    </label>
    <button type='submit' disabled={loading}>{loading ? 'входим' : 'войти' }</button>
   </form>
  )
}
export default LoginForm
