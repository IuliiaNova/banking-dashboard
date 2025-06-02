import {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    format,
    addDays,
    isWithinInterval,
    parseISO,
    isSameDay,
  } from "date-fns";
  import type { Transaction } from "../../../entities/models/transactions";
  import type { ChartDataPoint } from "../components/Chart";
  
  function getDaysArray(start: Date, end: Date) {
    let arr = [];
    let dt = start;
    while (dt <= end) {
      arr.push(dt);
      dt = addDays(dt, 1);
    }
    return arr;
  }
  
  export function prepareChartData(transactions: Transaction[], period: string): ChartDataPoint[] {
    const today = new Date();
    const range =
      period === "week"
        ? [
            startOfWeek(today, { weekStartsOn: 1 }),
            endOfWeek(today, { weekStartsOn: 1 }),
          ]
        : [startOfMonth(today), endOfMonth(today)];
  
    const days = getDaysArray(range[0], range[1]);
    let data = days.map((date) => ({
      label: period === "week" ? format(date, "EEE") : format(date, "dd MMM"),
      date: format(date, "yyyy-MM-dd"),
      income: 0,
      expense: 0,
    }));
  
    transactions.forEach((t: Transaction) => {
      const tDate = parseISO(t.date);
      const idx = data.findIndex((d) => isSameDay(tDate, parseISO(d.date)));
      if (
        isWithinInterval(tDate, { start: range[0], end: range[1] }) &&
        idx !== -1
      ) {
        if (t.type === "Deposit") data[idx].income += t.amount;
        else data[idx].expense += Math.abs(t.amount);
      }
    });
  
    return data;
  }
  