import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Map as MapIcon, User } from 'lucide-react';
const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="font-bold text-xl text-primary tracking-tight">
              Skill<span className="text-secondary">setu</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/workers" className="text-gray-600 hover:text-primary font-medium transition-colors">Workers</Link>
            <Link to="/jobs" className="text-gray-600 hover:text-primary font-medium transition-colors">Jobs</Link>
            <Link to="/map" className="text-gray-600 hover:text-primary font-medium transition-colors">Map</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-primary hidden sm:block">
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-primary hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route) => path === route || path.startsWith(route + '/');

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-40 w-full bg-white border-t border-gray-100 pb-safe">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${path === '/' ? 'text-primary' : 'text-gray-500'}`}
        >
          <Home size={20} className={path === '/' ? 'stroke-[2.5px]' : ''} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link 
          to="/workers" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/workers') ? 'text-primary' : 'text-gray-500'}`}
        >
          <User size={20} className={isActive('/workers') ? 'stroke-[2.5px]' : ''} />
          <span className="text-[10px] font-medium">Workers</span>
        </Link>
        <Link 
          to="/jobs" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/jobs') ? 'text-primary' : 'text-gray-500'}`}
        >
          <Briefcase size={20} className={isActive('/jobs') ? 'stroke-[2.5px]' : ''} />
          <span className="text-[10px] font-medium">Jobs</span>
        </Link>
        <Link 
          to="/map" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/map') ? 'text-primary' : 'text-gray-500'}`}
        >
          <MapIcon size={20} className={isActive('/map') ? 'stroke-[2.5px]' : ''} />
          <span className="text-[10px] font-medium">Map</span>
        </Link>
      </div>
    </div>
  );
};
export const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNav />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
export default AppLayout;