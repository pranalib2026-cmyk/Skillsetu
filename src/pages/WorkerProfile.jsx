import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFeedStore } from '../store/feedStore';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card, { CardContent } from '../components/ui/Card';
import { ShieldCheck, Video, MapPin, Star, AlertTriangle, Calendar, Award } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { generateCertificatePDF } from '../lib/pdfGenerator';

const WorkerProfile = () => {
  const { id } = useParams();
  const { workers } = useFeedStore();
  const { user } = useAuthStore();
  const worker = workers.find(w => w.id === id) || workers[0]; // Fallback for demo
  
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Is viewing own profile?
  const isOwnProfile = user?.id === worker.id || user?.role === 'admin';

  // Radar Chart Mock Data
  const scoreData = [
    { subject: 'Quality', A: 4.8, fullMark: 5 },
    { subject: 'Speed', A: 4.5, fullMark: 5 },
    { subject: 'Reliability', A: 4.9, fullMark: 5 },
    { subject: 'Communication', A: 4.2, fullMark: 5 },
    { subject: 'Behavior', A: 4.7, fullMark: 5 },
  ];

  // Mock Work Posts
  const workPosts = [
    { id: 1, img: 'https://images.unsplash.com/photo-1541888087525-0616b76ce8de?q=80&w=400&auto=format&fit=crop', title: 'Plumbing fix', date: '2 days ago' },
    { id: 2, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop', title: 'Pipe installation', date: '1 week ago' },
    { id: 3, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop', title: 'Bathroom fitting', date: '2 weeks ago' },
  ];

  const handleGenerateCertificate = async () => {
    toast.loading('Generating Exit Certificate PDF...', { id: 'pdf-toast' });
    try {
      await generateCertificatePDF(worker, scoreData);
      toast.success('Certificate generated and saved! Account deactivated.', { id: 'pdf-toast' });
      setShowExitConfirm(false);
    } catch (error) {
       toast.error('Failed to generate certificate.', { id: 'pdf-toast' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <div className="h-32 bg-primary/10 w-full relative">
           <div className="absolute -bottom-12 left-6 border-4 border-white rounded-full bg-white">
             <div className="relative">
               <img src={worker.profilePic} alt={worker.name} className="w-24 h-24 rounded-full object-cover" />
               {worker.isVerified && (
                 <div className="absolute bottom-0 right-0 bg-success text-white rounded-full p-1 border-2 border-white" title="Identity Verified">
                   <ShieldCheck size={18} />
                 </div>
               )}
             </div>
           </div>
        </div>
        
        <CardContent className="pt-16 pb-6 px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {worker.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                 <MapPin size={16} />
                 <span>{worker.location}</span>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {worker.skills.map((skill, i) => (
                  <Badge key={i} variant="skill">{skill}</Badge>
                ))}
                <Badge variant="default">{worker.experience} yrs exp</Badge>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
               <div className="text-2xl font-bold text-accent">
                 ₹{worker.pricePerDay}<span className="text-sm text-gray-500 font-normal"> / day</span>
               </div>
               {isOwnProfile ? (
                 <Link to="/post/create" className="w-full md:w-auto">
                   <Button variant="outline" fullWidth>Create Work Post</Button>
                 </Link>
               ) : (
                 <Button variant="primary" className="w-full shadow-md shadow-blue-900/20" size="lg">
                    Hire {worker.name.split(' ')[0]}
                 </Button>
               )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-6">
          {/* Trust Panel */}
          <Card>
            <CardContent className="p-5">
               <h3 className="font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Verification Levels</h3>
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-success flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Identity (Aadhaar)</div>
                      <div className="text-xs text-gray-500">Verified by Govt ID OCR</div>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                      <Video size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-sm flex items-center gap-2">
                         Skill Video 
                         <span className="text-[10px] bg-success text-white px-1.5 rounded">Verified Real</span>
                      </div>
                      <div className="text-xs text-gray-500">AI authenticated</div>
                    </div>
                 </div>
               </div>
               
               {/* Video Player Mockup */}
               <div className="mt-5 relative rounded-lg overflow-hidden bg-gray-900 aspect-video group cursor-pointer border border-gray-200">
                  <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" alt="Skill video thumbnail" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur rounded-full flex items-center justify-center border border-white/50">
                      <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 rounded">
                     0:45
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* Controls */}
          {isOwnProfile && (
            <Card className="border-red-100 border-2">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-500"/>
                  Danger Zone
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Leaving the platform will generate your exit certificate based on your ratings and deactivate your account.
                </p>
                {showExitConfirm ? (
                   <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                     <p className="text-xs text-red-800 mb-3 font-medium">Are you absolutely sure?</p>
                     <div className="flex gap-2">
                        <Button variant="danger" size="sm" className="flex-1 text-xs" onClick={handleGenerateCertificate}>Yes, Exit</Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => setShowExitConfirm(false)}>Cancel</Button>
                     </div>
                   </div>
                ) : (
                  <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 border-red-200" onClick={() => setShowExitConfirm(true)}>
                    Leave Platform
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Scorecard */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between flex-wrap gap-4 mb-2">
                 <div>
                   <h3 className="font-semibold text-gray-900 text-lg">Performance Scorecard</h3>
                   <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                        <Star className="w-4 h-4 text-accent fill-accent mr-1" />
                        <span className="font-bold text-accent">{worker.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">Based on {worker.reviewsCount} jobs</span>
                   </div>
                 </div>
                 {worker.rating >= 4.5 && (
                   <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 font-medium px-3 py-1 rounded-full border border-yellow-200 h-fit text-sm">
                     <Award size={16} className="text-yellow-600" />
                     Top Rated Worker
                   </div>
                 )}
              </div>
              
              <div className="h-[280px] w-full mt-4 -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={scoreData}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                    <Radar
                      name="Score"
                      dataKey="A"
                      stroke="#033f63"
                      fill="#033f63"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Work Posts Feed (Instagram style grid) */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-semibold text-gray-900 text-lg">Work Portfolio</h3>
                 {workPosts.length > 0 && (
                   <span className="text-sm font-medium text-gray-500">{workPosts.length} posts</span>
                 )}
              </div>
              
              {workPosts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {workPosts.map(post => (
                    <div key={post.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer">
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <p className="text-white font-medium text-sm truncate">{post.title}</p>
                        <div className="flex items-center gap-1 text-white/80 text-[10px] mt-1">
                          <Calendar size={10} />
                          {post.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500">No work posts uploaded yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
