import { DateArg, format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: DateArg<Date>): string => format(date, 'dd MMM yyyy h:mm a');

export const timeAgo = (date: DateArg<Date>): string => formatDistanceToNow(date) + ' ago';
