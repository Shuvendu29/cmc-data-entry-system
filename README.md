# CMC Data Entry System

Central Marine Fisheries Research Institute - Water Quality Data Entry System

## 🌊 About

A comprehensive web-based data entry system for marine water quality monitoring, designed for the Central Marine Fisheries Research Institute (CMC). The system supports multiple monitoring programs including ICZMP, NWMP, and Outfall monitoring projects.

## ✨ Features

- **Role-based Access Control**: Admin and Analyst user roles
- **Project Management**: Configure monitoring projects with specific parameters
- **Parameter Assignment**: Assign water quality parameters to analysts per project/year/period
- **Data Entry Interface**: Clean, responsive forms for data collection
- **User Management**: Complete CRUD operations for user accounts
- **Analytics Dashboard**: Project progress tracking and data visualization
- **Data Export**: Excel and CSV export functionality
- **Responsive Design**: Mobile and desktop optimized

## 🚀 Quick Start

### Demo Credentials

#### Admin Access
- **Username**: `admin`
- **Password**: `admin123`
- **Capabilities**: Full system management

#### Analyst Access
- **Username**: `analyst`
- **Password**: `analyst123`
- **Role**: Marine Data Analyst

### Additional Test Users
- **Water Quality Chemist**: `chemist` / `chemist123`
- **Marine Biologist**: `biologist` / `biologist123`
- **Lab Technician**: `technician` / `tech123`

## 🏭 Production Deployment

### Prerequisites
- Node.js 18+ and npm 8+
- 2GB+ RAM recommended
- Domain with SSL certificate

### Environment Setup
1. Copy `.env.example` to `.env.local`
2. Configure production environment variables:
```bash
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_DEMO_MODE=false
```

### Build & Deploy
```bash
# Install dependencies
npm ci --only=production

# Build for production
npm run build

# Start production server
npm start
```

### Security Considerations
- Default demo passwords must be changed in production
- Enable rate limiting for login attempts
- Configure proper CORS policies
- Use HTTPS in production
- Regular security updates

### Performance Optimization
- Static assets are optimized automatically
- Console logs removed in production builds
- Image optimization enabled
- Compression enabled for faster loading

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Render.com

## 🌐 Deployment

This application is configured for deployment on Render.com with automatic builds from GitHub.

### Environment Variables
```bash
NODE_ENV=production
PORT=10000
NEXT_PUBLIC_APP_URL=https://softwireindia.info
NEXT_PUBLIC_APP_NAME="CMC Data Entry System"
NEXT_PUBLIC_APP_DESCRIPTION="Marine Water Quality Monitoring System"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

## 📊 Monitoring Projects

- **ICZMP** - Integrated Coastal Zone Management Programme
- **NWMP** - National Water Monitoring Programme  
- **Outfall** - Industrial Outfall Monitoring

## 🧪 Water Quality Parameters

### Physical Parameters
- pH, Temperature, Conductivity, Dissolved Oxygen, Turbidity, Suspended Solids, Salinity

### Chemical Parameters
- BOD, COD, Nitrates, Phosphates, Oil & Grease

### Biological Parameters
- Fecal Coliform, Total Coliform

### Heavy Metals
- Arsenic, Cadmium, Copper, Lead, Chromium, Nickel, Zinc, Mercury, Iron, Manganese

## 🏗 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 License

© 2025 SoftWire India. All rights reserved.

## 🌐 Domain

- **Production**: https://softwireindia.info
- **Developer**: SoftWire India
