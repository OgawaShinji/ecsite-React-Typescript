import axios, {AxiosInstance} from "axios";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";

const Axios: AxiosInstance = axios.create();
Axios.interceptors.request.use((request) => {
    if (request.data) request.data = snakecaseKeys(request.data, {deep: true})
    return request;
});
Axios.interceptors.response.use((response) => {
    if (response.data) response.data = camelcaseKeys(response.data, {deep: true});
    console.log(response)
    return response
});

export const API_URL = "http://localhost:3000"
export const REST_URL = "http://34.84.118.239"
export default Axios;
