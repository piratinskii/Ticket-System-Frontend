import axios from 'axios';
import router  from "./router";
import store from "@/store";

const instance = axios.create({
    baseURL: 'https://localhost:8000/',
});

axios.defaults.withCredentials = true;

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            router.push('/login');
            store.dispatch('showToast', {
                message: 'This page is available only after authorization =(',
                severity: 'error',
                 summary: 'Authorization error'
            }).then(() => {});
        }
        return Promise.reject(error);
    }
);



export default instance;
