import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { LayoutDashboard, Users, AlertTriangle, FileCheck2, Camera, UserSquare2, LogOut, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { logout, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Hardcoded Mock Data for Admin
  const stats = [
    { label: 'Total Workers', value: '1,245', trend: '+12% this week', color: 'text-primary' },
    { label: 'Total Employers', value: '430', trend: '+5% this week', color: 'text-secondary' },
    { label: 'Pending Videos', value: '24', trend: 'Requires Review', color: 'text-accent' },
    { label: 'Open Complaints', value: '7', trend: 'High Priority', color: 'text-red-500' },
  ];

  const pendingVideos = [
    { id: 1, name: 'Suresh Patil', skill: 'Electrician', date: '2 hours ago', status: 'Pending AI Check' },
    { id: 2, name: 'Ramesh Kumar', skill: 'Plumber', date: '5 hours ago', status: 'Flagged Context' },
  ];

  const recentUsers = [
    { id: 'w101', name: 'Amit Sharma', role: 'Worker', verified: true, joined: 'Today' },
    { id: 'e101', name: 'BuildCorp India', role: 'Employer', verified: false, joined: 'Yesterday' },
    { id: 'w102', name: 'Vijay Singh', role: 'Worker', verified: true, joined: '2 days ago' },
  ];

  const handleAction = (actionName) => {
    toast.success(`Action '${actionName}' executed successfully`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex pb-safe">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col flex-shrink-0 relative z-20 shadow-xl">
        <div className="p-6 border-b border-primary-light/10">
          <h2 className="text-2xl font-bold text-white tracking-tight">SkillsetuAdmin</h2>
          <p className="text-blue-100 text-xs mt-1">Superuser Access</p>
        </div>
        
        <nav className="flex-1 py-4 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${activeTab === 'overview' ? 'border-cta bg-white/10 text-white' : 'border-transparent text-blue-100 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${activeTab === 'users' ? 'border-cta bg-white/10 text-white' : 'border-transparent text-blue-100 hover:bg-white/5'}`}
          >
            <Users size={20} /> Users
          </button>
          <button 
            onClick={() => setActiveTab('complaints')}
            className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${activeTab === 'complaints' ? 'border-cta bg-white/10 text-white' : 'border-transparent text-blue-100 hover:bg-white/5'}`}
          >
             <AlertTriangle size={20} /> Complaints
             <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">7</span>
          </button>
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${activeTab === 'posts' ? 'border-cta bg-white/10 text-white' : 'border-transparent text-blue-100 hover:bg-white/5'}`}
          >
            <FileCheck2 size={20} /> Work Posts
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${activeTab === 'videos' ? 'border-cta bg-white/10 text-white' : 'border-transparent text-blue-100 hover:bg-white/5'}`}
          >
            <Camera size={20} /> Video Review
          </button>
          <button 
            onClick={() => setActiveTab('aadhaar')}
            className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${activeTab === 'aadhaar' ? 'border-cta bg-white/10 text-white' : 'border-transparent text-blue-100 hover:bg-white/5'}`}
          >
            <UserSquare2 size={20} /> Aadhaar Review
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-6 py-3 border-l-4 transition-colors ${activeTab === 'analytics' ? 'border-cta bg-white/10 text-white' : 'border-transparent text-blue-100 hover:bg-white/5'}`}
          >
            <Sparkles size={20} /> Analytics
          </button>
        </nav>

        <div className="p-4 border-t border-blue-800">
           <button 
             onClick={logout}
             className="w-full flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
           >
             <LogOut size={18} /> Logout
           </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 overflow-y-auto">
         {/* Top Header Mobile */}
         <div className="md:hidden bg-[#1E3A8A] text-white p-4 flex justify-between items-center shadow-md">
            <h2 className="text-lg font-bold">DakshAdmin</h2>
            <select 
              value={activeTab} 
              onChange={e => setActiveTab(e.target.value)}
              className="bg-blue-900 border-none text-white text-sm rounded focus:ring-accent"
            >
              <option value="overview">Overview</option>
              <option value="users">Manage Users</option>
              <option value="videos">Video Verifications</option>
              <option value="complaints">Complaints</option>
            </select>
         </div>

         <div className="p-4 md:p-8">
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
               <p className="text-gray-500 mt-1">Logged in as {user?.email}</p>
            </div>

            {/* View Switching based on Active Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                       <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                       <p className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
                       <p className="text-xs text-gray-400 font-medium">{stat.trend}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                   <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                         <h3 className="font-semibold text-gray-900">Recent Registrations</h3>
                         <Button variant="ghost" size="sm">View All</Button>
                      </div>
                      <div className="divide-y divide-gray-100">
                         {recentUsers.map(u => (
                           <div key={u.id} className="p-4 flex items-center justify-between hover:bg-blue-50/50 transition-colors">
                             <div>
                               <div className="font-medium text-gray-900 flex items-center gap-2">
                                 {u.name}
                                 {u.verified && <CheckCircle2 size={14} className="text-success" />}
                               </div>
                               <div className="text-xs text-gray-500 mt-1">{u.role} • Joined {u.joined}</div>
                             </div>
                             <Badge variant={u.role === 'Worker' ? 'primary' : 'success'}>{u.role}</Badge>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                         <h3 className="font-semibold text-gray-900">Videos Awaiting Review</h3>
                         <Badge variant="warning">{pendingVideos.length} Pending</Badge>
                      </div>
                      <div className="divide-y divide-gray-100">
                         {pendingVideos.map(v => (
                           <div key={v.id} className="p-4 flex items-center justify-between hover:bg-orange-50/50 transition-colors">
                             <div className="flex gap-3">
                               <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs overflow-hidden relative">
                                  <Camera size={16} className="opacity-50" />
                               </div>
                               <div>
                                 <div className="font-medium text-gray-900">{v.name}</div>
                                 <div className="text-xs text-gray-500 mt-0.5">{v.skill} • {v.date}</div>
                               </div>
                             </div>
                             <div className="flex gap-2">
                                <button onClick={() => handleAction('Approve Video')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                   <CheckCircle2 size={20} />
                                </button>
                                <button onClick={() => handleAction('Reject Video')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                   <XCircle size={20} />
                                </button>
                             </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* Other Tabs placeholders */}
            {activeTab !== 'overview' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-4">
                    {activeTab === 'users' && <Users size={32} />}
                    {activeTab === 'videos' && <Camera size={32} />}
                    {activeTab === 'aadhaar' && <UserSquare2 size={32} />}
                    {activeTab === 'posts' && <FileCheck2 size={32} />}
                    {activeTab === 'complaints' && <AlertTriangle size={32} className="text-red-500" />}
                 </div>
                 <h2 className="text-xl font-bold text-gray-900 mb-2 capitalize">{activeTab} Management Module</h2>
                 <p className="text-gray-500 max-w-md mx-auto">
                   This module provides full CRUD and moderation capabilities for {activeTab}. Connected directly to the Supabase backend in production.
                 </p>
                 <Button className="mt-6" variant="outline" onClick={() => setActiveTab('overview')}>Back to Overview</Button>
              </div>
            )}
         </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
