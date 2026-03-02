import './auth.css'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Loader from '../../../widgets/loader/loader'
import AuthApi from '../api/auth-api'
import schema from '../models/auth-schema'
import { registerFail, registerStart, registerSuccess } from '../models/auth-slice'


function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver:yupResolver(schema)
    })
    const {loading  , error} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (form) => {
        dispatch(registerStart())
        try{
        const result = await AuthApi.register(form)
        if(result){
            dispatch(registerSuccess())
            navigate('/login')
        }
        }catch(error){
         dispatch(registerFail(error?.response?.data?.error || error.message || ''))
        }
    }
    if(loading){
        return <Loader />
    }
  return (
   <form onSubmit={handleSubmit(onSubmit)}>
    {error && <span>{error}</span>}
    <label>       
        Name
         {errors.name && <span>{errors.name.message}</span>}
        <input type="text" {...register('name')} id='name' />
    </label>
    <label>
        Email
         {errors.email && <span>{errors.email.message}</span>}
        <input type="text" {...register('email')} id='email' />
    </label>
    <label>
        Phone
         {errors.phone && <span>{errors.phone.message}</span>}
        <input type="text" {...register('phone')} id='phone' />
    </label>
    <label>
        Password
         {errors.password && <span>{errors.password.message}</span>}
        <input type="password"  {...register('password')} id='password' />
    </label>
    <label>
        Confirm Password
         {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        <input type="password" {...register('confirmPassword')} id='confirmPassword' />
    </label>
    <button type='submit'>Registration</button>
   </form>
  )
}

export default RegisterForm
