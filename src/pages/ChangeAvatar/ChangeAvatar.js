import classNames from 'classnames/bind';
import styles from './ChangeAvatar.module.scss';
import ErrorWarning from '~/components/ErrorWarning';
import { IconPrev } from '~/components/IconPrev';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import * as userServices from '~/services/userServices';

import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);
function ChangeAvatar() {
    const navigate = useNavigate();
    const isAuth = JSON.parse(Cookies.get('isAuth'));
    const [data, setData] = useState({});
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(true);
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
                    } else if (data.data.isVerified) {
                    }
                } catch (err) {
                    console.log('err at dataId', err);
                }
            };
            fetchApi();
        }
    }, [token]);

    // UPLOAD AVATAR
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setValue(false);
    };

    const handleUpload = () => {
        if (selectedFile) {
            setLoading(true);
            const formData = new FormData();
            formData.append('img', selectedFile);
            formData.append('_id', data._id);

            axios
                .post('http://localhost:4000/api-user/upload', formData)
                .then((response) => {
                    setSuccess(true);
                    setLoading(false);
                    // refresh
                    setTimeout(() => {
                        navigate(0);
                    }, 700);
                })
                .catch((error) => {
                    console.log('Upload failed:', error);
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <div className={cx('wrapper pt-0 pt-lg-0 container')}>
                <div className={cx('content')}>
                    <div className={cx('user')}>
                        <IconPrev urlPrev={'/user'} />
                        <div className={cx('change-avatar')}>
                            <h3>Thay đổi avatar</h3>
                            {selectedFile && (
                                <img
                                    src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                                    alt="Avatar"
                                    className={cx('avatar-img')}
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                handle
                                name="img"
                                id="img"
                                onChange={(e) => handleFileChange(e)}
                            />
                        </div>
                        {success && !loading && (
                            <p className={cx('text-success')}>
                                Thay Đổi Avatar Thành Công <FontAwesomeIcon icon={faCircleCheck} />
                            </p>
                        )}
                        {loading && (
                            <div className={cx('loading')}>
                                <FontAwesomeIcon className={cx('icon-loading')} icon={faCircleNotch} />
                            </div>
                        )}
                        <button
                            onClick={() => handleUpload()}
                            className={cx('btn-submit', !selectedFile || value ? 'disabled' : '')}
                        >
                            Upload Avatar
                        </button>
                    </div>
                    {!isAuth && <ErrorWarning title="ERROR" />}
                </div>
            </div>
        </>
    );
}

export default ChangeAvatar;
