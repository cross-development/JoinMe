import { z } from 'zod';

import { requiredString } from '@/lib/utils/validation';

export const editProfileSchema = z.object({
  displayName: requiredString('Display Name'),
  bio: z.string().optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
