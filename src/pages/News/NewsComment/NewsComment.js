import styles from './NewsComment.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import ExchangTime from '~/components/ExchangeTIme';
const cx = classNames.bind(styles);

function NewsComment() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);
    const [seeAll, setSeeAll] = useState(false);
    const [data, setData] = useState([]);
    console.log(data);
    function getCookie(cname) {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Comment cannot be empty'),
        }),
        onSubmit: async (values) => {
            const addData = await axios.post('http://localhost:4000/api-news/news/comment', {
                slug: slug,
                fullname: user,
                comment_content: values.comment,
            });
            try {
                console.log(addData);
                navigate(0);
            } catch (err) {
                console.log(err);
            }
        },
    });
    useEffect(() => {
        // Nhan data de in ra comment
        const fetchApi = async () => {
            const response = await axios.get(`http://localhost:4000/api-news/news/preview-comment/${slug}`);
            try {
                setData(response.data.comment);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const token = getCookie('token');
        // Check user to login ?
        const fetchApi = async () => {
            const response = await axios.get('http://localhost:4000/api-user/checkusers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            try {
                if (response.data.message !== false) {
                    setUser(response.data.fullname);
                    setLogged(true); //logged in
                } else {
                    setLogged(false); //not logged in
                }
            } catch (err) {
                console.log(err);
                setLogged(false); //not logged in
            }
        };
        fetchApi();
    }, []);

    // Quatity stars Option
    const handleSeeAll = (e) => {
        e.preventDefault();
        setSeeAll(true);
    };
    const handleSmallest = (e) => {
        e.preventDefault();
        setSeeAll(false);
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Mời Bạn Cùng Thảo Luận</h3>
            <form className={cx('form-submit')} onSubmit={formik.handleSubmit}>
                {/* COMMENT */}
                <div className={cx('comment-list', seeAll ? 'seeAll' : '')}>
                    {data.map((item, index) => (
                        <div className={cx('comment-box')}>
                            <header className={cx('comment-header')}>
                                <div className={cx('comment-content')}>
                                    <img
                                        src={images.noImage}
                                        alt="image-user"
                                        style={{ width: '50px' }}
                                        className={cx('image-user')}
                                    />
                                    <div className={cx('comment-info')}>
                                        <h3 className={cx('comment-name')}>{item.fullname}</h3>
                                        <p className={cx('comment-time')}>
                                            <ExchangTime time={item.createdAt} />
                                        </p>
                                    </div>
                                </div>
                            </header>
                            <div className={cx('comment-body')}>
                                <p className={cx('comment-text')}>{item.comment_content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* BUTTON SEE ALL */}
                {!seeAll && data.length > 3 ? (
                    <div className={cx('btn-see-all')} onClick={(e) => handleSeeAll(e)}>
                        <button>
                            <p>More</p>
                        </button>
                    </div>
                ) : (
                    <h3
                        className={cx(seeAll ? 'd-none' : 'd-flex justify-content-center align-items-center mt-5')}
                        style={{ color: '#555' }}
                    >
                        Nothing Comment...
                    </h3>
                )}
                {seeAll && (
                    <div className={cx('btn-see-all')} onClick={(e) => handleSmallest(e)}>
                        <button>
                            <p>Less</p>
                        </button>
                    </div>
                )}
                {/* INPUT */}
                {logged ? (
                    <div className={cx('comment-input-box')}>
                        <div className={cx('comment-input')}>
                            <input
                                type="text"
                                placeholder="Enter Your Comment"
                                id="comment"
                                name="comment"
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('comment-grid')}>
                            <div className={cx('btn-sumbit')}>
                                <button> Submit</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('blocked-area')}>
                        <div className={cx('blocked-overlay')}>
                            <h3> You Must Login</h3>
                        </div>
                        <div className={cx('comment-input-box')}>
                            <div className={cx('comment-input')}>
                                <input type="text" placeholder="Enter Your Comment" id="comment" name="comment" />
                            </div>
                            <div className={cx('comment-grid')}>
                                <div className={cx('btn-sumbit')}>
                                    <button> Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default NewsComment;
