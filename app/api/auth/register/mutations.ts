import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi, resendOtpApi, registerUserApi } from "./queries";
import { OtpResendValues, OtpVerificationValues, RegisterUserValues } from "../../../types/auth/types";

// Mutation for verifying OTP
export function useVerifyOtpMutation() {
  return useMutation<any, Error, OtpVerificationValues>({
    mutationFn: (data: OtpVerificationValues) => verifyOtpApi(data),
    onSuccess: (data) => {},
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

// Mutation for Register User
export function useRegisterUserMutation() {
  return useMutation<any, Error, RegisterUserValues>({
    mutationFn: (data: RegisterUserValues) => registerUserApi(data),
    onSuccess: (data) => {},
    onError: (error: Error) => {},
  });
}