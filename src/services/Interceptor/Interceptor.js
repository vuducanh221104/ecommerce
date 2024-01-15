import axios from 'axios';
//   SET COOKIE
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
axios.defaults.baseURL = 'http://localhost:4000/';
let refresh = false;
axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        if (error.response.status === 401 && !refresh) {
            refresh = true;
            const response = await axios.post('api-user/refresh', {}, { withCredentials: true });
            if (response.status === 200) {
                setCookie('accessToken', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['token']}`;

                return axios(error.config);
            }
        }
        refresh = false;
        return error;
    },
);
