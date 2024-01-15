import classNames from 'classnames/bind';
import styles from './IconPrev.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function IconPrev({ urlPrev }) {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper-icon')}>
            <FontAwesomeIcon
                icon={faArrowLeft}
                className={cx('icon-prev')}
                onClick={() => {
                    navigate(urlPrev);
                }}
            />
        </div>
    );
}

export default IconPrev;
