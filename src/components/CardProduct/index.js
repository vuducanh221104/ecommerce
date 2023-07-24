import styles from './CardProduct.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import LazyLoad from 'react-lazyload';
import 'bootstrap/dist/css/bootstrap.css'; // Nhúng CSS Bootstrap
import imagesIphone14 from '~/assets/Image-iphone';
const cx = classNames.bind(styles);
function CardProduct({ data }) {
    return (
        <>
            <div className={cx('product')}>
                <img src={imagesIphone14.authorIcon} className={cx('author-icon')} />
                <span className={cx('precent')}>{`${data.percent_discount}`}</span>
                <Link to={`/product/${data.slug}`}>
                    <LazyLoad>
                        <img src={`${data.cover_image}`} className={cx('image-thumb', 'lazyload')} />
                    </LazyLoad>
                </Link>
                <div className={cx('product-info')}>
                    <h3 className={cx('product-name')}>{`${data.name}`}</h3>
                    <div className={cx('product-price-info')}>
                        <p className={cx('product-price-discount')}>{`${data.price_discount}`}đ</p>
                        <p className={cx('product-price-real')}>{`${data.price}`}đ</p>
                    </div>
                    <p className={cx('product-prepay')}>
                        hoặc trả trước <span className={cx('product-prepay-price')}>{`${data.prepay}`}đ</span>
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
        </>
    );
}

export default CardProduct;
