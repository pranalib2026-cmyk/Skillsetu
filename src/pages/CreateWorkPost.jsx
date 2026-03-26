import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Images, Calendar, UserCheck } from 'lucide-react';

const CreateWorkPost = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    employerName: '',
    workDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.workDate) {
      toast.error('Title and Date are required');
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      toast.success('Work post created successfully! It is now pending admin verification.');
      setIsSubmitting(false);
      navigate(`/worker/${user?.id}`);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Images className="text-primary" />
          Add to Portfolio
        </h1>
        <p className="text-gray-500 mt-1">Showcase your completed work to attract more employers.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {/* Image Upload Mock */}
             <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                <Images className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-600">Upload Work Photos</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG (Max 5 photos)</p>
             </div>

            <Input
              label="Project Title *"
              placeholder="e.g. Bathroom plumbing fix"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                rows="3"
                placeholder="Describe what you did..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Date *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm pl-9 py-2 border"
                    value={formData.workDate}
                    onChange={e => setFormData({...formData, workDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employer/Client Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <UserCheck size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm pl-9 py-2 border"
                    placeholder="Optional (For verification)"
                    value={formData.employerName}
                    onChange={e => setFormData({...formData, employerName: e.target.value})}
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  If provided, admins may call them to verify this post.
                </p>
              </div>
            </div>
            
          </CardContent>

          <CardFooter className="flex justify-end gap-3 bg-gray-50">
            <Button variant="ghost" type="button" onClick={() => navigate(-1)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Upload Work Post'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateWorkPost;
