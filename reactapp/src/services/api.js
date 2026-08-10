import React from 'react'
import axios from 'axios'
import { config } from 'karma'

const api = axios.create({
    baseURL:"http://8080-cdcaaaabedafdacceedbadfcfbabfcdecfafccfe.premiumproject.examly.io",
    headers:{
        "Content-Type":"application/json"
    }
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

export default api