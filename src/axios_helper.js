import axios from 'axios';


// export const getAuthToken = () => {
//     return window.localStorage.getItem('auth_token');
// };

// export const setAuthHeader = (data)  => {
//     localStorage.setItem('auth_token', data.token);
//     localStorage.setItem('nombre', data.firstName);
//     localStorage.setItem('apellido', data.lastName);

// };

axios.defaults.baseURL = 'http://localhost:8080/api/v1/store';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {

    let headers = {};
    // if (getAuthToken() !== null && getAuthToken() !== "null") {
    //     headers = {'Authorization': `Bearer ${getAuthToken()}`};
    // }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};