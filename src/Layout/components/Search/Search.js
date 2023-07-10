import { faCircleXmark, faL, faLeaf, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import * as searchServices from '~/services/searchServices';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import AccountItemMap from './AccountItemMap';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setshowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);
    const nameRef = useRef();
    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }

        setLoading(true);
        const fetchApi = async () => {
            const result = await searchServices.search(debounced);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        nameRef.current.focus();
    };

    const handleOutside = () => {
        setshowResult(false);
    };
    const onChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleFocus = () => {
        setshowResult(true);
    };
    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <AccountItemMap searchResult={searchResult} />
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleOutside}
            >
                <div className={cx('search')}>
                    <input
                        ref={nameRef}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={onChangeInput}
                        onFocus={handleFocus}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('sreach-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
