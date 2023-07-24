import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus, faHome, faTags } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { BsCart2, BsCheckCircle, BsPersonCircle, BsWallet2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Cart() {
    // LOCAL STORAGE
    const [dataFromLocalStorage, setDataFromLocalStorage] = useState(JSON.parse(localStorage.getItem('key')));
    // Sum of product
    let SumProduct;
    // Function Update Price
    const updatePrice = () => {
        let sum = 0;
        dataFromLocalStorage.forEach((item) => {
            let price = parseFloat(item.price_discount.replace(/,/g, ''));
            sum += item.amount * price;
            const formattedSum = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            SumProduct = formattedSum;
        });
    };
    if (dataFromLocalStorage) {
        updatePrice();
    }
    // Increase And Minus + & -
    const handleMinusandIncrease = (data, btn) => {
        const updatedAmount = data.amount + btn;
        const updatedData = dataFromLocalStorage.map((item) =>
            item.slug === data.slug ? { ...item, amount: updatedAmount } : item,
        );
        setDataFromLocalStorage(updatedData);
        localStorage.setItem('key', JSON.stringify(updatedData));
        updatePrice();
    };
    // DELETE
    const handleDelete = (index) => {
        const update = dataFromLocalStorage.filter((item, i) => i !== index);
        setDataFromLocalStorage(update);
        localStorage.setItem('key', JSON.stringify(update));

        updatePrice();
        window.location.reload(false);
    };

    return (
        <>
            <div className={cx('wrapper', 'pt-0 pt-lg-0', 'container')}>
                <div className={cx('cart')}>
                    {dataFromLocalStorage && dataFromLocalStorage.length ? (
                        <>
                            <div className={cx('cart-navstep', 'mb-5')}>
                                <span className={cx('cart-navstep-item', 'active')}>
                                    <BsCart2 className={cx('icon-cart-1')} />
                                    <div className={cx('cart-navstep-description')}>
                                        <BsCheckCircle className={cx('btn-check')} />
                                        <div className={cx('cart-nav-step-title')}>
                                            <p>
                                                Kiểm tra <p>giỏ hàng</p>
                                            </p>
                                        </div>
                                    </div>
                                </span>
                                <span className={cx('cart-navstep-item', 'active')}>
                                    <BsPersonCircle className={cx('icon-cart-1')} />
                                    <div className={cx('cart-navstep-description')}>
                                        <BsCheckCircle className={cx('btn-check')} />
                                        <div className={cx('cart-nav-step-title')}>
                                            <p>Kiểm tra</p>
                                            <p>Giỏ Hàng</p>
                                        </div>
                                    </div>
                                </span>
                                <span className={cx('cart-navstep-item')}>
                                    <BsWallet2 className={cx('icon-cart-1')} />
                                    <div className={cx('cart-navstep-description')}>
                                        <BsCheckCircle className={cx('btn-check')} />
                                        <div className={cx('cart-nav-step-title')}>
                                            <p>Kiểm tra</p>
                                            <p>Giỏ Hàng</p>
                                        </div>
                                    </div>
                                </span>
                                <span className={cx('cart-navstep-item')}>
                                    <FontAwesomeIcon icon={faCheckCircle} className={cx('icon-cart-4')} />
                                    <div className={cx('cart-navstep-description')}>
                                        <BsCheckCircle className={cx('btn-check')} />
                                        <div className={cx('cart-nav-step-title')}>
                                            <p>Kiểm tra</p>
                                            <p>Giỏ Hàng</p>
                                        </div>
                                    </div>
                                </span>
                            </div>
                            <h3 className={cx('cart-title')}>Đơn hàng của bạn</h3>
                            {dataFromLocalStorage.map((data, index) => (
                                <>
                                    <div className={cx('cart-product-header', 'mt-4')}>
                                        <div className={cx('display-header')}>
                                            <Link to={`/product/${data.slug}`}>
                                                <img
                                                    src={data.cover_image}
                                                    alt={data.name}
                                                    className={cx('product-img', 'col')}
                                                />
                                            </Link>
                                            <div className={cx('display-body', 'px-0  col flex-column')}>
                                                <div className={cx('product-body-header')}>
                                                    <Link to={`/product/${data.slug}`}>
                                                        <div className={cx('product-name')}>
                                                            <p>{data.name}</p>
                                                        </div>
                                                    </Link>
                                                    <div
                                                        className={cx('icon-trash')}
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx(
                                                        'cart-product-body',
                                                        'col-12 d-flex flex-wrap flex-column',
                                                    )}
                                                >
                                                    <select className={cx('product-body-body')}>
                                                        <option value>Màu Sắc</option>
                                                        <option value="deep-purple">Deep Purple</option>
                                                        <option value="gold">Gold/Vàng</option>
                                                        <option value="silver">Silver/Bạc</option>
                                                        <option value="space-black">Space-Black</option>
                                                    </select>
                                                </div>
                                                <div className={cx('cart-product-footer')}>
                                                    <div className={cx('product-price')}>
                                                        <p className={cx('price-discount')}>{data.price_discount}đ</p>
                                                        <p className={cx('price-real')}>{data.price}đ</p>
                                                    </div>
                                                    <div className={cx('product-quantity')}>
                                                        <button
                                                            className={cx('btn-minus')}
                                                            onClick={() => {
                                                                handleMinusandIncrease(data, -1);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            className={cx('input-number')}
                                                            value={data.amount}
                                                        />
                                                        <button
                                                            className={cx('btn-increase')}
                                                            onClick={() => {
                                                                handleMinusandIncrease(data, +1);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* DON HANG */}
                                        </div>
                                    </div>
                                </>
                            ))}
                            <div className={cx('cart-coupons', 'row', 'mt-5')}>
                                <input
                                    type="text"
                                    placeholder="Nhập Mã Giảm Giá(Nếu Có)"
                                    className={cx('', 'col-10')}
                                />
                                <button className={cx('btn-coupons', 'col-2')}>
                                    <FontAwesomeIcon icon={faTags} className={cx('icon-tag')} />
                                </button>
                                {/* <p className={cx('counpons-fails')}>Mã Giảm Giá Không Hợp Lệ</p> */}
                            </div>
                            <div className={cx('cart-total')}>
                                <p>Tạm Tính</p>
                                <span className={cx('price-total')}>{SumProduct}đ</span>
                            </div>
                            <div className={cx('btn-order')}>
                                <p>ĐẶT HÀNG</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={cx('cart-not-product')}>
                                <h3 className={cx('cart-no-product-title')}>Đơn hàng của bạn</h3>
                                <div className={cx('cart-body')}>
                                    <div className={cx('cart-description')}>
                                        <p>Hiện chưa có thông tin đặt hàng.</p>
                                    </div>
                                    <Link to="/">
                                        <button className={cx('btn-no-product')}>
                                            <FontAwesomeIcon icon={faHome} className={cx('icon-home')} />
                                            <p>Tiếp Tục Mua Hàng...</p>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cart;
