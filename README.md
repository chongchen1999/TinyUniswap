# TinyUniswap

A web3 user interface for interacting with Uniswap-style smart contracts, allowing users to manage liquidity pools and perform token operations through an intuitive interface.

## 🌟 Features

- **Pool Management**: Select and interact with different liquidity pools
- **Token Operations**: Deposit, redeem, and swap tokens with real-time pricing
- **Visual Analytics**: 
  - Real-time reserves curve visualization
  - Historical swap execution price charts
- **Smart Contract Integration**: Fully deployed and verified on Sepolia testnet
- **Responsive Design**: Works across desktop and mobile devices

## 📋 Prerequisites

- Node.js (v16+)
- Yarn package manager
- MetaMask or similar Web3 wallet

## 🚀 Quick Start

Clone the repository and install dependencies:

```bash
git clone https://github.com/chongchen1999/TinyUniswap.git
cd TinyUniswap
yarn install
```

### Local Development

Run a local blockchain:
```bash
yarn chain
```

Deploy the contracts:
```bash
yarn deploy --reset
```

Start the frontend application:
```bash
yarn start
```

Visit `http://localhost:3000` in your browser to use the application.

## 🔄 Smart Contracts

All contracts are deployed and verified on the Sepolia testnet:

| Contract | Address |
|----------|---------|
| TokenA | `0xB667f5e8171468F12F47eF7E03C76F5594F33248` |
| TokenB | `0xC215279133800AFca77eF50C6651db656831138e` |
| TokenATokenBPool | `0x117F180f4bB2235c075b4a3FB5Dc5ff72d74A739` |

### Verification

Contracts were verified using:
```bash
yarn verify --network sepolia
```

## 🌐 Live Demo

The application is deployed and accessible at:
[https://tiny-uniswap-9ohnriq03-chong-chens-projects.vercel.app/](https://tiny-uniswap-9ohnriq03-chong-chens-projects.vercel.app/)

## 📹 Video Walkthrough

Watch a demonstration of the application's functionality:
[https://youtu.be/6EZNUZK5jOg](https://youtu.be/6EZNUZK5jOg)

## 📁 Project Structure

```
TinyUniswap/
├── contracts/         # Smart contract Solidity files
├── deploy/            # Deployment scripts
├── public/            # Static assets
├── src/
│   ├── components/    # React UI components
│   ├── hooks/         # Custom React hooks for web3 interaction
│   ├── pages/         # Page components and routing
│   └── services/      # Services for contract interaction
├── hardhat.config.js  # Hardhat configuration
└── package.json       # Project dependencies
```

## 🛠️ Technologies Used

- **Frontend**: React.js, ethers.js, Web3Modal
- **Smart Contracts**: Solidity, Hardhat
- **Deployment**: Vercel, Sepolia testnet
- **Visualization**: D3.js, Chart.js

## 🧪 Testing

Run the test suite:
```bash
yarn test
```

Run contract tests specifically:
```bash
yarn test:contracts
```

## 📧 Contact

Chong Chen - [GitHub Profile](https://github.com/chongchen1999)

Project Link: [https://github.com/chongchen1999/TinyUniswap](https://github.com/chongchen1999/TinyUniswap)