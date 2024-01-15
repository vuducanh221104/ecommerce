import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import { useEffect, useState } from 'react';
import SwiperComponent from '~/components/Swiper';
import SwiperImage from '~/components/SwiperImage';
import News from '~/ComponentPages/News';
import axios from 'axios';

const cx = classNames.bind(styles);

function Home() {
    const [dataImageandBox, setDataImageAndBox] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const dataImage = await axios.get('http://localhost:4000/api-image/image/image-theme');
            setDataImageAndBox(dataImage.data);
        };
        fetchApi();
    }, []);

    // BREAKPOINTS SWIPER
    const breakpoints = {
        0: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        765: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        995: {
            slidesPerView: 6,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 7,
            spaceBetween: 10,
        },
    };

    const breakpointsHomeThumb = {
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
    };

    return (
        <>
            {dataImageandBox && (
                <>
                    <SwiperImage data={dataImageandBox.image_home} dataBreakpoints={breakpointsHomeThumb} />
                    <div className={cx('wrapper')}>
                        <div className="container">
                            <div className={cx('image-customer')}>
                                {/* CUSTOMER IMAGE  */}
                                <SwiperImage
                                    data={dataImageandBox.image_customer}
                                    dataBreakpoints={breakpoints}
                                    showImageCustomer={true}
                                    propsColorBtn={'var(--color-hover)'}
                                    backgroundColor={'#f9eae9'}
                                />
                            </div>
                            <div className={cx('wrapper-home-box-product')}>
                                {dataImageandBox.container?.map((item, index) => (
                                    <SwiperComponent key={index} dataImageAndBox={item} />
                                ))}
                            </div>
                            {/* NEWS */}
                            <News />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Home;
