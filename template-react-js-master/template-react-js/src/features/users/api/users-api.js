import AxiosInstance from "../../../shared/lib/axios-instance"

class UserApi{
static async getUser(){
    const {data} = await AxiosInstance.get('/users/me')
    return data
}
static async getUpdate( form){
    const {data} = await AxiosInstance.patch(`/users/me`, form)
    return data
}
}
export default UserApi