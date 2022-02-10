import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}
export const createOrder = async (ty) => {
    const {data} = await $authHost.post('api/', ty)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}



export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}


export const createbooks = async (books) => {
    const {data} = await $authHost.post('api/books', books)  
    return data
}

// export const DeleteBookById = (id) => {
//     axios.delete(`http://localhost:5000/books`+id, {
//             }).then((response) => {
//         if (response.data.error){
//             alert(response.data.error);
//         }
//         else alert(response.data);
//     });
// }

export const fetchbookss = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/books', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchBasket = async (user) => {
    const {data} = await $host.get('api/user')
    return data
}

export const fetchOnebooks = async (id) => {
    const {data} = await $host.get('api/books/' + id)
    return data
}
