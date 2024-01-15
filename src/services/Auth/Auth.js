import axios from 'axios';
import Cookies from 'js-cookie';
function Auth({ children }) {
    //GET TOKEN USER LOGIN
    const token = Cookies.get('token');

    if (token) {
        const fetchApi = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api-user/checkusers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.message !== false) {
                    Cookies.set('isAuth', true);
                } else {
                    Cookies.set('isAuth', false);
                }
            } catch {
                Cookies.set('isAuth', false);
            }
        };

        fetchApi();
    } else {
        Cookies.set('isAuth', false);
    }

    return children;
}

export default Auth;
