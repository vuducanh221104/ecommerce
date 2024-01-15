import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { BsTelephone, BsCart, BsHouse } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignIn,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faGear,
    faCoins,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import routesConfig from '~/config/routes';
import Tippy from '@tippyjs/react/headless';
import images from '~/assets/images';
import Search from '../Search';
import HeaderNavSub from '../HeaderNavSub';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState, useEffect } from 'react';
import * as checkTokenServices from '~/services/checkTokenServices';
import { getLocalStorage } from '~/components/EncodeLocalStorage';
import axios from 'axios';
import MiniChat from '~/ComponentPages/MiniChat';
import Cookies from 'js-cookie';
import { useQuantityProductCart } from '~/Context/CartContext/CartContext';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English ',
        children: {
            title: 'language',
            data: [
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vn',
                    title: 'VietNam',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vn',
                    title: 'VietNam',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vn',
                    title: 'VietNam',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vn',
                    title: 'VietNam',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vn',
                    title: 'VietNam',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vn',
                    title: 'VietNam',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vn',
                    title: 'VietNam',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vn',
                    title: 'VietNam',
                },
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help ',
        to: 'feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: ' Keyboard Shortcut ',
    },
];

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'User ',
        to: '/user',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Coins ',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings ',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Signout',
        to: '/logout',
        separate: true,
    },
];

function Header({ login = true }) {
    const { quantityProductInCart, setQuantityProductInCart } = useQuantityProductCart();
    const isAuth = JSON.parse(Cookies.get('isAuth'));
    const token = Cookies.get('token');
    const quantityLS = getLocalStorage('quantityInCart', 'quantityInCart');
    const [image, setImage] = useState(null);

    // HANDLE QUANTITY IN CART ON HEADER
    useEffect(() => {
        setQuantityProductInCart(quantityLS);
        if (!quantityLS) {
            setQuantityProductInCart(0);
        }
    }, []);

    useEffect(() => {
        if (isAuth) {
            const fetchApi = async () => {
                try {
                    const data = await axios.get('http://localhost:4000/api-user/checkusers', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setImage(data.data.avatar);
                } catch (err) {
                    console.log('err at dataId', err);
                }
            };
            fetchApi();
        }
    }, [token]);

    const handleChangeItem = (menuList) => {
        switch (menuList.code) {
            case 'vn':
                return console.log('daylavn');
        }
    };

    return (
        <>
            <header className={cx('wrapper')}>
                {/* MiniChat */}
                <MiniChat />
                {/* Header */}
                <div className={cx('container')}>
                    <div className={cx('row', 'flex-nowrap', 'align-items-center', 'mt-3', 'px-2', 'content-header')}>
                        <div className={cx('col-3', 'col-xl-2 ', 'col-md-2', 'col-lg-2', 'col-sm-2')}>
                            <div className={cx('logo')}>
                                <Link to={routesConfig.user.home} className={cx('logo-link', 'd-inline-block')}>
                                    <img src={images.logoMain} alt="iphoneweb" width="202" height="40" />
                                </Link>
                            </div>
                        </div>
                        <div className={cx('col col-md', 'search-grid')} style={{ maxWidth: '478px' }}>
                            <div className={cx('search')}>
                                <Search />
                            </div>
                        </div>
                        <div className={cx('col-auto')}>
                            <div className={cx('action')}>
                                <div className="row">
                                    {/* HOTLINE */}
                                    <div className={cx('hotline', 'col-auto', '')}>
                                        <BsTelephone className={cx('phone-icon')} />
                                        <div className="hotline-info">
                                            <h3 className={cx('hotline-name')}>HOTLINE</h3>
                                            <p className={cx('hotline-numberphone')}>19003355</p>
                                        </div>
                                    </div>
                                    {/* CART */}
                                    <div className={cx('cart', 'col-auto', '')}>
                                        <Link to="/cart">
                                            <BsCart className={cx('cart-icon')} />
                                            <div className="cart-info">
                                                <h3 className={cx('cart-name')}>GIỎ HÀNG</h3>
                                                <p className={cx('cart-for-you')}>{quantityProductInCart} Sản Phẩm</p>
                                            </div>
                                        </Link>
                                    </div>
                                    {/* HOUSE */}
                                    <div className={cx('house', 'col-auto', '')}>
                                        <Link to="/he-thong-cua-hang">
                                            <BsHouse className={cx('house-icon')} />
                                            <div className="house-info">
                                                <h3 className={cx('house-name')}>HỆ THỐNG</h3>
                                                <p className={cx('house-for-you')}>CỬA HÀNG</p>
                                            </div>
                                        </Link>
                                    </div>
                                    {/* LOGIN/SIGN IN */}

                                    {
                                        <>
                                            {isAuth ? (
                                                <div
                                                    className={cx('img-avt', 'col-auto')}
                                                    style={{ paddingLeft: '35px', marginTop: '-5px' }}
                                                >
                                                    <HeadlessTippy
                                                        interactive
                                                        render={(attrs) => (
                                                            <div
                                                                className={cx('user-wrapper')}
                                                                tabIndex="-1"
                                                                {...attrs}
                                                            >
                                                                <PopperWrapper>
                                                                    {USER_MENU.map((item, index) => (
                                                                        <Link to={item.to}>
                                                                            <span>{item.icon}</span>
                                                                            <p>{item.title}</p>
                                                                        </Link>
                                                                    ))}
                                                                </PopperWrapper>
                                                            </div>
                                                        )}
                                                        trigger="click"
                                                        placement="bottom-start"
                                                        offset={[0, 7]}
                                                    >
                                                        <img
                                                            src={image || images.noImage}
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                borderRadius: '50%',
                                                            }}
                                                        />
                                                    </HeadlessTippy>
                                                </div>
                                            ) : (
                                                // KHI USER LOGIN

                                                <div className={cx('button-authen', 'col-auto', isAuth && 'd-none')}>
                                                    <button className={cx('Signin')}>
                                                        <Link to="/register">Sign in</Link>
                                                    </button>
                                                    <button className={cx('Login')}>
                                                        <Link to="/login">
                                                            Login
                                                            <FontAwesomeIcon
                                                                icon={faSignIn}
                                                                className={cx('icon-login')}
                                                            />
                                                        </Link>
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <HeaderNavSub />
            {login && (
                <div className={cx('content-nav')}>
                    <ul className={cx('content-nav-list')}>
                        <li className={cx('content-nav-item')}>Trang chủ</li>
                        <li className={cx('content-nav-item')}>/ iPhone</li>
                    </ul>
                </div>
            )}
        </>
    );
}
export default Header;
