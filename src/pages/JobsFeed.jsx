import React, { useState } from 'react';
import { useFeedStore } from '../store/feedStore';
import JobCard from '../components/feed/JobCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Search, Filter, Map as MapIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobsFeed = () => {
  const { jobs } = useFeedStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const allSkills = ['All', ...new Set(jobs.map(j => j.skillRequired))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.employerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || job.skillRequired === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Available Jobs</h1>
          <p className="text-gray-500">Find daily wage work opportunities near you</p>
        </div>
        <Link to="/map">
          <Button variant="outline" className="flex items-center gap-2">
            <MapIcon size={18} />
            View on Map
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input 
            className="pl-10 mb-0" 
            placeholder="Search jobs, locations, or employers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth={true}
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar snap-x">
          {allSkills.map(skill => (
            <button
              key={skill}
              onClick={() => setActiveFilter(skill)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors snap-start flex-shrink-0
                ${activeFilter === skill 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'}
              `}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {filteredJobs.length === 0 ? (
         <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
         <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
         <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
         <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
         <Button 
           variant="ghost" 
           className="mt-4"
           onClick={() => {
             setSearchQuery('');
             setActiveFilter('All');
           }}
         >
           Clear Filters
         </Button>
       </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsFeed;
