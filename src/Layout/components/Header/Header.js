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
import Menu from '~/components/Popper/Menu';
import routesConfig from '~/config/routes';
import Tippy from '@tippyjs/react/headless';
import images from '~/assets/images';
import Search from '../Search';
import HeaderNavSub from '../HeaderNavSub';

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
        to: '/@ducanh',
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

function Header() {
    const dataLS = JSON.parse(localStorage.getItem('key'));
    const handleChangeItem = (menuList) => {
        switch (menuList.code) {
            case 'vn':
                return console.log('daylavn');
        }
    };

    const currenUser = false;

    return (
        <>
            <header className={cx('wrapper')}>
                {/* Header */}
                <div className={cx('container-fluid')}>
                    <div className={cx('row', 'flex-nowrap', 'align-items-center', 'mt-3')}>
                        <div className={cx('col-4', 'col-xl-2 ', 'col-md-2', 'col-lg-2', 'col-sm-2')}>
                            <div className={cx('logo')}>
                                <Link to={routesConfig.home} className={cx('logo-link', 'd-inline-block')}>
                                    <img src={images.logoMain} alt="iphoneweb" width="202" height="40" />
                                </Link>
                            </div>
                        </div>
                        <div className={cx('col-6 ', 'col-md-7', 'col-lg-5', 'col-sm-3')}>
                            <div className={cx('search')}>
                                <Search />
                            </div>
                        </div>
                        <div className={cx('col-2', 'col-md-3 ', 'col-lg-7', 'col-sm-3')}>
                            <div className={cx('action')}>
                                {currenUser ? (
                                    <button>true</button>
                                ) : (
                                    <div className="row">
                                        {/* HOTLINE */}
                                        <div className={cx('hotline', 'col-auto', 'px-4')}>
                                            <BsTelephone className={cx('phone-icon')} />
                                            <div className="hotline-info">
                                                <h3 className={cx('hotline-name')}>HOTLINE</h3>
                                                <p className={cx('hotline-numberphone')}>19003355</p>
                                            </div>
                                        </div>
                                        {/* CART */}
                                        <div className={cx('cart', 'col-auto', 'px-4')}>
                                            <Link to="/cart">
                                                <BsCart className={cx('cart-icon')} />
                                                <div className="cart-info">
                                                    <h3 className={cx('cart-name')}>GIỎ HÀNG</h3>
                                                    {dataLS && dataLS ? (
                                                        <p className={cx('cart-for-you')}>{dataLS.length} Sản Phẩm</p>
                                                    ) : (
                                                        <p className={cx('cart-for-you')}>CỦA BẠN</p>
                                                    )}
                                                </div>
                                            </Link>
                                        </div>
                                        {/* HOUSE */}
                                        <div className={cx('house', 'col-auto', 'px-4')}>
                                            <Link to="/kiem-tra-don-hang">
                                                <BsHouse className={cx('house-icon')} />
                                                <div className="house-info">
                                                    <h3 className={cx('house-name')}>HỆ THỐNG</h3>
                                                    <p className={cx('house-for-you')}>CỬA HÀNG</p>
                                                </div>
                                            </Link>
                                        </div>
                                        {/* LOGIN/SIGN IN */}
                                        <div className={cx('button-authen', 'col-auto')}>
                                            <button className={cx('Signin')}>Sign in</button>
                                            <button className={cx('Login')}>
                                                Login
                                                <FontAwesomeIcon icon={faSignIn} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* HeaderNavSub */}
                <HeaderNavSub />
            </header>
            <div className={cx('content-nav')}>
                <ul className={cx('content-nav-list')}>
                    <li className={cx('content-nav-item')}>Trang chủ</li>
                    <li className={cx('content-nav-item')}>/ iPhone</li>
                </ul>
            </div>
        </>
    );
}
export default Header;
