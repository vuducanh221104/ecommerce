import * as httpRequest from '~/utils/httpRequest';

export const getUserServices = async ({ page, prePage }) => {
    try {
        const res = await httpRequest.get(`users/suggested`, {
            params: {
                page: page,
                per_page: prePage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
