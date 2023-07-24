import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import CardProduct from '~/components/CardProduct';
import { useEffect, useState } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);
function Home() {
    const [data, setData] = useState();
    useEffect(() => {
        axios.get('http://localhost:4000/api/product').then((data) => setData(data.data));
    }, []);

    return (
        <>
            {data && (
                <div className={cx('wrapper')}>
                    <div className={cx('container-fluid')}>
                        <div className="row row-cols-2 row-cols-sm-4 row-cols-lg-5 row-cols-xl-5 product__container">
                            {data.map((item, index) => (
                                <div className="col proitem mt-4">
                                    <CardProduct key={index} data={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
