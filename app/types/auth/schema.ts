import * as z from 'zod';

export const OtpVerificationSchema = z.object({
  otpId: z.string(),
  otpCode: z.string().min(4, "OTP must be at least 4 characters long"),
});

export const OtpResendSchema = z.object({
  otpId: z.string(),
});

export const RegisterUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age must be a positive number"),
  email: z.string().email("Invalid email format"),
  mobile_number: z.string().min(10, "Mobile number must be at least 10 digits"),
  parent_id: z.string().min(1, "Parent ID is required"),
  role: z.string()
});

export const signInSchema = z.object({
  mobile_number: z.string().regex(/^\d{10}$/, "Invalid phone number"),
});

// z.enum(['CUSTOMER','ZONAL','FRANCHISE_PARTNER','DISTRIBUTOR'])