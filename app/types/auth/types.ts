import * as z from 'zod';
import { OtpResendSchema, OtpVerificationSchema, RegisterUserSchema, signInSchema } from './schema';

export type OtpVerificationValues = z.infer<typeof OtpVerificationSchema>;
export type OtpResendValues = z.infer<typeof OtpResendSchema>;
export type RegisterUserValues = z.infer<typeof RegisterUserSchema>;
export type LoginUserValues = z.infer<typeof signInSchema>