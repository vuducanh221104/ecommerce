import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);
function AccountItem({ data }) {
    console.log(data.name);
    return (
        <Link to={`/product/${data.slug}`} className={cx('wrapper', 'row m-0 d-flex')}>
            <img src={data.cover_image} alt="" className={cx('image-product', 'col-2 px-0')} />
            <div className={cx('info', 'col ps-2')}>
                <h3 className={cx('name', 'd-block')}>{data.name}</h3>
                <p className={cx('description')}>
                    <span className={cx('price-discount')}>{data.price_discount}đ</span>
                    <span className={cx('price-real')}>{data.price}đ</span>
                </p>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object,
};

export default AccountItem;
