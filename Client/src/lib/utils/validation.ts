import { z } from 'zod';

export const requiredString = (fieldName: string): z.ZodString =>
  z.string({ required_error: `${fieldName} is required` }).min(1, { message: `${fieldName} is required` });
