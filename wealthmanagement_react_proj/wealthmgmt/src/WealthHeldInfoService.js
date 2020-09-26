import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class WealthHeldInfoService{

     getAllData() {
        const url = `${API_URL}/api/all/`;
        console.log(url);
        return axios.get(url).then(response => response.data);
    }
    getWealthHeld() {
        const url = `${API_URL}/api/wheldinfo/`;
        console.log(url);
        return axios.get(url).then(response => response.data);
    }
    getWealthHeldByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getWealthHeldByCategory(categoryId) {
        const url = `${API_URL}/api/wheldinfo/${categoryId}`;
        return axios.get(url).then(response => response.data);
    }
    getWealthHeldTimeSeriesByYear(year) {
        const url = `${API_URL}/api/wheldtsinfo/${year}`;
        return axios.get(url).then(response => response.data);
    }
    getWealthHeldTimeSeriesByYearCategory(year,categoryId) {
        const url = `${API_URL}/api/wheldtsinfo/${year}/${categoryId}`;
        return axios.get(url).then(response => response.data);
    }
}
