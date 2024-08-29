import axios from "axios";
export function getSmartCityInfo() {
    return axios.get('/info.json')
    
}
export function getSmartCityList() {
    return axios.get('/list.json')
}