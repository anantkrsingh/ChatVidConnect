import axios from "axios"
const BASE_URL = "http://192.168.1.3:4040"



export const Post = async (endpoint, body,token = "") => {
    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, body,{
            headers:{"Authorization":`Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GET = async (endpoint,token) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`,{
          headers: { "Authorization" : `Bearer ${token}`}
        })
        return response.data;
    }catch(e){
        throw e;
    }
}