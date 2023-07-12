import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import CardProduct from '~/components/CardProduct';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className="wrapper">
            <CardProduct />
        </div>
    );
}

export default Home;
