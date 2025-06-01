
import { render, screen, fireEvent } from "@testing-library/react";
import { CurrencyProvider } from "../shared/store/currency/currency.provider";
import { useCurrency } from "../shared/store/currency/currency.context";

const TestComponent = () => {
  const { currency, toggleCurrency } = useCurrency();
  return (
    <div>
      <span data-testid="currency">{currency}</span>
      <button onClick={toggleCurrency}>Toggle Currency</button>
    </div>
  );
};

describe("CurrencyProvider", () => {
  it("togglea la moneda entre EUR y USD", () => {
    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    );

    expect(screen.getByTestId("currency").textContent).toBe("EUR");

    fireEvent.click(screen.getByText("Toggle Currency"));
    expect(screen.getByTestId("currency").textContent).toBe("USD");

    fireEvent.click(screen.getByText("Toggle Currency"));
    expect(screen.getByTestId("currency").textContent).toBe("EUR");
  });
});
