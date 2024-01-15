import { useNavigate } from 'react-router-dom';
import * as httpRequest from '~/utils/httpRequest';

// PRINT PRODUCT (in ra cac product )
export const product = async () => {
    try {
        const res = await httpRequest.get(`api-product/product`, {});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//PRINT PRODUCT INFOMATION (click vao in ra cac thong tin san pham do)
export const productInfo = async (slug, navigate) => {
    try {
        const res = await httpRequest.get(`api-product/product/${slug}`, {});
        return res.data;
    } catch (error) {
        navigate('/', { replace: true });
        console.log(error);
    }
};

//PRINT PRODUCT-DESCTRIPTIONS (Thong tin san pham)
export const productDescription = async (slug) => {
    try {
        const res = await httpRequest.get(`api-product/product-description/${slug}`, {});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
