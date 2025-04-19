import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'https://cable-network-backend-production.up.railway.app/v1/app',
  //  baseURL: 'https://api.streetmallcommerce.com/v1/app',
  // baseURL: 'http://localhost:8001/v1/app',
});

// axiosInstance.interceptors.response.use(
//   (response) => {

//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = sessionStorage.getItem('refreshToken');

//       if (refreshToken) {
//         try {
//           const response = await axios.post('http://localhost:3000/api/refresh', {
//             refreshToken,
//           });
//           const { accessToken } = response.data.token;

//           sessionStorage.setItem('accessToken', accessToken);
//           axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//           originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//           return axiosInstance(originalRequest);
//         } catch (error) {
//           sessionStorage.removeItem('accessToken');
//           sessionStorage.removeItem('refreshToken');
//           window.location.href = '/login'; // Redirect to login page
//           return Promise.reject(error);
//         }
//       } else {
//         window.location.href = '/login'; // Redirect to login page
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
