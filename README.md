
# Solana Trading Analytics Dashboard

A real-time analytics dashboard for tracking and analyzing Solana trading activities. The application provides detailed insights into trading patterns, performance metrics, and trader profiles.

## Features

- **Trader Profiles**: Detailed trader information with X integration and wallet details
- **Trade Analytics**: Comprehensive trade history with key metrics like ROI, PNL, and win rates
- **Mobile Responsive**: Fully responsive design that works across all devices
- **Deep Integration**: 
  - X App deep linking for mobile devices
  - Solscan integration for transaction verification
  - Real-time data updates

## Design Decisions

### 1. User Interface
- Implemented a dark theme for better visibility of financial data
- Used glass-card design for important metrics to create visual hierarchy
- Responsive design with mobile-first approach
- Collapsible columns on mobile for better data presentation

### 2. Performance
- Implemented efficient data formatting utilities
- Used optimized image loading for trader profiles
- Responsive table design with horizontal scrolling on mobile

### 3. Integration Points
- X/Twitter deep linking for both iOS and Android
- Solscan integration for transaction verification
- Clipboard integration for wallet addresses

## Testing the Functionality

1. **Profile Navigation**
   - Visit a trader profile
   - Verify all metrics are displayed correctly
   - Test wallet address copy functionality

2. **Mobile Testing**
   - X App Integration:
     - Click on profile picture or X card
     - Should open X app on mobile devices
     - Should open X website on desktop

3. **Trade Table**
   - Verify sorting functionality
   - Test Solscan links
   - Check share functionality
   - Verify responsive behavior on different screen sizes

4. **Data Interaction**
   - Test search functionality
   - Verify time frame selector
   - Check filter functionality

## Deployment Guide

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Staging Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deployment Options**

   Using Netlify:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy to staging URL

   Using Vercel:
   - Import your GitHub repository
   - Automatic detection of build settings
   - Deploy to staging environment

### Production Deployment

1. **Pre-deployment Checklist**
   - Run all tests
   - Check console for warnings/errors
   - Verify all integrations
   - Test on multiple devices

2. **Deployment Process**
   - Same as staging, but use production environment
   - Set up custom domain if needed
   - Configure SSL certificate

3. **Post-deployment**
   - Verify all functionality in production
   - Monitor error rates
   - Check analytics integration

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest version)
- Mobile browsers (iOS Safari, Chrome for Android)

## Technical Stack

- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for UI components
- Lucide React for icons

## Known Limitations

- Deep linking behavior may vary based on installed apps
- Some features require modern browser capabilities
- Rate limits may apply to external API integrations

## Future Improvements

- Add real-time WebSocket updates
- Implement more detailed transaction history
- Add portfolio analysis tools
- Enhance mobile experience with native-like features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details
