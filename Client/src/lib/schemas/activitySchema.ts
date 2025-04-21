import { z } from 'zod';

const requiredString = (fieldName: string): z.ZodString =>
  z.string({ required_error: `${fieldName} is required` }).min(1, { message: `${fieldName} is required` });

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  date: z.coerce.date({ message: 'Date is required' }),
  country: requiredString('Country'),
  city: requiredString('City'),
  venue: requiredString('Venue'),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
