import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorWarning from '~/components/ErrorWarning';
function Logout() {
    const isAuth = JSON.parse(Cookies.get('isAuth'));
    const navigate = useNavigate();
    // DELETE COOKIE
    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    useEffect(() => {
        if (isAuth) {
            deleteCookie('token');
            Cookies.set('isAuth', false);
            navigate(`/`);
        }
    }, []);

    return (
        <div className={('logout', 'd-flex  justify-content-center')}>
            <ErrorWarning message="BLOCKING" />
        </div>
    );
}

export default Logout;
