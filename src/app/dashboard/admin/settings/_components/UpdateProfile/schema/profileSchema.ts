import z from 'zod';

// ✅ Zod Schema with file validation
export const profileSchema = z.object({
  fullname: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  photo: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: 'Photo must be a valid file',
    })
    .refine((file) => !file || file.size <= 1024 * 1024, {
      message: 'Image must be less than 1 MB',
    }),
});

export type TProfileFormData = z.infer<typeof profileSchema>;
