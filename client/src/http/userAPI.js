import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
   // console.log(data.idd)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    localStorage.setItem('aidi', data.idd)
    console.log(data)
    localStorage.setItem('role', data.rol)

    return jwt_decode(data.token)
}


export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    localStorage.setItem('aidi', data.idd)

   // console.log(data.token)
    return jwt_decode(data.token)
}
