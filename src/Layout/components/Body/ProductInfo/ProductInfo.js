import styles from './ProductInfo.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faStar, faGift, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { BsCaretRight, BsCaretLeft } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);

function ProductInfo({ handleAddToCart, handleToBuyNow }) {
    const [data, setData] = useState();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isDoubleClicked, setIsDoubleClicked] = useState(false);
    const [currentThumbnailSrc, setCurrentThumbnailSrc] = useState('');

    const { slug } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/api/product/${slug}`).then((data) => setData(data.data));
    }, [slug]);

    const handleNext = (e) => {
        if (!isDoubleClicked) {
            setIsDoubleClicked(true);

            setTimeout(() => {
                setActiveImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
                setIsDoubleClicked(false);
            }, 100);
        }
        setTimeout(() => {
            setCurrentThumbnailSrc(null);
        }, 200);
    };

    const handlePrev = () => {
        setActiveImageIndex((prevIndex) => {
            if (prevIndex < 1) {
                prevIndex = 1;
            }
            return prevIndex - 1;
        });
        setTimeout(() => {
            setCurrentThumbnailSrc(null);
        }, 200);
    };

    const handleThumbnailClick = (index) => {
        setActiveImageIndex(index);
        setCurrentThumbnailSrc(null);
    };

    const handleColorClick = (index) => {
        setActiveImageIndex(index);
    };

    const handleAddCart = () => {
        const dataProduct = data;
        if (handleAddToCart) {
            handleAddToCart(dataProduct);
        }
        window.location.reload(false);
    };

    const handleBuyNow = () => {
        const dataProduct = data;
        if (handleToBuyNow) {
            handleToBuyNow(dataProduct);
        }
    };

    const handleColorProduct = (data) => {
        setActiveImageIndex(0);
        setCurrentThumbnailSrc(data);
    };

    const currentSlug = window.location.pathname.split('/').slice(-1)[0];

    return (
        <>
            {data && (
                <div className={cx('row')}>
                    <div className={cx('product-img', 'col-12 col-lg-5 col-xl-5 col-md-10')}>
                        {/* THUMB IMG */}
                        <div className={cx('img-main-container')}>
                            <div
                                style={{
                                    transform: `translate3d(-${activeImageIndex * 406}px, 0px, 0px)`,
                                }}
                                className={cx('img-main-list')}
                            >
                                {data.images.map((image, index) => (
                                    <img
                                        style={{
                                            width: '406px',
                                        }}
                                        key={index}
                                        src={currentThumbnailSrc ? currentThumbnailSrc : image}
                                        className={cx('img-thumb')}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* ICON THUMB-IMG */}
                        <div className={cx('icon-list')}>
                            <BsCaretRight className={cx('icon-right')} onClick={handleNext} />
                            <BsCaretLeft className={cx('icon-left')} onClick={handlePrev} />
                        </div>
                        {/* DESCRIPTION IMAGES */}
                        <div className={cx('img-details-list', 'mt-5')}>
                            {/* ICON DESCRIPTION IMAGES  */}
                            {/* IMAGES */}
                            {data.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={cx('img-details-item', 'current', {
                                        active: index === activeImageIndex,
                                    })}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <img src={image} className={cx('img-item')} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* COT 2 */}
                    <div className={cx('product-details', 'px-5', 'col-sm-12', 'col-lg', 'col-12 col-xl-7 col-md-12')}>
                        <div className={cx('product-info')}>
                            {/* NAME */}
                            <h3 className={cx('product-name')}>{data.name}</h3>
                            {/* PRODUCT-STAR */}
                            <div className={cx('icon-start-list')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                            </div>
                            <h3 className={cx('price-buy')}>Giá bán</h3>
                            {/* PRODUCT-PRICE */}
                            <div className={cx('price')}>
                                <span className={cx('price-discount')}>{data.price_discount}đ</span>
                                <span className={cx('price-real')}>{data.price}đ</span>
                            </div>
                            {/* PRODUCT-MEMORY */}
                            <div
                                className={cx(
                                    'product-memory-list',
                                    'row row-cols-2 row-cols-sm-4 row-cols-md-4 row-cols-lg-3',
                                    'mt-3',
                                )}
                            >
                                {data.storage.map((data, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={cx('product-memory-item', {
                                                active: data.link === currentSlug, // Thêm lớp active nếu slug trùng khớp
                                                'col-auto': true,
                                            })}
                                        >
                                            <Link to={`/product/${data.link}`}>
                                                <p className={cx('product-memory-name')}>{data.info.name}</p>
                                                <p className={cx('product-memory-price')}>{data.info.price}đ</p>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* PRODUCT-COLOR */}
                            <h3 className={cx('product-color-title')}>Màu Sắc</h3>
                            <div className={cx('product-color-list', 'row')}>
                                {data.color_available.stock.map((item, index) => (
                                    <img
                                        src={item}
                                        className={cx('prodcut-color-img', 'on', {
                                            active: index === activeImageIndex,
                                        })} //'have on just presently(hiện)'
                                        style={{ width: '60px' }}
                                        onClick={() => {
                                            handleColorProduct(item);
                                        }}
                                    />
                                ))}
                                {data.color_available.out_stock.map((item, index) => (
                                    <img
                                        src={item}
                                        className={cx('prodcut-color-img')} //'have on just presently(hiện)'
                                        style={{ width: '60px' }}
                                        onClick={() => {
                                            handleColorProduct(item);
                                        }}
                                    />
                                ))}
                            </div>
                            {/* PRODUCT DESCTRIPTION */}
                            <div className={cx('product-description', 'mt-4')}>
                                <div className={cx('product-description-header')}>
                                    <h3 className={cx('product-description-header-title')}>
                                        <FontAwesomeIcon icon={faGift} className={cx('icon-gift')} />
                                        {data.name}
                                    </h3>
                                </div>
                                <div className={cx('product-description-body')}>
                                    <div className={cx('product-description-info')}>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                {' '}
                                                Giảm{' '}
                                                <span className={cx('price-description')}>
                                                    {data.description.one}
                                                </span>{' '}
                                                khi mua kèm gói bảo hành VIP 12 tháng 1 Đổi 1
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                {' '}
                                                Giảm 50% tối đa
                                                <span className={cx('price-description')}>100.000đ </span> cho thành
                                                viên mới của Kredivo
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                Giảm 5% tối đa{' '}
                                                <span className={cx('price-description')}>500.000đ </span> , áp dụng kỳ
                                                hạn 6/12 tháng và đơn hàng từ 700.000đ khi thanh toán qua Kredivo
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                Giảm 10% tối đa{' '}
                                                <span className={cx('price-description')}>1.000.000đ </span> , áp dụng
                                                kỳ hạn 6/12 tháng và đơn hàng từ 6.000.000đ khi thanh toán qua Home
                                                PayLater
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                {' '}
                                                Giảm trực tiếp 40%, tối đa{' '}
                                                <span className={cx('price-description')}>600.000đ </span> VNĐ khi mở
                                                thẻ TP Bank EVO - (Xem chi tiết)
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                Giảm thêm{' '}
                                                <span className={cx('price-description', 'red')}>5- 10% </span>
                                                <span className={cx('price-description')}>
                                                    cho khách hàng thân thiết khi mua kèm phụ kiện
                                                </span>{' '}
                                                (Áp dụng một số sản phẩm)
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                Giảm ngay{' '}
                                                <span className={cx('price-description', 'red')}>100.000đ</span> Khi Mua
                                                Kèm{' '}
                                                <span className={cx('price-description', 'red')}>
                                                    Apple Watch Series 8 |SE 2022 | Ultra
                                                </span>
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                Giảm ngay{' '}
                                                <span className={cx('price-description', 'red')}>100.000đ</span> Khi Mua
                                                Kèm{' '}
                                                <span className={cx('price-description', 'red')}>
                                                    AirPods 2 | AirPods 3 | AirPods Pro
                                                </span>
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                Hỗ trợ trả góp 0% chỉ cần CCCD gắn chip hoặc 0% qua thẻ tín dụng
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️{' '}
                                            <span>
                                                <span className={cx('price-description')}>Thu cũ đổi mới</span> Thu giá
                                                cao trợ giá đến <span className={cx('price-description')}>95%</span>
                                            </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️ <span>Giảm thêm tối đa 150.000VNĐ khi sử dụng điểm tích lũy</span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️ <span>Tặng cường lực </span>
                                        </p>
                                        <p className={cx('product-description-p')}>
                                            ✔️ <span>Tặng nón bảo hiểm Minh Tuấn</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* PRODUCT BUTTON */}
                            <div className={cx('product-btn')}>
                                <div className={cx('btn-frist')}>
                                    <a href="/cart">
                                        <button className={cx('btn-buy-now')} onClick={() => handleBuyNow()}>
                                            <h3>MUA NGAY</h3>
                                            <p>Giao nhanh từ 2 giờ trong nội thành</p>
                                        </button>
                                    </a>
                                </div>
                                <div className={cx('btn-info')}>
                                    <div className={cx('btn-second')}>
                                        <Link to={`/product/${data.slug}`}>
                                            <button className={cx('btn-add-cart')} onClick={() => handleAddCart()}>
                                                <h3>
                                                    <FontAwesomeIcon icon={faCartPlus} className={cx('cart-plus')} />
                                                    THÊM GIỎ HÀNG
                                                </h3>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className={cx('btn-third')}>
                                        <button className={cx('btn-installment')}>
                                            <h3>MUA TRẢ GÓP</h3>
                                            <p>Xét Duyệt Nhanh Chóng</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* TRADE */}
                        <div className={cx('trade')}>
                            <img
                                src="https://lh3.googleusercontent.com/pw/AIL4fc93vjalvTbWFt4tEQw4ElOqpKuLTqRsJ1KP_uX_ccP5LdafWhAaAVVyFcpWE_24SWlho96gKRRU0YT-Jh0gvNIgrMvgNJQ-0_p9FAxbcp6NOYODvfbRwlJYW3xaK_II6qUHW5BWh2peNUGiTU_DOcsV=w56-h35-s-no?authuser=1"
                                alt="trade"
                            />
                            <Link to="/trade-in">Đổi Cũ Mua Mới {data.name}</Link>
                        </div>
                        {/* END */}
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductInfo;
