import * as httpRequest from '~/utils/httpRequest';

// Search Product
export const productSearch = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get(`api-product/product/search`, {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
