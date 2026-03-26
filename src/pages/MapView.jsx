import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useFeedStore } from '../store/feedStore';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Star, ShieldCheck, Video, Building2 } from 'lucide-react';

// Leaflet CSS needs to be imported or included in index.html, usually we add it to index.html
// import 'leaflet/dist/leaflet.css'; is common, but Vite allows us to import it here.
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for Workers (Blue) and Jobs (Orange)
const workerIconHtml = `
  <div style="background-color: #033f63; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3); border: 2px solid white;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  </div>
`;

const jobIconHtml = `
  <div style="background-color: #fedc97; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3); border: 2px solid white;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
  </div>
`;

const workerIcon = L.divIcon({ html: workerIconHtml, className: 'custom-leaflet-icon', iconSize: [30, 30], iconAnchor: [15, 15] });
const jobIcon = L.divIcon({ html: jobIconHtml, className: 'custom-leaflet-icon', iconSize: [30, 30], iconAnchor: [15, 15] });

const MapView = () => {
  const { workers, jobs } = useFeedStore();
  
  // View states: 'both', 'workers', 'jobs'
  const [viewMode, setViewMode] = useState('both');

  // Mumbai Center for demo
  const center = [19.0760, 72.8777];

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] -mx-4 sm:-mx-6 lg:-mx-8 -mt-6">
      {/* Map Header / Controls */}
      <div className="bg-white p-4 border-b border-gray-100 shadow-sm z-10 flex flex-col sm:flex-row gap-4 justify-between items-center relative">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Map View</h1>
          <p className="text-sm text-gray-500">Explore opportunities near you</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('both')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'both' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
          >
            All
          </button>
          <button 
            onClick={() => setViewMode('workers')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'workers' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Workers
          </button>
          <button 
            onClick={() => setViewMode('jobs')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'jobs' ? 'bg-cta text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Jobs
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative z-0">
        <MapContainer center={center} zoom={11} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render Workers */}
          {(viewMode === 'both' || viewMode === 'workers') && workers.map(worker => (
            <Marker 
              key={worker.id} 
              position={[worker.lat, worker.lng]} 
              icon={workerIcon}
            >
              <Popup className="custom-popup">
                <div className="w-64">
                   <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-3">
                     <img src={worker.profilePic} alt="" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                     <div>
                       <h3 className="font-semibold text-gray-900 leading-tight">{worker.name}</h3>
                       <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                          <span className="text-xs font-medium">{worker.rating}</span>
                       </div>
                     </div>
                   </div>
                   
                   <p className="text-sm text-gray-600 mb-2 font-medium">{worker.skills[0]}</p>
                   
                   <div className="flex justify-between items-end mt-4">
                     <div>
                       <div className="text-lg font-bold text-accent">₹{worker.pricePerDay}</div>
                       <div className="text-[10px] text-gray-500 uppercase">per day</div>
                     </div>
                     <Link to={`/worker/${worker.id}`}>
                       <Button size="sm" variant="outline" className="py-1 px-3 h-8 text-xs">View Profile</Button>
                     </Link>
                   </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Render Jobs */}
          {(viewMode === 'both' || viewMode === 'jobs') && jobs.map(job => (
             <Marker 
              key={job.id} 
              position={[job.lat, job.lng]} 
              icon={jobIcon}
            >
              <Popup className="custom-popup">
                <div className="w-64">
                   <div className="mb-3 border-b border-gray-100 pb-3">
                     <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 font-medium">
                       <Building2 size={12} />
                       {job.employerName}
                     </div>
                     <h3 className="font-semibold text-gray-900 leading-tight">{job.title}</h3>
                   </div>
                   
                   <div className="flex items-center gap-2 mb-3">
                     <Badge variant="skill">{job.skillRequired}</Badge>
                     <Badge variant="warning">{job.status}</Badge>
                   </div>
                   
                   <div className="flex justify-between items-end mt-4">
                     <div>
                       <div className="text-lg font-bold text-accent">₹{job.pricePerDay}</div>
                       <div className="text-[10px] text-gray-500 uppercase">per day</div>
                     </div>
                     <Button size="sm" variant="primary" className="py-1 px-3 h-8 text-xs bg-accent hover:bg-orange-600">Apply</Button>
                   </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <style>{`
        .leaflet-container {
          font-family: inherit;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .custom-popup .leaflet-popup-content {
          margin: 12px;
          width: 256px !important;
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .leaflet-control-attribution {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MapView;
