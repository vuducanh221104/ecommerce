import styles from './ErrorWarning.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function ErrorWarning({ message = '', icon = faCircleXmark, title = 'ERROR' }) {
    return (
        <div className={cx('wrapper pt-0 pt-lg-0 container')}>
            <div className={cx('content')}>
                <div className={cx('icon-div')}>
                    <FontAwesomeIcon icon={icon} className={cx('icon-block')} />
                </div>
                <h2 className={cx('err-title')}>{title}</h2>
                <h2 className={cx('err-warning-text')}>{message}</h2>
                <h2 className={cx('err-redirect')}>
                    Back To
                    <Link to="/">
                        <span>
                            Home Page
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                        </span>
                    </Link>
                </h2>
            </div>
        </div>
    );
}

export default ErrorWarning;
