import axiosInstance from "../../../lib/axiosInstance";

// API call to Send OTP for Login
export const sendOtpApi = async ({mobile_number}: {mobile_number:string}) => {
  const response = await axiosInstance.post('/auth/send-otp', { mobile_number });
  return response.data;
};

// API call to verify Login OTP
export const verifyOtpApi = async ({ otpId, otpCode }: { otpId: string; otpCode: string }) => {
  const response = await axiosInstance.post('/auth/verify-otp', {
    otp_id: otpId,
    otp: otpCode,
  });
  return response.data;
};

// API call to resend Login OTP
export const resendOtpApi = async ({ otpId }: { otpId: string }) => {
  const response = await axiosInstance.post('/auth/resend-otp', {
    otp_id: otpId,
  });
  return response.data;
};

// API call to Login
export const loginUserApi = async (mobile_number: string) => {
  const response = await axiosInstance.post('/auth/login', { mobile_number });
  return response.data;
};

// API call to Validate Referral
export const validateReferralIdApi = async (referralId: string) => {
  const response = await axiosInstance.get(`/auth/validate/user/${referralId}`);
  return response.data;
};