import { format } from "date-fns";

export const getXMonthsAgo = (monthsAgo: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  return format(date, "yyyy-MM-dd");
};
