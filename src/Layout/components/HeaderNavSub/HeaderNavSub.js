import classNames from 'classnames/bind';
import styles from './HeaderNavSub.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imagesHeader from '~/assets/images-header-nav';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderNavSub() {
    return (
        <div className={cx('header-nav')}>
            <div className={cx('header-nav-container', 'container')}>
                <ul className={cx('header-list')}>
                    {/* Iphone */}
                    <li className={cx('header-item')}>
                        <Link to="/??" className={cx('header-link')}>
                            <img src={imagesHeader.iphone} alt="mac" className={cx('header-img')} />
                            <span className={cx('header-name')}> iPhone </span>
                        </Link>
                        <div className={cx('header-navsub')}>
                            <ul className={cx('header-navsub-list')}>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/iphone-14-series" className={cx('header-navsub-link')}>
                                        iPhone 14 Series
                                    </Link>
                                    {/* MENU-MUTILEVEL */}
                                    <div className={cx('menu-mutilevel')}>
                                        <ul className={cx('menu-mutilevel-list')}>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-14-pro-max" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 14 Pro Max
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-14-pro" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 14 Pro
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-14-plus" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 14 Plus
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-14" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 14
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/iphone-13-series" className={cx('header-navsub-link')}>
                                        iPhone 13 Series
                                    </Link>
                                    {/* MENU-MUTILEVEL */}
                                    <div className={cx('menu-mutilevel')}>
                                        <ul className={cx('menu-mutilevel-list')}>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-13-pro-max" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 13 Pro Max
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-13-pro" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 13 Pro
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-13" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 13
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-13-mini" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 13 mini
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/iphone-12-series" className={cx('header-navsub-link')}>
                                        iPhone 12 Series
                                    </Link>
                                    {/* MENU-MUTILEVEL */}
                                    <div className={cx('menu-mutilevel')}>
                                        <ul className={cx('menu-mutilevel-list')}>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-12" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 12
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/iphone-12-mini" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Iphone 12 mini
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/iphone-13-series" className={cx('header-navsub-link')}>
                                        iPhone 11 Series
                                        {/* MENU-MUTILEVEL */}
                                        <div className={cx('menu-mutilevel')}>
                                            <ul className={cx('menu-mutilevel-list')}>
                                                <li className={cx('menu-mutilevel-item')}>
                                                    <Link to="/iphone-11" className={cx('menu-mutilevel-link')}>
                                                        <FontAwesomeIcon
                                                            icon={faCircle}
                                                            className={cx('menu-mutilevel-icon')}
                                                        />
                                                        Iphone 11
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/iphone-se" className={cx('header-navsub-link')}>
                                        iPhone SE 2022
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* IPAD */}
                    <li className={cx('header-item')}>
                        <Link to="/iPad" className={cx('header-link')}>
                            <img src={imagesHeader.ipad} alt="iPad" className={cx('header-img')} />
                            <span className={cx('header-name')}> iPad </span>
                        </Link>
                        <div className={cx('header-navsub')}>
                            <ul className={cx('header-navsub-list')}>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/ipad-pro" className={cx('header-navsub-link')}>
                                        iPad Pro
                                    </Link>
                                    {/* MENU-MUTILEVEL */}
                                    <div className={cx('menu-mutilevel')}>
                                        <ul className={cx('menu-mutilevel-list')}>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/ipad-pro-2021" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    iPad Pro 2021
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/ipad-pro-2022" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    iPad Pro 2022
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/iphone-air" className={cx('header-navsub-link')}>
                                        iPad Air
                                    </Link>
                                    {/* MENU-MUTILEVEL */}
                                    <div className={cx('menu-mutilevel')}>
                                        <ul className={cx('menu-mutilevel-list')}>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/ipad-air-4" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    iPad Air 4
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/ipad-air-5" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    iPad Air 5
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/ipad-10-9-2022" className={cx('header-navsub-link')}>
                                        iPad Gen 10 ("10.9")
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/ipad-10-2" className={cx('header-navsub-link')}>
                                        iPad Gen 9 (10.2")
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/ipad-mini" className={cx('header-navsub-link')}>
                                        iPad mini
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* WATCH */}
                    <li className={cx('header-item')}>
                        <Link to="/iPad" className={cx('header-link')}>
                            <img src={imagesHeader.watch} alt="watch" className={cx('header-img')} />
                            <span className={cx('header-name')}> Watch </span>
                        </Link>
                        <div className={cx('header-navsub')}>
                            <ul className={cx('header-navsub-list')}>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-watch-ultra" className={cx('header-navsub-link')}>
                                        Apple Watch Ultra
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-watch-s7" className={cx('header-navsub-link')}>
                                        Apple Watch S7
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-watch-s6" className={cx('header-navsub-link')}>
                                        Apple Watch S6
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-watch-se" className={cx('header-navsub-link')}>
                                        Apple Watch SE
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-watch-s8" className={cx('header-navsub-link')}>
                                        Apple Watch S8
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* MAC */}
                    <li className={cx('header-item')}>
                        <Link to="/mac" className={cx('header-link')}>
                            <img src={imagesHeader.macbook} alt="mac" className={cx('header-img')} />
                            <span className={cx('header-name')}> Mac </span>
                        </Link>
                        <div className={cx('header-navsub')}>
                            <ul className={cx('header-navsub-list')}>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/macbook" className={cx('header-navsub-link')}>
                                        MacBook
                                    </Link>
                                    {/* MENU-MUTILEVEL */}
                                    <div className={cx('menu-mutilevel')}>
                                        <ul className={cx('menu-mutilevel-list')}>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/macbook-pro" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    MacBook Pro
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/macbook-air" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    MacBook Air
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/macbook-air-15" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    MacBook Air 15"
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/mac-studio" className={cx('header-navsub-link')}>
                                        Mac Studio
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/imac" className={cx('header-navsub-link')}>
                                        iMac
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/mac-mini" className={cx('header-navsub-link')}>
                                        Mac mini
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-tv" className={cx('header-navsub-link')}>
                                        Apple TV
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* LAPTOP */}
                    <li className={cx('header-item')}>
                        <Link to="/laptop" className={cx('header-link')}>
                            <img src={imagesHeader.laptop} alt="laptop" className={cx('header-img')} />
                            <span className={cx('header-name')}> Laptop </span>
                        </Link>
                    </li>
                    {/* SAMSUNG */}
                    <li className={cx('header-item')}>
                        <Link to="/samsung" className={cx('header-link')}>
                            <img src={imagesHeader.samsung} alt="samsung" className={cx('header-img')} />
                            <span className={cx('header-name')}> Samsung </span>
                        </Link>
                    </li>
                    {/* AIRPODS */}
                    <li className={cx('header-item')}>
                        <Link to="/airpods" className={cx('header-link')}>
                            <img src={imagesHeader.airpod} alt="airpods" className={cx('header-img')} />
                            <span className={cx('header-name')}> AirPods </span>
                        </Link>
                    </li>
                    {/* MAC */}
                    <li className={cx('header-item')}>
                        <Link to="/am-thanh" className={cx('header-link')}>
                            <img src={imagesHeader.headVolume} alt="am-thanh" className={cx('header-img')} />
                            <span className={cx('header-name')}> Âm Thanh </span>
                        </Link>
                        <div className={cx('header-navsub')}>
                            <ul className={cx('header-navsub-list')}>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/loa" className={cx('header-navsub-link')}>
                                        Loa
                                    </Link>
                                    {/* MENU-MUTILEVEL */}
                                    <div className={cx('menu-mutilevel')}>
                                        <ul className={cx('menu-mutilevel-list')}>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-marshall" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa Marshall
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-bose" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa Bose
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-bang-olufsen" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa Bang & Olufsen
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-harman-kardon" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa Harman/Kardon
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-jbl" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa JBL
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-samsung" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa Samsung
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-lg" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa LG
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-sony" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa Sony
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-fender" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa Fender
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/loa-anker" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Loa Anker
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/tai-nghe" className={cx('header-navsub-link')}>
                                        Tai nghe
                                    </Link>
                                    {/* MENU-MUTILEVEL */}
                                    <div className={cx('menu-mutilevel')}>
                                        <ul className={cx('menu-mutilevel-list')}>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/tai-nghe-apple" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe Apple
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/tai-nghe-samsung" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe Samsung
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/tai-nghe-marshall" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe Marshall
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/tai-nghe-bose" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe Bose
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/tai-nghe-b-o" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe B&O
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/tai-nghe-jbl" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe JBL
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/tai-nghe-lg" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe LG
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="tai-nghe-sennheiser" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe Sennheiser
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/tai-nghe-sony" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe Sony
                                                </Link>
                                            </li>
                                            <li className={cx('menu-mutilevel-item')}>
                                                <Link to="/tai-nghe-shoks" className={cx('menu-mutilevel-link')}>
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                        className={cx('menu-mutilevel-icon')}
                                                    />
                                                    Tai nghe Shokz
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* PHỤ KIỆN */}
                    <li className={cx('header-item')}>
                        <Link to="/phu-kien" className={cx('header-link')}>
                            <img src={imagesHeader.phuKien} alt="phu-kien" className={cx('header-img')} />
                            <span className={cx('header-name')}> Phụ Kiện </span>
                        </Link>
                        <div className={cx('header-navsub')}>
                            <ul className={cx('header-navsub-list')}>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/phu-kien-apple" className={cx('header-navsub-link')}>
                                        Phụ kiện Apple
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/phu-kien-samsung" className={cx('header-navsub-link')}>
                                        Phụ kiện Samsung
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/coc-cap-sac" className={cx('header-navsub-link')}>
                                        Cốc - Cáp
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/sac-du-phong" className={cx('header-navsub-link')}>
                                        Sạc dự phòng
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/bao-da-op-lung" className={cx('header-navsub-link')}>
                                        Bao da - Ốp lưng
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/dan-cuong-luc" className={cx('header-navsub-link')}>
                                        Dán cường lực
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/phu-kien-macbook" className={cx('header-navsub-link')}>
                                        Phụ kiện MacBook
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/mouse" className={cx('header-navsub-link')}>
                                        Bàn phím - Chuột
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="balo-tui-chong-shock" className={cx('header-navsub-link')}>
                                        Balo - Túi chống shock
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/microsoft-office" className={cx('header-navsub-link')}>
                                        Gói Microsoft Office
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* MÁY CŨ */}
                    <li className={cx('header-item')}>
                        <Link to="/may-cu-like-new" className={cx('header-link')}>
                            <img src={imagesHeader.phoneUsed} alt="May-Cu" className={cx('header-img')} />
                            <span className={cx('header-name')}> Máy cũ </span>
                        </Link>
                        <div className={cx('header-navsub')}>
                            <ul className={cx('header-navsub-list')}>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-watch-ultra" className={cx('header-navsub-link')}>
                                        iPhone
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-watch-s7" className={cx('header-navsub-link')}>
                                        Airpods
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-watch-s6" className={cx('header-navsub-link')}>
                                        Mac
                                    </Link>
                                </li>
                                <li className={cx('header-navsub-item')}>
                                    <Link to="/apple-watch-se" className={cx('header-navsub-link')}>
                                        Magic Mouse
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* Thu Cũ */}
                    <li className={cx('header-item')}>
                        <Link to="/trade-in" className={cx('header-link')}>
                            <img src={imagesHeader.exchangePhone} alt="Trade-In" className={cx('header-img')} />
                            <span className={cx('header-name')}> Thu Cũ </span>
                        </Link>
                    </li>
                    {/* KÈO THƠM */}
                    <li className={cx('header-item')}>
                        <Link to="/keo-thom" className={cx('header-link')}>
                            <img src={imagesHeader.saleGood} alt="KeoThom" className={cx('header-img')} />
                            <span className={cx('header-name')}>Kèo Thơm </span>
                        </Link>
                    </li>
                    {/* TIN TỨC */}
                    <li className={cx('header-item')}>
                        <Link to="/tin-tuc" className={cx('header-link')}>
                            <img src={imagesHeader.news} alt="KeoThom" className={cx('header-img')} />
                            <span className={cx('header-name')}>Tin tức </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HeaderNavSub;
