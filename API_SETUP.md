# Manufacturing Dashboard - Setup Guide

This is a React-based manufacturing growth dashboard that fetches data from the MOSFI (Manufacturing & Services) API.

## Features

- **Real-time Growth Metrics**: Display current and previous manufacturing growth rates
- **IIP Data Visualization**: Index of Industrial Production trends over time
- **Sector Analysis**: Breakdown of growth by manufacturing sectors with market share distribution
- **State Performance**: Compare manufacturing performance across Indian states
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Beautiful loading animations during data fetches
- **Error Handling**: Graceful error handling with fallback data

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and configure:
- `REACT_APP_API_BASE_URL`: The MOSFI API base URL (default: https://api.mosfi.org)
- `REACT_APP_API_KEY`: Your API key if required (optional)

### 3. Start the Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## API Integration

### Available Endpoints

The application expects the following API endpoints from the MOSFI API:

1. **GET /api/manufacturing/growth**
   ```json
   {
     "currentGrowth": 4.0,
     "previousGrowth": 3.7,
     "timestamp": "2025-03-11T00:00:00Z"
   }
   ```

2. **GET /api/manufacturing/iip**
   - Query params: `startDate`, `endDate`
   ```json
   [
     { "month": "Jan 2025", "value": 5.2, "category": "Manufacturing" },
     ...
   ]
   ```

3. **GET /api/manufacturing/sectors**
   ```json
   [
     { "name": "Automotive", "growth": 8.2, "share": 15.3, "color": "#1e3a8a" },
     ...
   ]
   ```

4. **GET /api/manufacturing/states**
   ```json
   [
     { "state": "Gujarat", "growth": 7.8, "rank": 1 },
     ...
   ]
   ```

### Fallback Data

If the API is unavailable, the application automatically falls back to mock data, ensuring a complete user experience even without backend connectivity.

## Project Structure

```
src/
├── components/
│   ├── ManufacturingWindow.jsx    # Main dashboard modal
│   ├── GrowthChart.jsx            # Growth trend visualization
│   ├── MetricsDashboard.jsx       # Key metrics display
│   ├── SectorBreakdown.jsx        # Sector analysis
│   └── StateComparison.jsx        # State performance comparison
├── context/
│   └── DataContext.jsx            # Global data management
├── hooks/
│   └── useManufacturingData.js    # Custom data fetching hook
├── services/
│   └── manufacturingAPI.js        # API service with fallback
├── data/
│   └── manufacturingData.js       # Mock data (legacy)
├── App.jsx                        # Main app component
└── App.css                        # Global styles
```

## Using the Custom Hook

In any component, you can use the `useManufacturingData` hook:

```jsx
import useManufacturingData from '../hooks/useManufacturingData';

function MyComponent() {
  const { data, loading, error, refetch } = useManufacturingData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Growth: {data?.currentGrowth}%</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

## Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Recharts** for data visualization
- **Lucide Icons** for UI icons

### Color Scheme

Custom colors are defined in `tailwind.config.js`:
- `manufacturing-blue`: #1e40af
- `manufacturing-teal`: #10b981
- `manufacturing-orange`: #f97316

## Error Handling

The application implements comprehensive error handling:
- Network errors automatically trigger fallback data
- Detailed error messages in the UI
- Automatic retry mechanism available to users
- Console warnings for debugging

## Performance Optimization

- Lazy loading of components
- Memo-wrapped components to prevent unnecessary re-renders
- Debounced API requests
- Responsive image optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API not connecting
1. Check the `REACT_APP_API_BASE_URL` in `.env`
2. Verify the API endpoint is accessible
3. Check browser console for CORS errors
4. The app will automatically use fallback data

### Components not rendering
1. Ensure `DataProvider` wraps your app in `App.jsx`
2. Check that components are properly imported
3. Verify `.env` file exists (or create from `.env.example`)

### Build errors
1. Clear `node_modules`: `rm -rf node_modules && npm install`
2. Clear build cache: `npm run build -- --reset-cache`
3. Check Node.js version: should be 14+

## Contributing

To add new features:
1. Create new components in `src/components/`
2. Add API methods in `src/services/manufacturingAPI.js`
3. Use `DataContext` or `useManufacturingData` hook for state management

## License

MIT

## Support

For issues or questions about the MOSFI API, visit their official documentation.
