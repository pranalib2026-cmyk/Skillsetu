import React from 'react';
import { useAuthStore } from '../store/authStore';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Briefcase, Calendar, Star, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();
  const isWorker = user?.role === 'worker';
  
  // Example stats
  const stats = isWorker ? [
    { label: 'Total Earnings', value: '₹12,450', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Jobs Completed', value: '14', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-orange-500', bg: 'bg-orange-100' },
    { label: 'Upcoming Bookings', value: '2', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
  ] : [
    { label: 'Total Spent', value: '₹8,500', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Workers Hired', value: '6', icon: Briefcase, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Active Jobs', value: '1', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-100' },
    { label: 'Pending Reviews', value: '2', icon: Star, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name || 'User'}</p>
        </div>
        {!user?.is_verified_badge && isWorker && (
          <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg border border-orange-100 text-sm font-medium">
            <AlertCircle size={16} />
            <span>Profile Pending Verification</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl flex-shrink-0 ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
              No recent activity to show.
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{isWorker ? 'Upcoming Bookings' : 'Active Job Posts'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
              {isWorker ? 'You have no upcoming jobs scheduled.' : 'You have no active job posts.'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
