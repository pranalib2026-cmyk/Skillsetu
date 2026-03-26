import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFeedStore } from '../store/feedStore';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import JobCard from '../components/feed/JobCard';
import { ShieldCheck, MapPin, Building2, Calendar, FileText } from 'lucide-react';

const EmployerProfile = () => {
  const { id } = useParams();
  const { jobs } = useFeedStore();
  const { user } = useAuthStore();
  
  // Mock employer data
  const employer = {
    id: 'e1',
    name: 'Sharma Builders',
    gstin: '29ABCDE1234F1Z5',
    address: 'Bandra West, Mumbai',
    phone: '9876543210',
    profilePic: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop',
    isVerified: true,
    joinedDate: 'Jan 2026'
  };

  const isOwnProfile = user?.id === employer.id || user?.role === 'admin';
  
  // Get jobs posted by this employer
  const employerJobs = jobs.filter(j => j.employerName.includes(employer.name));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <div className="h-32 bg-secondary/10 w-full relative">
           <div className="absolute -bottom-12 left-6 border-4 border-white rounded-xl bg-white">
             <div className="relative">
               <img src={employer.profilePic} alt={employer.name} className="w-24 h-24 rounded-lg object-cover" />
               {employer.isVerified && (
                 <div className="absolute -top-3 -right-3 bg-success text-white rounded-full p-1 border-2 border-white shadow-sm" title="Identity Verified">
                   <ShieldCheck size={18} />
                 </div>
               )}
             </div>
           </div>
        </div>
        
        <CardContent className="pt-16 pb-6 px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {employer.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600">
                 <div className="flex items-center gap-1.5">
                   <MapPin size={16} className="text-gray-400" />
                   <span>{employer.address}</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <Calendar size={16} className="text-gray-400" />
                   <span>Joined {employer.joinedDate}</span>
                 </div>
              </div>
              
              {employer.gstin && (
                <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded inline-flex">
                  <FileText size={14} />
                  GSTIN: {employer.gstin}
                </div>
              )}
            </div>
            
            {isOwnProfile && (
               <div className="w-full md:w-auto mt-2 md:mt-0">
                 <Link to="/job/create" className="block w-full">
                   <Button variant="primary" className="w-full shadow-md shadow-blue-900/20" size="lg">
                      Post a New Job
                   </Button>
                 </Link>
               </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Job Posts */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Active Job Posts</h2>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{employerJobs.length}</span>
        </div>
        
        {employerJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employerJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50 border-dashed">
            <CardContent className="py-12 text-center">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No active jobs</h3>
              <p className="text-gray-500 mb-4">This employer doesn't have any open positions right now.</p>
              {isOwnProfile && (
                <Link to="/job/create">
                  <Button variant="outline">Create a Post</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Past History Mock */}
      <div className="pt-4 border-t border-gray-100">
         <h2 className="text-xl font-bold text-gray-900 mb-4">Hiring History</h2>
         <Card className="bg-white">
            <CardContent className="p-0">
               <div className="divide-y divide-gray-100 text-sm">
                 {[1, 2, 3].map((item) => (
                    <div key={item} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold">
                           W
                         </div>
                         <div>
                           <div className="font-medium text-gray-900">Worker {item}</div>
                           <div className="text-gray-500">Hired as Plumber</div>
                         </div>
                       </div>
                       <div className="text-right">
                          <div className="font-medium text-gray-900">Mar {10-item}, 2026</div>
                          <div className="text-green-600 font-medium text-xs bg-green-50 px-2 py-0.5 rounded mt-1 inline-block">Completed</div>
                       </div>
                    </div>
                 ))}
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
};

export default EmployerProfile;
