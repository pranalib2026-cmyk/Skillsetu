import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// Layouts & Guards
import AppLayout from './components/layout/AppLayout';
import { RequireAuth, RequireAdmin, PublicOnly } from './components/layout/RouteGuards';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import WorkersFeed from './pages/WorkersFeed';
import JobsFeed from './pages/JobsFeed';
import MapView from './pages/MapView';
import WorkerProfile from './pages/WorkerProfile';
import EmployerProfile from './pages/EmployerProfile';
import CreateJobPost from './pages/CreateJobPost';
import CreateWorkPost from './pages/CreateWorkPost';
import BookingFlow from './pages/BookingFlow';
import RateWorker from './pages/RateWorker';
import Complaints from './pages/Complaints';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="font-sans text-text antialiased">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AppLayout><Landing /></AppLayout>} />
          
          <Route path="/login" element={
            <PublicOnly>
              <AppLayout><Login /></AppLayout>
            </PublicOnly>
          } />
          
          <Route path="/register" element={
            <PublicOnly>
              <AppLayout><Register /></AppLayout>
            </PublicOnly>
          } />

          {/* Semi-protected Onboarding Route */}
          <Route path="/onboarding" element={
            user && !user.accepted_terms ? (
              <AppLayout><Onboarding /></AppLayout>
            ) : (
              <Navigate to={user ? "/dashboard" : "/login"} replace />
            )
          } />

          {/* Protected Routes (Require Login & Onboarding) */}
          <Route path="/dashboard" element={
            <RequireAuth>
              <AppLayout><Dashboard /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/workers" element={
            <RequireAuth>
              <AppLayout><WorkersFeed /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/jobs" element={
            <RequireAuth>
              <AppLayout><JobsFeed /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/map" element={
            <RequireAuth>
              <AppLayout><MapView /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/worker/:id" element={
            <RequireAuth>
              <AppLayout><WorkerProfile /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/employer/:id" element={
            <RequireAuth>
              <AppLayout><EmployerProfile /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/job/create" element={
            <RequireAuth>
              <AppLayout><CreateJobPost /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/post/create" element={
            <RequireAuth>
              <AppLayout><CreateWorkPost /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/book/:id" element={
            <RequireAuth>
              <AppLayout><BookingFlow /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/rate/:id" element={
            <RequireAuth>
              <AppLayout><RateWorker /></AppLayout>
            </RequireAuth>
          } />
          <Route path="/complaints" element={
            <RequireAuth>
              <AppLayout><Complaints /></AppLayout>
            </RequireAuth>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#22C55E', // Success Color
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
