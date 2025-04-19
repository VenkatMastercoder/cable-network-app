import axiosInstance from "../../../lib/axiosInstance";

// API call to verify Register OTP
export const verifyOtpApi = async ({ otpId, otpCode }: { otpId: string; otpCode: string }) => {
  const response = await axiosInstance.post('/auth/register/verify-otp', {
    otp_id: otpId,
    otp: otpCode,
  });
  return response.data;
};

// API call to register the user
export const registerUserApi = async (userData: {
  name: string;
  age: string;
  email: string;
  mobile_number: string;
  parent_id: string;
  role: string;
}) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

// API call to resend OTP
export const resendOtpApi = async ({ otpId }: { otpId: string }) => {
  console.log("otpId", otpId);
  const response = await axiosInstance.post('/auth/register/resend-otp', {
    otp_id: otpId,
  });
  return response.data;
};