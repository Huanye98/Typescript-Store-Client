import axios from "axios";

const service = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

// service.interceptors.request.use((config)=>{
//     const storedToken = localStorage.getItem("authToken")
//     if(storedToken){
//         config.headers.Authorization = `Bearer ${storedToken}`
//     }
//     return config
// })

export default service