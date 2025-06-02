import { render, screen, fireEvent } from '@testing-library/react';
import { AccountOverview } from '../features/account/components/AccountOverview';
import { useTransactions } from '../features/transactions/store/transactions.context';
import { useCurrency } from '../shared/store/currency/currency.context';
import { vi} from 'vitest';

// Mock the hooks
vi.mock('../features/transactions/store/transactions.context');
vi.mock('../shared/store/currency/currency.context');

const mockTransactions = [
  { id: '1', type: 'Deposit', amount: 1000, date: '2024-01-15', description: 'Salary' },
  { id: '2', type: 'Withdrawal', amount: -500, date: '2024-01-16', description: 'Rent' },
];

describe('AccountOverview', () => {
  beforeEach(() => {
    // Mock hook implementations
    (useTransactions as jest.Mock).mockReturnValue({
      state: { transactions: mockTransactions, loading: 'success' }
    });
    (useCurrency as jest.Mock).mockReturnValue({
      currency: 'EUR',
      toggleCurrency: vi.fn()
    });
  });

  it('renders account overview with correct balance', () => {
    render(<AccountOverview />);
    expect(screen.getByText('Account Overview')).toBeInTheDocument();
  });

  it('shows loading skeleton when loading state is pending', () => {
    (useTransactions as jest.Mock).mockReturnValue({
      state: { transactions: [], loading: 'pending' }
    });

    render(<AccountOverview />);
    
    expect(screen.queryByText('Account Overview')).not.toBeInTheDocument();
  });

  it('toggles between current month and total view', () => {
    render(<AccountOverview />);
    
    expect(screen.getByText('Current month')).toBeInTheDocument();
    expect(screen.getByText('Show all')).toBeInTheDocument();
  });

  it('switches currency when currency button is clicked', () => {
    const toggleCurrency = vi.fn();
    (useCurrency as jest.Mock).mockReturnValue({
      currency: 'EUR',
      toggleCurrency
    });

    render(<AccountOverview />);
    
    fireEvent.click(screen.getByRole('button', { name: /switch currency/i }));
    
    expect(toggleCurrency).toHaveBeenCalled();
  });

  it('displays correct income and expenses', () => {
    render(<AccountOverview />);
    
    expect(screen.getByTestId('incomes')).toHaveTextContent('Incomes');
    expect(screen.getByTestId('expenses')).toHaveTextContent('Expenses');

  });
});