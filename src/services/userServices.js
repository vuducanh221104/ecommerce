import * as httpRequest from '~/utils/httpRequest';

export const getUser = async (id) => {
    try {
        const res = await httpRequest.get(`api-user/users/${id}`, {});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// export const loginUser = async (values) => {
//     try {
//         const res = await httpRequest.post(`api-user/login`, {

//         });
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// };
