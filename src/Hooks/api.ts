// // src/api.ts
// import axios from 'axios';

// import { BASEAPIURL } from '../Constants/FixValues';

// const api = axios.create({
//   //baseURL: baseURL,
//   baseURL: BASEAPIURL, // Replace with your actual base URL

//   withCredentials: true,

// });
// // Intercept 401 responses and redirect to login
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn('Unauthorized. Redirecting to login...');
//       alert('Unauthorized. Redirecting to login..');
//       //window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
