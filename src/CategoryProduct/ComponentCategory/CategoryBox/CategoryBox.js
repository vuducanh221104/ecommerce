import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductBox } from '~/components/ProductBox';

import styles from './CategoryBox.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function CategoryBox({ slugParams }) {
    const [data, setData] = useState([]);
    const [parent, setParent] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await axios.get(`http://localhost:4000/api-image/image/image-category-box/${slugParams}`);
            try {
                // If data >1 ,it is a Main Slug (ex:Iphone ,Ipad)
                if (response.data.length > 1) {
                    setData(response.data);
                    setParent(true);
                } else {
                    setData(response.data[0].box_product);
                    setParent(false);
                }
            } catch (err) {}
        };
        fetchApi();
    }, [slugParams]);

    return (
        <>
            {data && (
                <div className={cx('wrapper')}>
                    {parent
                        ? data.map((item, index) => (
                              // If Category Main (ex:iphone,ipad)
                              <>
                                  <ProductBox
                                      dataTitle={item.category_name}
                                      dataImage={item.category_image}
                                      dataLink={item.category_slug}
                                      propsBgColor={'#ddd'}
                                      slug={slugParams}
                                  />
                              </>
                          ))
                        : data.map((item, index) => (
                              // IF Category normal (ex:iphone 14 pro max)
                              <>
                                  <ProductBox
                                      dataTitle={item.box_product_name}
                                      dataImage={item.box_product_image}
                                      dataLink={item.box_product_slug}
                                      propsBgColor={'#ddd'}
                                      slug={slugParams}
                                  />
                              </>
                          ))}
                </div>
            )}
        </>
    );
}

export default CategoryBox;
