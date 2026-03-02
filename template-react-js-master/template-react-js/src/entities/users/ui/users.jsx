import { useEffect } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fetchUpdateUser, fetchUser } from "../../../features/users/models/user-thunks"
import Loader from "../../../widgets/loader/loader"
import { useToast } from "../../../widgets/toast/hooks/use-toast"
import schema from "../models/users-schema"



function Users() {
    const {
        user,
        loading,
        error
    } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const showToast = useToast()
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm({
        resolver:yupResolver(schema),
        defaultValues: {...user}
    })
    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])
    useEffect(() => {
        if(user){
            reset(user)
        }
    },[user , reset])
    const onUpdateUser  = async (form) => {
        try{
         await dispatch(fetchUpdateUser(form)).unwrap()
         reset()
        }catch(error){
            showToast('не удалось обновить' + error.message + 'error')
        }
    }
    if(loading){
        return <Loader />
    }
  return (
  <form onSubmit={handleSubmit(onUpdateUser)}>
    {error && <span>{error}</span>}
    <label>
        Name
        {errors.name && <span>{errors.name.message}</span>}
        <input type="text" {...register('name')} id="name"/>
    </label>
    <label>
        Email
        {errors.email && <span>{errors.email.message}</span>}
        <input type="text" {...register('email')} id="email" />
    </label>
    <label>
        Phone 
        {errors.phone && <span>{errors.phone.message}</span>}
        <input type="text" {...register('phone')}  id="phone"/>
    </label>
    <label>
        Password 
        {errors.password && <span>{errors.password.message}</span>}
        <input type="password" {...register('password')} id="password" />
    </label>
    <button>Update</button>
  </form>
  )
}

export default Users
