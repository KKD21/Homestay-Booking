import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Context
import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
const PropertyListing = lazy(() => import('./pages/PropertyListing'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const BookingProcess = lazy(() => import('./pages/BookingProcess'));
const Login = lazy(() => import('./pages/Login'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));



function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="properties" element={<PropertyListing />} />
            <Route path="properties/:id" element={<PropertyDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="booking/:propertyId" element={<BookingProcess />} />
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;