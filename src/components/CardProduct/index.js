import styles from './CardProduct.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css'; // Nhúng CSS Bootstrap
import imagesIphone14 from '~/assets/Image-iphone';
const cx = classNames.bind(styles);
function CardProduct({}) {
    return (
        <>
            <div className="container-fluid">
                <div className="row row-cols-2 row-cols-sm-4 row-cols-lg-5 row-cols-xl-5 product__container">
                    <div className="col proitem">
                        <div className={cx('product')}>
                            <img src={imagesIphone14.authorIcon} className={cx('author-icon')} />
                            <span className={cx('precent')}>-22%</span>
                            <Link to="product/iphone-14-pro">
                                <img src={imagesIphone14.thumb} className={cx('image-thumb')} />
                            </Link>
                            <div className={cx('product-info')}>
                                <h3 className={cx('product-name')}>iPhone 14 128GB - Chính hãng VN/A</h3>
                                <div className={cx('product-price-info')}>
                                    <p className={cx('product-price-discount')}>18,690,000đ</p>
                                    <p className={cx('product-price-real')}>24,990,000đ</p>
                                </div>
                                <p className={cx('product-prepay')}>
                                    hoặc trả trước <span className={cx('product-prepay-price')}>5.700.000đ</span>
                                </p>
                                <div className={cx('product-star')}>
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col proitem">
                        <div className={cx('product')}>
                            <img src={imagesIphone14.authorIcon} className={cx('author-icon')} />
                            <span className={cx('precent')}>-22%</span>
                            <Link to="product/iphone-14-pro">
                                <img src={imagesIphone14.thumb} className={cx('image-thumb')} />
                            </Link>
                            <div className={cx('product-info')}>
                                <h3 className={cx('product-name')}>iPhone 14 128GB - Chính hãng VN/A</h3>
                                <div className={cx('product-price-info')}>
                                    <p className={cx('product-price-discount')}>18,690,000đ</p>
                                    <p className={cx('product-price-real')}>24,990,000đ</p>
                                </div>
                                <p className={cx('product-prepay')}>
                                    hoặc trả trước <span className={cx('product-prepay-price')}>5.700.000đ</span>
                                </p>
                                <div className={cx('product-star')}>
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col proitem">
                        <div className={cx('product')}>
                            <img src={imagesIphone14.authorIcon} className={cx('author-icon')} />
                            <span className={cx('precent')}>-22%</span>
                            <Link to="product/iphone-14-pro">
                                <img src={imagesIphone14.thumb} className={cx('image-thumb')} />
                            </Link>
                            <div className={cx('product-info')}>
                                <h3 className={cx('product-name')}>iPhone 14 128GB - Chính hãng VN/A</h3>
                                <div className={cx('product-price-info')}>
                                    <p className={cx('product-price-discount')}>18,690,000đ</p>
                                    <p className={cx('product-price-real')}>24,990,000đ</p>
                                </div>
                                <p className={cx('product-prepay')}>
                                    hoặc trả trước <span className={cx('product-prepay-price')}>5.700.000đ</span>
                                </p>
                                <div className={cx('product-star')}>
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col proitem">
                        <div className={cx('product')}>
                            <img src={imagesIphone14.authorIcon} className={cx('author-icon')} />
                            <span className={cx('precent')}>-22%</span>
                            <Link to="product/iphone-14-pro">
                                <img src={imagesIphone14.thumb} className={cx('image-thumb')} />
                            </Link>
                            <div className={cx('product-info')}>
                                <h3 className={cx('product-name')}>iPhone 14 128GB - Chính hãng VN/A</h3>
                                <div className={cx('product-price-info')}>
                                    <p className={cx('product-price-discount')}>18,690,000đ</p>
                                    <p className={cx('product-price-real')}>24,990,000đ</p>
                                </div>
                                <p className={cx('product-prepay')}>
                                    hoặc trả trước <span className={cx('product-prepay-price')}>5.700.000đ</span>
                                </p>
                                <div className={cx('product-star')}>
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col proitem">
                        <div className={cx('product')}>
                            <img src={imagesIphone14.authorIcon} className={cx('author-icon')} />
                            <span className={cx('precent')}>-22%</span>
                            <Link to="product/iphone-14-pro">
                                <img src={imagesIphone14.thumb} className={cx('image-thumb')} />
                            </Link>
                            <div className={cx('product-info')}>
                                <h3 className={cx('product-name')}>iPhone 14 128GB - Chính hãng VN/A</h3>
                                <div className={cx('product-price-info')}>
                                    <p className={cx('product-price-discount')}>18,690,000đ</p>
                                    <p className={cx('product-price-real')}>24,990,000đ</p>
                                </div>
                                <p className={cx('product-prepay')}>
                                    hoặc trả trước <span className={cx('product-prepay-price')}>5.700.000đ</span>
                                </p>
                                <div className={cx('product-star')}>
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                    <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardProduct;
