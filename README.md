
# <a href="https://docs.potionvision.com/frontend-developer-challenge-2025-02"> <img src="public/lovable-uploads/potionLogo.png" alt="Potion Alpha Logo" width="30"/> </a> Potion Alpha Frontend Developer Challenge


![Potion Leaderboard Hero Image](public/lovable-uploads/Potion-Hero.png)

### **Overview & Background**

**About Potion Leaderboard:**

Potion Leaderboard is a gamified platform where every Solana memecoin trader—from beginner to expert—competes, showcases their performance, and wins rewards. The platform’s first MVP includes a public Leaderboards page (with Daily, Weekly, Monthly, and All-Time views) that lists traders’ wallets, performance metrics, profile details, and social connections.

**Challenge Goal:**

Create a responsive, visually compelling Leaderboard page that fetches and displays trader data from an API. This page should mimic the look and feel outlined in our Figma designs and incorporate core UI interactions such as search and filtering.


## 📖 Table of Contents
- [About The Project](#about-the-project)
  - [Key Features](#key-features)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
  - [Core Components](#core-components)
  - [Pages](#pages)
  - [Utilities](#utilities)
- [Features & Usage](#features--usage)
  - [Wallet Connection](#wallet-connection)
  - [Leaderboard Navigation](#leaderboard-navigation)
  - [Trader Profiles](#trader-profiles)
  - [Trade Analytics](#trade-analytics)
- [Testing Guide](#testing-guide)
- [UI Components](#ui-components)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About The Project

> 💡 **Screenshot Suggestion**: Add a screenshot of the main leaderboard page here showing the key UI elements like the leaderboard table, filters, and time frame selector.

Potion Leaderboard revolutionizes how traders track and compare performance in the Solana memecoin ecosystem. This platform provides comprehensive trading metrics, social integration, and competitive features in an intuitive interface.

### Key Features

- 📊 Real-time performance tracking
- 🏆 Daily, weekly, and monthly competitions
- 👥 Detailed trader profiles
- 📱 Fully responsive design
- 🔍 Advanced filtering & search
- 🔗 Social media integration
- 💰 Comprehensive trade analytics

### Built With

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

### Core Components

#### `src/components/`

> 💡 **Screenshot Suggestion**: Add component screenshots in their respective sections to show their appearance and functionality

##### Header (`Header.tsx`)
- Main navigation component
- Handles wallet connection
- Manages X/Twitter integration
- Responsive mobile menu
- Profile management

```typescript
// Key features:
- Wallet connection status management
- Social media integration
- Responsive navigation
- Profile picture display
```

##### FilterBar (`FilterBar.tsx`)
- Time frame selection (Daily/Weekly/Monthly/All-time)
- View mode switching (Traders/Groups)
- Search functionality
- Advanced filtering system

```typescript
// Notable functionality:
- Advanced search capabilities
- Time frame management
- Responsive design adaptations
```

##### LeaderboardTable (`LeaderboardTable.tsx`)
- Displays trader rankings
- Sortable columns
- Performance metrics
- Mobile-responsive layout
- Share functionality

##### Profile Components
- `ProfileHeader.tsx`: Trader identity and social links
- `ProfileStats.tsx`: Performance metrics display
- `TradesSection.tsx`: Detailed trade history
- `TimeFrameSelector.tsx`: Time period filtering

### Pages

#### `src/pages/`

##### Index Page (`Index.tsx`)
- Main leaderboard view
- Handles trader filtering
- Manages view modes
- Implements wallet protection

##### Profile Page (`Profile.tsx`)
- Individual trader profiles
- Trade history
- Performance metrics
- Social integration

### Utilities

#### `src/utils/`
- `format.ts`: Number and address formatting
- `tradeUtils.ts`: Trade calculations and sorting

## 🎮 Features & Usage

### Wallet Connection

To access protected features:

1. Click "Connect Wallet" in the header
2. Select your wallet provider
3. Approve the connection
4. (Optional) Connect X/Twitter account

> 💡 **Screenshot Suggestion**: Add a screenshot of the wallet connection flow

### Leaderboard Navigation

Time Frame Selection:
- Daily (24h performance)
- Weekly (7-day metrics)
- Monthly (30-day stats)
- All-time (Complete history)

Filtering:
1. Click the "Filters" button
2. Adjust parameters:
   - Min/Max followers
   - Win rate threshold
   - Minimum trades
   - PNL requirements

Search:
- Use the search bar for wallet addresses or usernames
- Results update in real-time

### Trader Profiles

Access detailed trader information:

1. Click on any trader row in the leaderboard
2. View comprehensive stats:
   - Win rate
   - Total trades
   - Average position size
   - PNL metrics
3. Explore trade history
4. Connect via social media

> 💡 **Screenshot Suggestion**: Add a screenshot of a trader profile page

### Trade Analytics

Each profile includes:

- ROI calculations
- Win/loss ratios
- Average hold times
- Position sizing metrics
- Trade frequency analysis

## 🧪 Testing Guide

### 1. Wallet Integration
```bash
# Test wallet connection:
1. Click "Connect Wallet"
2. Verify connection status
3. Check profile picture update
4. Test disconnect functionality
```

### 2. Leaderboard Functionality
```bash
# Test sorting:
1. Click column headers
2. Verify sort direction
3. Check data accuracy

# Test filtering:
1. Open filter drawer
2. Apply various combinations
3. Verify results
4. Test reset functionality
```

### 3. Profile Navigation
```bash
# Test profile access:
1. Click trader rows
2. Verify data loading
3. Check social links
4. Test back navigation
```

### 4. Mobile Responsiveness
```bash
# Test on multiple devices:
1. Check table scrolling
2. Verify menu functionality
3. Test filter drawer
4. Verify profile layout
```

## 🎨 UI Components

### Glass Card Design
```typescript
// Styling class for glass effect
className="glass-card rounded-lg border border-white/10 
          hover:border-primary/20 transition-colors"
```

### Responsive Table
```typescript
// Mobile optimization
const isMobile = useIsMobile();
// Conditional rendering based on screen size
```

### Animations
- Fade-in effects
- Hover transitions
- Loading states
- Smooth scrolling

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

> 💡 **Note**: For all screenshots, use high-quality images that clearly demonstrate the feature or component being discussed. Recommended locations are marked with "Screenshot Suggestion" comments throughout the README.
