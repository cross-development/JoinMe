import { DateArg, format } from 'date-fns';

export const formatDate = (date: DateArg<Date>): string => format(date, 'dd MMM yyyy h:mm a');
