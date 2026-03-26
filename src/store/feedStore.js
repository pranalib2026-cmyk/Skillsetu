import { create } from 'zustand';

export const useFeedStore = create((set) => ({
  workers: [
    {
      id: 'w1',
      name: 'Ramesh Kumar',
      skills: ['Plumber', 'Pipe Fitting'],
      experience: 5,
      pricePerDay: 600,
      rating: 4.8,
      reviewsCount: 24,
      location: 'Andheri East, Mumbai',
      lat: 19.1136,
      lng: 72.8697,
      videoVerified: 'real',
      distance: '2.4 km',
      profilePic: 'https://i.pravatar.cc/150?img=11',
      isVerified: true
    },
    {
      id: 'w2',
      name: 'Suresh Singh',
      skills: ['Electrician', 'Wiring'],
      experience: 8,
      pricePerDay: 800,
      rating: 4.9,
      reviewsCount: 56,
      location: 'Borivali West, Mumbai',
      lat: 19.2288,
      lng: 72.8541,
      videoVerified: 'real',
      distance: '8.1 km',
      profilePic: 'https://i.pravatar.cc/150?img=12',
      isVerified: true
    },
    {
      id: 'w3',
      name: 'Amit Patel',
      skills: ['Mason', 'Construction'],
      experience: 3,
      pricePerDay: 500,
      rating: 4.2,
      reviewsCount: 8,
      location: 'Dadar, Mumbai',
      lat: 19.0176,
      lng: 72.8562,
      videoVerified: 'pending',
      distance: '12.5 km',
      profilePic: 'https://i.pravatar.cc/150?img=13',
      isVerified: false
    }
  ],
  
  jobs: [
    {
      id: 'j1',
      employerName: 'Sharma Builders',
      title: 'Need 2 Masons for Wall Construction',
      skillRequired: 'Mason',
      pricePerDay: 700,
      location: 'Bandra West, Mumbai',
      lat: 19.0596,
      lng: 72.8295,
      date: '2026-03-14',
      distance: '10.2 km',
      isVerified: true,
      status: 'open'
    },
    {
      id: 'j2',
      employerName: 'Sunil Gupta (Individual)',
      title: 'Urgent Wire fixing in Apartment',
      skillRequired: 'Electrician',
      pricePerDay: 600,
      location: 'Juhu, Mumbai',
      lat: 19.1075,
      lng: 72.8263,
      date: '2026-03-13',
      distance: '5.1 km',
      isVerified: false,
      status: 'open'
    },
    {
      id: 'j3',
      employerName: 'Green Energy Solutions',
      title: 'Solar Panel Installation Helpers',
      skillRequired: 'Solar Technician',
      pricePerDay: 1000,
      location: 'Goregaon, Mumbai',
      lat: 19.1663,
      lng: 72.8526,
      date: '2026-03-15',
      distance: '4.8 km',
      isVerified: true,
      status: 'open'
    }
  ],
  
  // Filters
  activeSkillFilter: 'All',
  setActiveSkillFilter: (filter) => set({ activeSkillFilter: filter }),
}));
