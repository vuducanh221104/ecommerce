import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import images from '~/assets/images';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Comment() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);
    const [seeAll, setSeeAll] = useState(false);
    const [data, setData] = useState([]);

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
            stars: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Comment cannot be empty'),
            stars: Yup.string().required('Chosse star cannot be empty'),
        }),
        onSubmit: async (values) => {
            const addData = await axios.post('http://localhost:4000/api-comment/comment', {
                slug: slug,
                fullname: user,
                comment: values.comment,
                stars: values.stars,
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
            const response = await axios.get(`http://localhost:4000/api-comment/comment-preview/${slug}`);
            try {
                setData(response.data.content);
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

    // API USER
    let userRatings = data;

    // Handle Sum All Star
    let averageRating = 0;

    // Check if there are ratings
    if (userRatings.length > 0) {
        const totalRatingPoints = userRatings.reduce((total, rating) => total + rating.stars, 0);
        averageRating = (totalRatingPoints / userRatings.length).toFixed(1);
    }

    // Total User Comment
    const numberEvalute = userRatings.length;
    // Total Evalute For Every Star
    // 5 Star
    const totalEvaluteFiveStar = userRatings
        .filter((rating) => rating.stars === 5)
        .reduce((total, rating) => total + 1, 0);
    // 4 Star
    const totalEvaluteFourStar = userRatings
        .filter((rating) => rating.stars === 4)
        .reduce((total, rating) => total + 1, 0);
    // 3 Star
    const totalEvaluteThreeStar = userRatings
        .filter((rating) => rating.stars === 3)
        .reduce((total, rating) => total + 1, 0);
    // 2 Star
    const totalEvaluteTwoStar = userRatings
        .filter((rating) => rating.stars === 2)
        .reduce((total, rating) => total + 1, 0);
    // 1 Star
    const totalEvaluteOneStar = userRatings
        .filter((rating) => rating.stars === 1)
        .reduce((total, rating) => total + 1, 0);

    // Handle Sum For Every Star
    const totalFiveStars = userRatings
        .filter((rating) => rating.stars === 5)
        .reduce((total, rating) => total + rating.stars, 0);

    const totalFourStars = userRatings
        .filter((rating) => rating.stars === 4)
        .reduce((total, rating) => total + rating.stars, 0);

    const totalThreeStars = userRatings
        .filter((rating) => rating.stars === 3)
        .reduce((total, rating) => total + rating.stars, 0);

    const totalTwoStars = userRatings
        .filter((rating) => rating.stars === 2)
        .reduce((total, rating) => total + rating.stars, 0);

    const totalOneStars = userRatings
        .filter((rating) => rating.stars === 1)
        .reduce((total, rating) => total + rating.stars, 0);
    // Handle Width Progress
    const maxRating = userRatings.length * 5;
    let ratingValueFiveStars = (totalFiveStars / maxRating) * 100;
    let ratingValueFourStars = (totalFourStars / maxRating) * 100;
    let ratingValueThreeStars = (totalThreeStars / maxRating) * 100;
    let ratingValueTwoStars = (totalTwoStars / maxRating) * 100;
    let ratingValueOneStars = (totalOneStars / maxRating) * 100;

    if (data.length <= 0) {
        ratingValueFiveStars = 0;
        ratingValueFourStars = 0;
        ratingValueThreeStars = 0;
        ratingValueTwoStars = 0;
        ratingValueOneStars = 0;
    }
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
        <div className={cx('comment')}>
            <form className={cx('form-submit')} onSubmit={formik.handleSubmit}>
                <h3 className={cx('comment-title', 'mb-4')}>
                    Đánh Giá & Nhận Xét Về IPhone 14 128GB - Chính Hãng VN/A
                </h3>
                {/* BOX-EVALUTE */}
                <div className={cx('evaluate-box', 'row')}>
                    <div className={cx('evaluate-box-left', 'col-12', 'col-lg-5')}>
                        <h3 className={cx('evaluate-rate')}>{averageRating}</h3>
                        <div className={cx('evaluate-info')}>
                            <div className={cx('evaluate-star')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                            </div>
                            <div className={cx('evaluate-quatity')}>
                                <p>
                                    Có <span>{numberEvalute}</span> đánh giá và nhận xét
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('evaluate-box-right', 'col-12', 'col-lg-7')}>
                        {/* 5 */}
                        <div className={cx('rating-overview')}>
                            <div className={cx('rating-overview-item-rating')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            </div>
                            <div className={cx('rating-overview-item-progress')}>
                                <div
                                    className={cx('progess-bar')}
                                    style={{ width: `${ratingValueFiveStars}%` }}
                                    role="progressbar"
                                    aria-valuenow={ratingValueFiveStars}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <div className={cx('rating-overview-item-text')}>{totalEvaluteFiveStar} Nhận Xét</div>
                        </div>
                        {/* 4 */}
                        <div className={cx('rating-overview')}>
                            <div className={cx('rating-overview-item-rating')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            </div>
                            <div className={cx('rating-overview-item-progress')}>
                                <div
                                    className={cx('progess-bar')}
                                    style={{ width: `${ratingValueFourStars}%` }}
                                    role="progressbar"
                                    aria-valuenow={ratingValueFourStars}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <div className={cx('rating-overview-item-text')}>{totalEvaluteFourStar} Nhận Xét</div>
                        </div>
                        {/*  3 */}
                        <div className={cx('rating-overview')}>
                            <div className={cx('rating-overview-item-rating')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            </div>
                            <div className={cx('rating-overview-item-progress')}>
                                <div
                                    className={cx('progess-bar')}
                                    style={{ width: `${ratingValueThreeStars}%` }}
                                    role="progressbar"
                                    aria-valuenow={ratingValueThreeStars}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <div className={cx('rating-overview-item-text')}>{totalEvaluteThreeStar} Nhận Xét</div>
                        </div>
                        {/*  2 */}
                        <div className={cx('rating-overview')}>
                            <div className={cx('rating-overview-item-rating')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            </div>
                            <div className={cx('rating-overview-item-progress')}>
                                <div
                                    className={cx('progess-bar')}
                                    style={{ width: `${ratingValueTwoStars}%` }}
                                    role="progressbar"
                                    aria-valuenow={ratingValueTwoStars}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <div className={cx('rating-overview-item-text')}>{totalEvaluteTwoStar} Nhận Xét</div>
                        </div>
                        {/*  1 */}
                        <div className={cx('rating-overview')}>
                            <div className={cx('rating-overview-item-rating')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                                <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            </div>
                            <div className={cx('rating-overview-item-progress')}>
                                <div
                                    className={cx('progess-bar')}
                                    style={{ width: `${ratingValueOneStars}%` }}
                                    role="progressbar"
                                    aria-valuenow={ratingValueOneStars}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <div className={cx('rating-overview-item-text')}>{totalEvaluteOneStar} Nhận Xét</div>
                        </div>
                    </div>
                </div>
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
                                            {' '}
                                            {new Date(item.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('comment-star')}>
                                    <FontAwesomeIcon icon={faStar} className={cx('comment-icon-star')} />
                                    <span>{item.stars}</span>
                                </div>
                            </header>
                            <div className={cx('comment-body')}>
                                <p className={cx('comment-text')}>{item.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* BUTTON SEE ALL */}
                {!seeAll && data.length > 3 ? (
                    <div className={cx('btn-see-all')} onClick={(e) => handleSeeAll(e)}>
                        <button>
                            <p>See All Evalute</p>
                        </button>
                    </div>
                ) : (
                    <h2 className={cx(seeAll ? 'd-none' : 'd-flex justify-content-center align-items-center mt-5')}>
                        Not Reviews Yet
                    </h2>
                )}
                {seeAll && (
                    <div className={cx('btn-see-all')} onClick={(e) => handleSmallest(e)}>
                        <button>
                            <p>Smalles</p>
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
                            <div className={cx('comment-select')}>
                                <select
                                    id="stars"
                                    name="stars"
                                    value={formik.values.stars}
                                    onChange={formik.handleChange}
                                >
                                    <option>Choose number of stars</option>
                                    <option value={1}>1 Sao</option>
                                    <option value={2}>2 Sao</option>
                                    <option value={3}>3 Sao</option>
                                    <option value={4}>4 Sao</option>
                                    <option value={5}>5 Sao</option>
                                </select>
                                {formik.errors.stars && <p className={cx('error-message')}>{formik.errors.stars}</p>}
                            </div>
                            <div className={cx('btn-sumbit')}>
                                <button> Submit</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('blocked-area')}>
                        <div className={cx('blocked-overlay')}>
                            <h3> You must login</h3>
                        </div>
                        <div className={cx('comment-input-box')}>
                            <div className={cx('comment-input')}>
                                <input type="text" placeholder="Enter Your Comment" id="comment" name="comment" />
                            </div>
                            <div className={cx('comment-grid')}>
                                <div className={cx('comment-select')}>
                                    <select id="stars" name="stars">
                                        <option>Choose number of stars</option>
                                        <option value={1}>1 Sao</option>
                                        <option value={2}>2 Sao</option>
                                        <option value={3}>3 Sao</option>
                                        <option value={4}>4 Sao</option>
                                        <option value={5}>5 Sao</option>
                                    </select>
                                    {formik.errors.stars && (
                                        <p className={cx('error-message')}>{formik.errors.stars}</p>
                                    )}
                                </div>
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

export default Comment;
