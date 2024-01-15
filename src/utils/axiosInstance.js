import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:4000', // Thay đổi URL theo cấu hình của bạn
    timeout: 5000, // Thời gian chờ tối đa cho mỗi yêu cầu
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là do hết hạn token và chưa refresh token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get('refreshToken');
                const response = await axios.post('http://localhost:4000/api-user/refresh-token', {
                    refreshToken,
                });

                if (response.status === 200) {
                    const { accessToken, newRefreshToken } = response.data;
                    Cookies.set('accessToken', accessToken);
                    Cookies.set('refreshToken', newRefreshToken);

                    // Cập nhật access token cho instance và thực hiện lại yêu cầu gốc
                    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    return instance(originalRequest);
                }
            } catch (refreshError) {
                // Xử lý lỗi khi refresh token cũng thất bại
                console.error('Error refreshing token:', refreshError);
                // Đăng xuất hoặc xử lý lỗi theo ý muốn
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                window.location.reload(); // Hoặc thực hiện điều hướng tới trang đăng nhập
            }
        }

        // Nếu không phải lỗi do hết hạn token hoặc refresh token cũng thất bại
        return Promise.reject(error);
    },
);

export default instance;
