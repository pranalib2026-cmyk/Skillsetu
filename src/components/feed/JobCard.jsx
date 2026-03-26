import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { MapPin, Calendar, Building2, ShieldCheck } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {job.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-600">
              <Building2 size={16} className="text-gray-400" />
              <span className="font-medium">{job.employerName}</span>
              {job.isVerified && (
                <ShieldCheck size={14} className="text-success fill-success/10" />
              )}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xl font-bold text-accent bg-orange-50 px-3 py-1 rounded-lg">
              ₹{job.pricePerDay}
            </div>
            <div className="text-xs text-gray-500 mt-1">per day</div>
          </div>
        </div>

        <div className="mt-auto space-y-3 pt-4">
          <div className="flex items-center gap-2">
            <Badge variant="skill">{job.skillRequired}</Badge>
            <Badge variant={job.status === 'open' ? 'success' : 'default'}>
              {job.status.toUpperCase()}
            </Badge>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              <span className="truncate">{job.location}</span>
              <span className="text-xs text-gray-400 ml-auto">• {job.distance}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span>{new Date(job.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button variant="primary" fullWidth className="py-2.5 shadow-sm">
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
