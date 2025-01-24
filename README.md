# Roommate Expense Tracker

A web application to simplify expense sharing among roommates. The app tracks expenses, identifies who paid for whom, and calculates how much each person owes or is owed.

## Features

- Add the number of roommates in the household
- Record expenses with details such as date, payer, and beneficiaries
- Automatic calculations to determine balances
- Clear summary of who owes how much to whom
- User-friendly interface for easy navigation and tracking

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)  
  Download from [Node.js Official Website](https://nodejs.org/).  
- **npm** (comes with Node.js) or **yarn** package manager  
  Install Yarn globally if preferred:  
  ```bash
  npm install --global yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd roommate-expense-tracker
```

2. Set up a virtual environment (optional):
```bash
nvm install 16
nvm use 16
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Dependencies
The project uses the following technologies:

- React for the user interface
- Context API or Redux for state management (if applicable)
- Tailwind CSS for styling
- Axios (or another HTTP client, if required)

## Project Structure

```
ai-chat-history/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React context providers
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Utility functions
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Built with React and Next.js
- Styled with Tailwind CSS
