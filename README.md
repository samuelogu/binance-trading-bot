# Binance Trading Bot

A TypeScript-based trading bot for the Binance cryptocurrency exchange, developed collaboratively to analyze market data, identify trading opportunities, and execute trades based on customizable strategies.

---

## 📖 Table of Contents
1. [Collaboration](#collaboration)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Setup](#setup)
6. [Configuration](#configuration)
7. [Disclaimers](#disclaimers)
8. [Future Enhancements](#future-enhancements)
9. [Notes](#notes)
10. [Contributors](#contributors)

---

## 🤝 Collaboration

This bot is being developed collaboratively by [Samuel Ogu](https://github.com/samuelogu) and OpenAI's ChatGPT. Together, we aim to create a robust and efficient tool for cryptocurrency trading.
- **Samuel**: Repository manager, trading fund provider, and bot tester.
- **ChatGPT**: Code contributor and strategy architect, providing guidance and support for development.

---

## ✨ Features
- **Real-time Market Data**: Fetches and processes live candlestick data from Binance.
- **Technical Analysis**: Includes Moving Averages (MA), Relative Strength Index (RSI), and candlestick pattern detection.
- **Custom Strategies**: Combines indicators and patterns for flexible buy/sell decision-making.
- **Trade Execution**: Executes market orders directly on Binance.
- **Logging**: Tracks bot activity and trading decisions for analysis.
- **Modular Design**: Clear structure for easy updates and extensions.

---

## 📂 Project Structure
```plaintext
binance-trading-bot/
├── src/
│   └── services/
│       ├── binance.ts        # Binance API interaction
│       ├── indicators.ts     # Technical indicator calculations
│       ├── logger.ts         # Logging and debugging utilities
│       ├── patterns.ts       # Candlestick pattern recognition
│       ├── strategies.ts     # Buy/Sell strategy implementation
│       └── trade.ts          # Trade execution logic
│   └── app.ts                # Main entry point for the bot
├── .env                      # Environment variables (API keys, etc.)
├── package.json              # Dependencies and project metadata
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Documentation (this file)
```

---

## 🚀 Getting Started
### Prerequisites
1. Node.js: Ensure you have Node.js (>=16.0.0) installed. 
2. Binance Account: Create an account on Binance and generate API keys. 
3. npm: Install npm or yarn for dependency management.

---

## 🔧 Setup
1. Clone the repository:
```bash
git clone https://github.com/samuelogu/binance-trading-bot.git
cd binance-trading-bot
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables: Create a .env file in the root directory with the following:
```dotenv
BINANCE_API_KEY=your_api_key
BINANCE_API_SECRET=your_api_secret
```
4. Build the project:
```bash
npm run build
```
5. Run the bot:
```bash
npm start
```

---

## ⚙️ Configuration
- **Symbols and Timeframes**: Update the ```app.ts``` file to configure the trading pair and interval:

```typescript
const SYMBOL = 'BTCUSDT';  // Trading pair
const INTERVAL = '1m';     // Options: '1m', '5m', '1h', etc.
```
- **Strategies**: Modify ```src/services/strategies.ts``` to customize buy/sell conditions.

---

## ⚠️ Disclaimers
1. **No Financial Advice**: This bot is a tool for automating cryptocurrency trading strategies. It is provided for educational and experimental purposes only. Use it at your own risk. 
2. **Trading Risks**: Cryptocurrency trading involves significant financial risk. You may lose all or part of your investment. Ensure you fully understand the risks involved and trade responsibly. 
3. **No Guarantees**: There is no guarantee that the bot will perform as intended or generate profits. Past performance is not indicative of future results. 
4. **Binance API Use**: Ensure compliance with Binance’s API usage policies. Unauthorized activity may result in account restrictions or bans. 
5. **Data Security**: Keep your API keys secure and never share them. Misuse of API keys can lead to unauthorized access to your account.

---

## 🌟 Future Enhancements
- Add backtesting capabilities to test strategies on historical data.
- Implement additional indicators like Bollinger Bands or MACD.
- Introduce advanced risk management (stop-loss, take-profit, etc.). 
- Create dashboards for performance monitoring and visualization.

---

## 📝 Notes
- Feedback and contributions are welcome! Create an issue or reach out via the repository to share your ideas or concerns.

--- 

## ✍️ Contributors
- **[Samuel Ogu](https://github.com/samuelogu)**: Trading fund manager and repository maintainer.
- **ChatGPT**: AI contributor for coding and strategic guidance.