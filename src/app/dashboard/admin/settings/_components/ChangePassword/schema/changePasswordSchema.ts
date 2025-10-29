import z from 'zod';

// ✅ Zod schema for password validation
export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Old password must be at least 6 characters long')
      .max(50, 'Password cannot exceed 50 characters'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters long')
      .max(50, 'Password cannot exceed 50 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ✅ Type inference from schema
export type TChangePasswordFormData = z.infer<typeof changePasswordSchema>;
