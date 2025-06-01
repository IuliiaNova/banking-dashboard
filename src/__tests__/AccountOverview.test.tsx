import { render, screen, fireEvent } from "@testing-library/react";
import { useTransactions } from "../features/transactions/store/transactions.context";
import { AccountOverview } from "../features/account/components/AccountOverview";
import { vi } from "vitest";

// Mock del hook useTransactions
vi.mock("../features/transactions/store/transactions.context", () => ({
  useTransactions: vi.fn(),
}));

// Carga mock de transacciones (JSON)
const mockTransactions = (await import('../features/transactions/mock/transactions.json')).default;

describe("<AccountOverview />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders skeletons when loading is pending", () => {
    (useTransactions as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { transactions: [], loading: "pending" },
    });

    render(<AccountOverview />);

    expect(screen.getByRole("region")).toBeInTheDocument();
    expect(screen.getAllByRole("presentation").length).toBeGreaterThan(0);
    expect(screen.queryByText(/account overview/i)).not.toBeInTheDocument();
  });

  it("renders title and currency toggle in EUR by default", () => {
    (useTransactions as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { transactions: mockTransactions, loading: "success" },
    });

    render(<AccountOverview />);

    expect(screen.getByText("Account Overview")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /euro/i })).toBeInTheDocument();
  });

  it("toggles currency between EUR and USD", () => {
    (useTransactions as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { transactions: mockTransactions, loading: "success" },
    });

    render(<AccountOverview />);
    const toggleBtn = screen.getByRole("button", { name: /euro/i });

    fireEvent.click(toggleBtn);
    expect(screen.getByRole("button", { name: /dollar/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /dollar/i }));
    expect(screen.getByRole("button", { name: /euro/i })).toBeInTheDocument();
  });

  it("shows current month by default, and toggles to total view", () => {
    (useTransactions as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { transactions: mockTransactions, loading: "success" },
    });

    render(<AccountOverview />);
    expect(screen.getByText("Current month")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("shows correct balance, incomes and expenses for current month in EUR", () => {
    (useTransactions as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { transactions: mockTransactions, loading: "success" },
    });

    render(<AccountOverview />);

    expect(screen.getByTestId("incomes")).toHaveTextContent("0,00 €");
    expect(screen.getByTestId("expenses")).toHaveTextContent("0,00 €");
    expect(screen.getByTestId("balance")).toHaveTextContent("8.901,53 €");
    
  });
});
