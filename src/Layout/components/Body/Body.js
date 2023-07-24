import styles from './Body.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import Map from '~/ComponentPages/Map';
import ProductInfo from './ProductInfo/ProductInfo';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Body() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('key'));
        if (cartFromLocalStorage && cartFromLocalStorage.length > 0) {
            setCartItems(cartFromLocalStorage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('key', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (productData) => {
        const isProduct = cartItems.some((item) => item.slug === productData.slug);
        if (isProduct) {
            alert('You have placed the product in the cart');
            return;
        }
        setCartItems((prevItem) => [...prevItem, productData]);
    };

    const handleToBuyNow = (productData) => {
        const isProduct = cartItems.some((item) => item.slug === productData.slug);
        if (isProduct) {
            alert('You have placed the product in the cart');
            return;
        }
        setCartItems((prevItem) => [...prevItem, productData]);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                {/* <div className={cx('product')}></div> */}
                <div className={cx('container-fluid')}>
                    <div className={cx('row')}>
                        <div className={cx('', 'col-12 col-lg-12 col-xl-9')}>
                            {/* COT 1-2*/}
                            <ProductInfo handleAddToCart={handleAddToCart} handleToBuyNow={handleToBuyNow} />
                        </div>
                        {/* COT 3 */}
                        <div className={cx('product-map-shop', 'col-12 col-lg-12 col-xl-3')}>
                            {/* MAP */}
                            <Map />
                            <div className={cx('wrapper-guarantee')}>
                                <div className={cx('guarantee-header')}>
                                    <FontAwesomeIcon icon={faShieldHalved} className={cx('icon-shield')} />
                                    <p> Bảo Hành 12 Tháng</p>
                                </div>
                                <div className={cx('guarantee-body')}>
                                    <p>✔️Máy mới Fullbox 100% - Chưa Active - Chính Hãng Apple</p>
                                    <p>✔️Được hỗ trợ 1 đổi 1 trong 30 ngày nếu có lỗi từ nhà sản xuất</p>
                                    <p>✔️Bảo hành chính hãng Apple 12 tháng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Body;
