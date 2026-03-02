import {configureStore} from '@reduxjs/toolkit'
import adsReducer from '../../features/ads/models/ads-slice'
import authReducer from '../../features/auth/models/auth-slice'
import categoriesReducer from '../../features/categories/models/categories-slice'
import userReducer from '../../features/users/models/user-slice'

export default configureStore({
    reducer:{
    auth:authReducer,
    categories:categoriesReducer,
    user:userReducer,
    ads:adsReducer
    }
})