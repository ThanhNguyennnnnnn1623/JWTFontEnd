import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.defaults.withCredentials = true;

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

// Add a request interceptor
// interceptors: can thiep vao viec nhan phan hoi va gui request
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.response && error.response.status || 500;
    switch (status) {
        case 401:
            if (window.location.pathname !== '/'
                && window.location.pathname !== '/login'
                && window.location.pathname !== '/register'
            ) {
                toast.error('Unauthorized the user, please login');
            }
            // window.location.href = '/login';
            return error.response.data;
        case 403:
            toast.error(`Your don't permission to access this resource...`);
            // window.location.href = '/login';
            return Promise.reject(error);
        default:
            return Promise.reject(error);
    }

});

export default instance;