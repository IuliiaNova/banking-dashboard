import { describe, it, expect } from 'vitest';

const exchangeRate = 1.1;

const convertValue = (currency: string | number, value: number) => {
  if (currency === "USD") {
    return value * exchangeRate;
  }
  return value;
};

const formatCurrency = (value: number, currency: string = "EUR") =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(value);

describe('convertValue', () => {
  it('returns same value for EUR', () => {
    expect(convertValue("EUR", 100)).toBe(100);
  });

  it('converts value to USD using exchange rate', () => {
    expect(convertValue("USD", 100)).toBeCloseTo(110);
  });

  it('works with currency code as number (no conversion)', () => {
    expect(convertValue(123, 100)).toBe(100);
  });
});

describe('formatCurrency', () => {
  it('formats EUR correctly (de-DE locale)', () => {
    // Puede salir "100,00 €" o similar, según el entorno, así que usa regex
    expect(formatCurrency(100)).toMatch(/100,00/);
    expect(formatCurrency(100)).toContain("€");
  });

  it('formats USD correctly (de-DE locale)', () => {
    expect(formatCurrency(100, "USD")).toMatch(/100,00/);
    expect(formatCurrency(100, "USD")).toContain("$");
  });

  it('formats negative values', () => {
    expect(formatCurrency(-50, "EUR")).toContain("-");
    expect(formatCurrency(-50, "EUR")).toContain("€");
  });
});
