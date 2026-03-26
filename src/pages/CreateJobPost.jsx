import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Briefcase, MapPin, IndianRupee } from 'lucide-react';

const CreateJobPost = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hardcoded for demo
  const allSkills = [
    'Plumber', 'Electrician', 'Mason', 'Solar Technician', 
    'Carpenter', 'Painter', 'Welder', 'Helper', 'Driver'
  ];

  // Suggested Prices mapped to skills
  const suggestedPrices = {
    'Plumber': '₹500 - ₹800',
    'Mason': '₹600 - ₹1000',
    'Electrician': '₹500 - ₹900',
    'Solar Technician': '₹700 - ₹1200',
    'Carpenter': '₹500 - ₹800',
    'Painter': '₹400 - ₹700',
  };

  const [formData, setFormData] = useState({
    title: '',
    skillRequired: '',
    description: '',
    pricePerDay: '',
    locationAddress: '',
    contactNumber: user?.phone || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.skillRequired || !formData.pricePerDay || !formData.locationAddress) {
      toast.error('Please fill all mandatory fields');
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      toast.success('Job post created successfully!');
      setIsSubmitting(false);
      navigate('/jobs');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="text-primary" />
          Post a New Job
        </h1>
        <p className="text-gray-500 mt-1">Fill in the details to find skilled workers for your task.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <Input
              label="Job Title *"
              placeholder="e.g. Need 2 Masons for Foundation Work"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skill *</label>
                <select 
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border bg-white"
                  value={formData.skillRequired}
                  onChange={e => setFormData({...formData, skillRequired: e.target.value})}
                  required
                >
                  <option value="" disabled>Select a skill</option>
                  {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                  <span>Price per Day (₹) *</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm pl-9 py-2 border"
                    placeholder="e.g. 600"
                    value={formData.pricePerDay}
                    onChange={e => setFormData({...formData, pricePerDay: e.target.value})}
                    required
                  />
                </div>
                {formData.skillRequired && suggestedPrices[formData.skillRequired] && (
                  <p className="text-[11px] text-accent mt-1 flex justify-end font-medium">
                    Suggested: {suggestedPrices[formData.skillRequired]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                rows="4"
                placeholder="Describe the work in detail (materials, timeline, specific requirements)..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Location *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <MapPin size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm pl-9 py-2 border"
                    placeholder="e.g. Bandra West, Mumbai"
                    value={formData.locationAddress}
                    onChange={e => setFormData({...formData, locationAddress: e.target.value})}
                    required
                  />
                </div>
              </div>

              <Input
                label="Contact Number *"
                placeholder="10-digit number"
                type="tel"
                value={formData.contactNumber}
                onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 bg-gray-50">
            <Button variant="ghost" type="button" onClick={() => navigate(-1)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Publish Job Post'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateJobPost;
