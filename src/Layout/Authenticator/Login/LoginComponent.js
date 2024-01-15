import ErrorWarning from '~/components/ErrorWarning';
import styles from './LoginComponent.module.scss';
import classNames from 'classnames/bind';
import { BsPerson, BsKey, BsEye, BsEyeSlash } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

function LoginComponent() {
    const isAuth = JSON.parse(Cookies.get('isAuth'));
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const handlePassword = (boolean) => {
        setShowPassword(boolean);
    };

    const formik = useFormik({
        initialValues: {
            usernameOrEmail: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:4000/api-user/login', values);
                if (response.status === 200) {
                    Cookies.set('token', response.data.token, 1);
                    Cookies.set('isAuth', true);
                    setError(false);
                    navigate(`/`);
                }
            } catch (err) {
                setError(true);
            }
        },
    });

    return (
        <div className={cx('wrapper pt-0 pt-lg-0 container')}>
            <div className={cx('content')}>
                {isAuth ? (
                    <ErrorWarning message="You Are Already Login !!!" />
                ) : (
                    <form className={cx('form-register')} onSubmit={formik.handleSubmit}>
                        <div className={cx('login')}>
                            <div className={cx('login-title')}>Login</div>
                            <div className={cx('login-content')}>
                                <div className={cx('login-user')}>
                                    <div className={cx('register-input')}>
                                        <BsPerson className={cx('icon-user')} />
                                        <input
                                            type="text"
                                            placeholder="Username or Email"
                                            id="usernameOrEmail"
                                            name="usernameOrEmail"
                                            value={formik.values.usernameOrEmail}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                setError(false);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={cx('login-password')}>
                                    <div className={cx('register-input')}>
                                        <BsKey className={cx('icon-password')} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            ref={inputRef}
                                            id="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                        />
                                        <div className={cx('login-eye')}>
                                            {!showPassword && (
                                                <BsEye
                                                    className={cx('icon-eye')}
                                                    onClick={() => {
                                                        handlePassword(true);
                                                    }}
                                                />
                                            )}
                                            {showPassword && (
                                                <BsEyeSlash
                                                    className={cx('icon-eye-slash')}
                                                    onClick={() => {
                                                        handlePassword(false);
                                                    }}
                                                />
                                            )}
                                        </div>
                                        {error && <p className={cx('error-message')}>Valid username or password</p>}
                                    </div>
                                </div>
                            </div>
                            <button className={cx('btn-login')}>Login</button>
                            <div className={cx('login-forget')}>
                                <p className={cx('login-forget-text')}>Forget Password?</p>
                            </div>
                            <div className={cx('group-social-list')}>
                                <div className={cx('group-social-item')}>
                                    <Link to="">
                                        <FontAwesomeIcon icon={faFacebook} className={cx('icon-social')} />
                                        <p>Sign in with Facebook</p>
                                    </Link>
                                </div>
                                <div className={cx('group-social-item')}>
                                    <Link to="">
                                        <FontAwesomeIcon icon={faGoogle} className={cx('icon-social')} />
                                        <p>Sign in with Google</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('login-end')}>
                                <p>
                                    {' '}
                                    Dont`t have a account? <Link to="/register">Sign in</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default LoginComponent;
