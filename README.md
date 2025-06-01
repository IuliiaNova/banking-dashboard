# Banking Dashboard

A modern React-based banking dashboard application built with Vite, TypeScript, and Tailwind CSS. This application provides a user interface for viewing account information, transactions, and managing banking activities.

## Features

- Account Overview
- Transaction History
- Currency Conversion (EUR/USD)
- Responsive Design
- Real-time Data Updates

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Vitest for Testing
- React Hook Form
- Date-fns
- Lucide React Icons

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/IuliiaNova/banking-dashboard.git
cd banking-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests with coverage
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── __tests__/          # Test files
├── app/                # App configuration and global styles
├── entities/           # Domain entities and models
├── features/           # Feature-based modules
│   ├── account/
│   ├── currency/
│   ├── login/
│   └── transactions/
├── pages/             # Page components
├── shared/            # Shared utilities and components
└── widgets/           # Reusable widget components
```

## Testing

The project uses Vitest for testing. Tests are located in the `src/__tests__` directory. Run tests with:

```bash
npm run test
```

For watch mode:
```bash
npm run test -- --watch
```     

### Build

![Build Status](public/assets/build.png)
