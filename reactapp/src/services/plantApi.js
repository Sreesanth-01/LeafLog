import api from "./api";

export const addPlant=(data)=>{
    return api.post("/api/plants",data);
}

export const getPlants=()=>{
    return api.get("/api/plants");
}