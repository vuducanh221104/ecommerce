import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useEffect, useState } from 'react';
import { IconPrev } from '~/components/IconPrev';
import { Link } from 'react-router-dom';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import * as userServices from '~/services/userServices';
import ErrorWarning from '~/components/ErrorWarning';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);
function User() {
    const isAuth = JSON.parse(Cookies.get('isAuth'));
    const [data, setData] = useState({});
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(true);
    const [verify, setVerify] = useState(false);
    // Handle Set Data
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
    // Set intialValue
    useEffect(() => {
        if (isAuth) {
            formik.setValues({
                fullname: data.fullname || '',
                username: data.username || '',
                phone: data.phone || '',
            });
        }
    }, [data]);

    // HANDLE FORM
    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            phone: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required('Required')
                .matches(
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                    'Valid Full name',
                ),
            username: Yup.string().required('Required').min(5, 'Must be 5 characters or more'),
            phone: Yup.string()
                .required('Required')
                .matches(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                    'Please Enter a valid Phone Number',
                ),
            email: Yup.string()
                .required('Required')
                .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'Please Enter a valid email',
                ),
        }),
        onSubmit: async (values) => {
            axios.patch(`http://localhost:4000/api-user/users/${data._id}`, values);
            try {
                setShow(true);
            } catch (err) {
                console.log(err);
            }
        },
    });

    // Values Check Input
    let requiredCofirm = formik.values.fullname === '' && formik.values.username === '' && formik.values.phone === '';
    // Values Cofirm
    const BoolRequiredCofirm = !formik.values.fullname || !formik.values.username || !formik.values.phone;
    //  Validate Click
    const handleRegisterClick = () => {
        if (BoolRequiredCofirm) {
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
                                    <div className={cx('user')}>
                                        <IconPrev urlPrev={'/'} />

                                        <div className={cx('user-info-list')}>
                                            <div className={cx('user-info-item')}>
                                                <h3>Full name</h3>
                                                <input
                                                    type="text"
                                                    placeholder="Edit your fullname"
                                                    id="fullname"
                                                    name="fullname"
                                                    value={formik.values.fullname}
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                        setValue(false);
                                                    }}
                                                />
                                                {formik.errors.fullname && (
                                                    <p className={cx('error-message')}>{formik.errors.fullname}</p>
                                                )}
                                            </div>
                                            <div className={cx('user-info-item')}>
                                                <h3>User name</h3>
                                                <input
                                                    type="text"
                                                    placeholder="Edit your fullname"
                                                    id="username"
                                                    name="username"
                                                    value={formik.values.username}
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                        setValue(false);
                                                    }}
                                                />
                                                {formik.errors.username && (
                                                    <p className={cx('error-message')}>{formik.errors.username}</p>
                                                )}
                                            </div>
                                            <div className={cx('user-info-item')}>
                                                <h3>Phone Number</h3>
                                                <input
                                                    type="text"
                                                    placeholder="Phone Number"
                                                    id="phone"
                                                    name="phone"
                                                    value={formik.values.phone}
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                        setValue(false);
                                                    }}
                                                />
                                                {formik.errors.phone && (
                                                    <p className={cx('error-message')}>{formik.errors.phone}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('change-password')}>
                                            <Link to="/changePassword">Change Password</Link>
                                        </div>
                                        <div className={cx('change-password')}>
                                            <Link to="/changeEmail">Change Email</Link>
                                        </div>
                                        <div className={cx('change-password')}>
                                            <Link to="/changeAvatar">Change Avatar</Link>
                                        </div>
                                        {/* BUTTON */}
                                        <button
                                            className={cx('btn-submit', requiredCofirm || value ? 'disabled' : '')}
                                            onClick={handleRegisterClick}
                                            disabled={requiredCofirm || value}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            )}
                        </>
                    ) : (
                        <ErrorWarning icon={faCircleCheck} title="SUCCESSFULLY" />
                    )}
                    {!isAuth && <ErrorWarning title="ERROR" />}
                    {verify && <ErrorWarning title="YOU MUST VERIFY EMAIL" />}
                </div>
            </div>
        </>
    );
}

export default User;
