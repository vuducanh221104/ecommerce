import styles from './ProductBox.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductBox({ dataImage, dataTitle, dataLink, propsBgColor = '#fff', slug }) {
    // Check if slug relative with category show backgroundColor
    const isSlugMatch = slug === dataLink;

    return (
        <div className={cx('product-box-card')}>
            <Link to={`/${dataLink}`}>
                <div className={cx('box-card-item', 'm-0 text-center d-block"')}>
                    <div
                        className={cx('box-card-image')}
                        style={{ backgroundColor: isSlugMatch ? 'var(--color-hover)' : propsBgColor }}
                    >
                        <img src={dataImage} alt="box-card" />
                    </div>
                    <p className={cx('box-card-title')}>{dataTitle}</p>
                </div>
            </Link>
        </div>
    );
}

export default ProductBox;
