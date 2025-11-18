# AxionX Frontend

Modern, responsive landing page and dashboard for the AxionX AI Meeting Intelligence System.

## 🚀 Features

- **Landing Page**: Professional marketing page with hero section, features, and testimonials
- **AI Chat Widget**: Interactive chat interface connecting to AxionX AI API
- **Dashboard**: Admin interface for querying meetings and viewing analytics
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 📦 Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Development

The development server runs on `http://localhost:3000` and proxies API requests to `http://localhost:8000`.

Make sure the backend API is running:

```bash
cd ..
python api_public.py
```

## 📁 Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── components/  # Reusable components
│   │   └── ChatWidget.jsx
│   ├── pages/       # Page components
│   │   ├── LandingPage.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx      # Main app component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables (if needed)
4. Deploy!

### Netlify

```bash
npm run build
# Deploy the 'dist' folder
```

### Custom Server

```bash
npm run build
# Serve the 'dist' folder with any static file server
```

## 🔧 Configuration

### API Endpoint

Update `vite.config.js` to point to your production API:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://your-api-url.com',
      changeOrigin: true,
    }
  }
}
```

## 📝 License

Proprietary - AxionX

