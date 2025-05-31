import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    return isToday ? "Today" : format(date, "MMM dd", { locale: enUS });
  };