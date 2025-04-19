import { useMutation } from "@tanstack/react-query";
import {
  verifyOtpApi,
  resendOtpApi,
  loginUserApi,
  validateReferralIdApi,
  sendOtpApi,
} from "./queries";
import { LoginUserValues, OtpResendValues, OtpVerificationValues } from "../../../types/auth/types";
import useUserStore from "../../../store/useStore";

// Mutation for verifying OTP
export function useVerifyOtpMutation() {

  const setUser = useUserStore((state: any) => state.setUser);
  const setTokens = useUserStore((state: any) => state.setTokens);

  return useMutation<any, Error, OtpVerificationValues>({
    mutationFn: (data: OtpVerificationValues) => verifyOtpApi(data),
    onSuccess: (data) => {
      setUser({
        user_id: data.data.user_id,
        account_no: data.data.account_no,
        full_name: data.data.full_name,
        email_id: data.data.email_id,
        mobile_no: data.data.mobile_no,
        communication_address: data.data.communication_address,
        service_address: data.data.service_address,
        role: data.data.role,
        plan_id: data.data.plan_id,
        company_id: data.data.company_id,
      });
      setTokens({ token_data: data.data.token_data });
    },
    onError: (error: Error) => {},
  });
}

// Mutation for resending OTP
export function useResendOtpMutation() {
  return useMutation<any, Error, OtpResendValues>({
    mutationFn: (data: OtpResendValues) => resendOtpApi(data),
    onSuccess: (data) => {},
    onError: (error: Error) => {},
  });
}

// Mutation for Login
export function useLoginUserMutation() {
  return useMutation<any, Error, LoginUserValues>({
    mutationFn: (data: LoginUserValues) => loginUserApi(data.mobile_number),
    onSuccess: (data) => {},
    onError: (error: Error) => {},
  });
}

export const useValidateReferralIdMutation = () => {
  return useMutation({
    mutationFn: (referralId: string) => validateReferralIdApi(referralId),
    onSuccess: (data) => {},
    onError: (error: Error) => {},
  });
};

// Mutation to send OTP
export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn:(data:any) => sendOtpApi(data),
    onSuccess: (data) => {},
    onError: (error: Error) => {},
  });
};