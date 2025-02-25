import axios from 'axios'
import { Platform } from 'react-native'

const commonConfigs = {
    baseURL: 'https://67bc90f5ed4861e07b3b1328.mockapi.io/',
    timeout: 10000,
    headers: {
        buildversion: '1.0.0',
        buildnumber: '1',
        platform: Platform.OS,
    },
};
const instance = axios.create(commonConfigs);

instance.interceptors.response.use(
    res => res,
    error => {
        const { data, status } = error.response || {};
        switch (status) {
            case 401:
                // Request chưa có Authorization
                console.error('unauthorised');
                break;
            case 404:
                // API không tồn tại
                console.error('/not-found');
                break;
            case 500:
                // API server đang xảy ra lỗi
                console.error('/server-error');
                break;
        }
        return Promise.reject(error);
    },
);
const responseBody = response => response.data;
const responseError = response => ({
    isError: true,
    message: response,
});
export const api = {
    get: (url, config) =>
    instance.get(url, config).then(responseBody).catch(responseError),
    post: (url, body, config) =>
    instance.post(url, body, config).then(responseBody).catch(responseError),
    put: (url, body, config) =>
    instance.put(url, body, config).then(responseBody).catch(responseError),
    delete: (url, config) =>
    instance.delete(url, config).then(responseBody).catch(responseError),
    };