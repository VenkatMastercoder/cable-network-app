// Auth Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `/auth/login`,
  REGISTER: `/auth/register`,
  VERIFY_OTP: `/auth/verify-otp`,
  RESEND_OTP: `/auth/resend-otp`,
};

// User Endpoints
export const USER_ENDPOINTS = {
  GET_USER_PROFILE: (userId: string) => `/users/${userId}`,
  UPDATE_USER_PROFILE: (userId: string) => `/users/${userId}`,
  REQUEST_DUMMY_IDS: `/users/request-dummy-ids`,
  REQUEST_DUMMY_IDS_BY_USER: (userId: string) => `/users/request-dummy-ids/${userId}`,
};