import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Star, MapPin, ShieldCheck, Video } from 'lucide-react';

const WorkerCard = ({ worker }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img 
              src={worker.profilePic} 
              alt={worker.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
            {worker.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-success text-white rounded-full p-0.5 border-2 border-white" title="Identity Verified">
                <ShieldCheck size={14} />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {worker.name}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-medium text-gray-700">{worker.rating}</span>
                  <span className="text-xs text-gray-500">({worker.reviewsCount})</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-accent">
                  ₹{worker.pricePerDay}
                </div>
                <div className="text-xs text-gray-500">per day</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {worker.skills.slice(0, 3).map((skill, i) => (
                <Badge key={i} variant="skill">{skill}</Badge>
              ))}
              {worker.skills.length > 3 && (
                <Badge variant="default">+{worker.skills.length - 3}</Badge>
              )}
            </div>

            <div className="mt-3 text-sm text-gray-600 flex items-center justify-between">
              <div className="flex items-center gap-1 truncate max-w-[60%]">
                <MapPin size={14} className="flex-shrink-0" />
                <span className="truncate">{worker.location}</span>
                <span className="text-gray-400 text-xs ml-1">• {worker.distance}</span>
              </div>
              
              {worker.videoVerified === 'real' && (
                <div className="flex items-center gap-1 text-xs text-primary font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                  <Video size={12} />
                  <span>Skill Verified</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2 w-full">
              <Link to={`/worker/${worker.id}`} className="flex-1">
                <Button variant="outline" fullWidth size="sm">View Profile</Button>
              </Link>
              <Button variant="primary" className="flex-1" size="sm">Hire Now</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkerCard;
