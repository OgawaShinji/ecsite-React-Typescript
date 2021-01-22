import axios, {AxiosInstance} from "axios";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";


export const API_URL = "http://localhost:3000"
export const REST_URL = "http://34.84.118.239"

const Axios: AxiosInstance = axios.create();
Axios.interceptors.request.use((request) => {
    if (request.data) request.data = snakecaseKeys(request.data, {deep: true})
    if (request.method === "POST" || request.method === "PUT") request.headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // 動作せず
    if (request.method === "GET") {
        if (request.params) {
            request.params = snakecaseKeys(request.params, {deep: true})
        }
    }
    return request;
});
Axios.interceptors.response.use((response) => {
    if (response.data) response.data = camelcaseKeys(response.data, {deep: true});
    return response
});
Axios.defaults.baseURL = REST_URL;
export default Axios;