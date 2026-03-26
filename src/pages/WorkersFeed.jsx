import React, { useState } from 'react';
import { useFeedStore } from '../store/feedStore';
import WorkerCard from '../components/feed/WorkerCard';
import Input from '../components/ui/Input';
import { Search, Filter, Map as MapIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const WorkersFeed = () => {
  const { workers, activeSkillFilter, setActiveSkillFilter } = useFeedStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique skills for filter
  const allSkills = ['All', ...new Set(workers.flatMap(w => w.skills))];

  // Filter workers
  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          worker.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = activeSkillFilter === 'All' || worker.skills.includes(activeSkillFilter);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Workers</h1>
          <p className="text-gray-500">Hire skilled and verified labor in your area</p>
        </div>
        <Link to="/map">
          <Button variant="outline" className="flex items-center gap-2">
            <MapIcon size={18} />
            View on Map
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input 
            className="pl-10 mb-0" 
            placeholder="Search by name or location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth={false}
            wrapperclass="mb-0" // override default mb-4
          />
        </div>
        
        <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2 snap-x">
          {allSkills.map(skill => (
            <button
              key={skill}
              onClick={() => setActiveSkillFilter(skill)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors snap-start flex-shrink-0
                ${activeSkillFilter === skill 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}
              `}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {filteredWorkers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No workers found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          <Button 
            variant="ghost" 
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setActiveSkillFilter('All');
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWorkers.map(worker => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkersFeed;
