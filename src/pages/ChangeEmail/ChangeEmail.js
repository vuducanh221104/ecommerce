import classNames from 'classnames/bind';
import styles from './ChangeEmail.module.scss';
import ErrorWarning from '~/components/ErrorWarning';
import { IconPrev } from '~/components/IconPrev';
import { useEffect, useState } from 'react';
import * as userServices from '~/services/userServices';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import VerifyNewEmail from '~/Layout/Authenticator/VerifyNewEmail';

const cx = classNames.bind(styles);
function ChangePassword() {
    const isAuth = JSON.parse(Cookies.get('isAuth'));
    const [verify, setVerify] = useState(false);
    const [data, setData] = useState({});
    const [show, setShow] = useState(false);
    const [err, setErr] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    //Handle Data
    const token = Cookies.get('token');
    useEffect(() => {
        if (isAuth) {
            const fetchApi = async () => {
                try {
                    const data = await axios.get('http://localhost:4000/api-user/checkusers', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setData(data.data);
                    if (!data.data.isVerified) {
                        setVerify(true);
                    } else if (data.data.isVerified) {
                        setVerify(false);
                    }
                } catch (err) {
                    console.log('err at dataId', err);
                }
            };
            fetchApi();
        }
    }, [token]);

    // HANDLE SUBMIT
    const formik = useFormik({
        initialValues: {
            changeEmail: '',
        },
        validationSchema: Yup.object({
            changeEmail: Yup.string()
                .required('Required')
                .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'Please Enter a valid email',
                ),
        }),
        onSubmit: async (values) => {
            try {
                if (!emailExists) {
                    axios.post('http://localhost:4000/api-user/change-email', {
                        userId: data._id,
                        newEmail: values.changeEmail,
                    });
                    setShow(true);
                }
            } catch (err) {}
        },
    });
    // Values Cofirm
    const requiredCofirm = formik.values.changeEmail === '';

    //  Validate Click
    const handleRegisterClick = () => {
        if (emailExists || !formik.values.changeEmail) {
            return;
        }
        if (formik.isValid) {
            // setRequired(false);
            formik.handleSubmit(); // Gửi form nếu hợp lệ
        }
    };
    return (
        <>
            <div className={cx('wrapper pt-0 pt-lg-0 container')}>
                <div className={cx('content')}>
                    {!show ? (
                        <>
                            {(!verify || !isAuth) && (
                                <form
                                    className={cx('form-user', isAuth ? '' : 'd-none', !verify ? '' : 'd-none')}
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div className={cx('change-password')}>
                                        <IconPrev urlPrev={'/user'} />
                                        <div className={cx('user-info-list')}>
                                            <div className={cx('user-info-item')}>
                                                <h3>Email Old : {data.email}</h3>
                                            </div>
                                            <div className={cx('user-info-item')}>
                                                <h3>Change Email</h3>
                                                <div className={cx('user-box')}>
                                                    <input
                                                        type="text"
                                                        placeholder="Change Email"
                                                        id="changeEmail"
                                                        name="changeEmail"
                                                        value={formik.values.changeEmail}
                                                        onChange={async (e) => {
                                                            formik.handleChange(e);
                                                            try {
                                                                const res = await axios.get(
                                                                    `http://localhost:4000/api-user/users/check-email?email=${e.target.value}`,
                                                                );
                                                                setEmailExists(res.data.exists);
                                                            } catch (err) {
                                                                setEmailExists(false);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {formik.errors.changeEmail && (
                                                    <p className={cx('error-message')}>{formik.errors.changeEmail}</p>
                                                )}
                                                {emailExists && (
                                                    <p className={cx('error-message')}>Email Already used</p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className={cx('btn-submit', requiredCofirm ? 'disabled' : '')}
                                            onClick={handleRegisterClick}
                                            disabled={requiredCofirm}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            )}
                        </>
                    ) : (
                        // Show Verify Email
                        <VerifyNewEmail newEmail={formik.values.changeEmail} />
                    )}
                    {!isAuth && <ErrorWarning title="ERROR" />}
                    {verify && <ErrorWarning title="YOU MUST VERIFY EMAIL" />}
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
