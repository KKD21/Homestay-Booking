/**
 * Brand Configuration File
 * 
 * This file contains all configurable branding elements for white labeling.
 * Modify these settings to customize the application for different businesses.
 * 
 * IMPORTANT: This is the central configuration file for all business-specific
 * branding elements. Update this file when switching between different businesses.
 */

const brandConfig = {
  // Business Information
  businessName: "Stay Moksha",                      // Full business name used in most places
  businessShortName: "Moksha",                      // Shortened version for space-constrained areas
  businessTagline: "Homestays, hotels, resorts & more✨", // Main tagline displayed on homepage
  businessDescription: "Discover the warmth of local hospitality with handpicked accommodations across Northeast India.", // Longer description for about sections
  
  // Contact Information
  officeAddress: "Staymoksha headquarter, House number na 26, West Jyotinagar, Bamunimaidan, Guwahati, Assam 781004",
  email: "contact@staymoksha.com",
  phone: "+91 1234567890",
  supportPhone: "+91 9876543210",                  // Optional secondary contact number
  
  // Social Media Links
  socialMedia: {
    instagram: "https://instagram.com/staymoksha",
    facebook: "https://facebook.com/staymoksha",
    whatsapp: "https://wa.me/911234567890",
    twitter: "https://twitter.com/staymoksha",      // Optional Twitter/X link
    youtube: "https://youtube.com/staymoksha",      // Optional YouTube channel
  },
  
  // Copyright Information
  copyrightYear: "2025",
  copyrightText: "All rights reserved.",
  legalLinks: {
    privacyPolicy: "/privacy-policy",
    termsConditions: "/terms-and-conditions",
  },
  
  // Popular Destinations
  popularDestinations: [
    { id: "arunachal", name: "ARUNACHAL PRADESH", featured: true },
    { id: "kaziranga", name: "KAZIRANGA", featured: true },
    { id: "dibrugarh", name: "DIBRUGARH", featured: true },
    { id: "meghalaya", name: "MEGHALAYA", featured: true },
    { id: "guwahati", name: "GUWAHATI", featured: true },
    { id: "nagaland", name: "NAGALAND", featured: true },
    { id: "jorhat", name: "JORHAT", featured: true },
  ],
  
  // Theme Colors (can be overridden in tailwind.config.js)
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Main brand color
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',  // Secondary brand color
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: '#f59e0b',  // Accent color for CTAs and highlights
  },
  
  // Logo Paths (relative to assets folder)
  // These should be SVG files for best quality
  logos: {
    default: 'logo.svg',        // Dark logo for light backgrounds
    white: 'logo-white.svg',    // Light logo for dark backgrounds
    favicon: 'favicon.ico',     // Browser favicon
    mobileLogo: 'logo-small.svg', // Compact logo for mobile screens
  },
  
  // UI Configuration
  ui: {
    headerStyle: 'transparent',  // Options: 'transparent', 'solid', 'minimal'
    footerStyle: 'standard',     // Options: 'standard', 'minimal', 'expanded'
    buttonStyle: 'rounded',      // Options: 'rounded', 'pill', 'square'
    cardStyle: 'shadow',         // Options: 'shadow', 'border', 'flat'
    heroImages: [
      '/assets/images/hero/hero-1.jpg',
      '/assets/images/hero/hero-2.jpg',
      '/assets/images/hero/hero-3.jpg',
    ],
  },
};

export default brandConfig;