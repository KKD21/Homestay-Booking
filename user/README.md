# Homestay Booking Platform - White Label Solution

This is the user-facing frontend for a white-label homestay booking application. It allows users to browse properties, view details, make reservations, and manage their bookings. The platform has been designed to be easily customizable for different businesses, with an enhanced UI matching the quality of StayMoksha.com.

## White Labeling Features

The platform supports easy customization of:

- Business name and tagline
- Logo (light and dark versions)
- Contact information
- Social media links
- Popular destinations
- Theme colors
- Copyright information

## How to Customize

### 1. Brand Configuration

All branding elements are centralized in a single configuration file:

```
src/config/brandConfig.js
```

Edit this file to change:

- Business name and tagline
- Contact information
- Social media links
- Popular destinations
- Copyright information

### 2. Logo Replacement

Replace the logo files in the assets directory:

```
src/assets/logo.svg       # Dark logo for light backgrounds
src/assets/logo-white.svg  # Light logo for dark backgrounds
```

Make sure to maintain the same filenames or update the references in `brandConfig.js`.

### 3. Theme Colors

The primary color scheme can be adjusted in the Tailwind configuration file:

```
tailwind.config.js
```

The default primary colors are defined in the `brandConfig.js` file and can be referenced when updating the Tailwind configuration.

## Project Structure

```
user/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images and other assets
│   ├── components/    # Reusable UI components
│   │   └── layout/    # Layout components like Header, Footer
│   ├── config/        # Configuration files including brand settings
│   ├── context/       # React context providers
│   ├── css/           # Global CSS styles
│   ├── styles/        # Enhanced UI styling
│   ├── pages/         # Page components
│   ├── services/      # API services for data fetching
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── .env               # Environment variables (template)
├── index.html         # HTML entry point
├── package.json       # Project dependencies
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js     # Vite configuration
```

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd homestay-booking/user
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-supabase-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. **Start the development server**

```bash
npm run dev
```

## Features

- **Property Browsing**: View all available properties with filtering options
- **Property Details**: View detailed information about each property
- **User Authentication**: Sign up, login, and profile management
- **Booking Management**: Make reservations and view booking history
- **Contact & Support**: Get in touch with the Stay Moksha team

## Integration with Supabase

This application uses Supabase for:

- **Authentication**: User signup, login, and profile management
- **Database**: Storing and retrieving property, room, and reservation data
- **Storage**: Managing property images and other assets

The database schema includes the following tables:

- `properties`: Property listings with details
- `rooms`: Individual rooms within properties
- `guests`: User profile information
- `reservations`: Booking information
- `users`: Authentication user data

## Development Guidelines

- Use the existing component structure and styling patterns
- Follow the established naming conventions
- Utilize the service layer for all API interactions
- Leverage React Query for data fetching and caching
- Use the AuthContext for authentication-related functionality

## Deployment

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.
