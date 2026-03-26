import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AlertTriangle, Upload, FileText } from 'lucide-react';

const Complaints = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    reportedUser: '',
    incidentDate: '',
    description: '',
    proof: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.reportedUser || !formData.description) {
      toast.error('Please provide the reported user and description.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Complaint filed successfully. Our admin team will review it shortly.');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="text-red-500" />
          File a Complaint
        </h1>
        <p className="text-gray-500 mt-1">If you faced any issue regarding payment, behavior, or false claims, please report it here. Our team investigates every report.</p>
      </div>

      <Card className="border-red-100 shadow-sm">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
               <Input
                 label="Who are you reporting? *"
                 placeholder="Name or Phone Number"
                 value={formData.reportedUser}
                 onChange={e => setFormData({...formData, reportedUser: e.target.value})}
                 required
               />
               <Input
                 type="date"
                 label="Date of Incident"
                 value={formData.incidentDate}
                 onChange={e => setFormData({...formData, incidentDate: e.target.value})}
               />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                 Description of Issue *
              </label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-3 border"
                rows="5"
                placeholder="Please describe exactly what happened..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                 Proof (Optional but recommended)
              </label>
              <div className="flex items-center gap-3">
                 <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 font-medium">Upload Photos or Screenshots</span>
                    <span className="text-xs text-gray-400">Max 5MB</span>
                 </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg flex gap-3 text-red-800 text-sm border border-red-100 mt-6">
               <FileText className="flex-shrink-0" size={20} />
               <p>False complaints are a violation of our Terms of Service. Please ensure all information provided is accurate and truthful.</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 bg-gray-50">
            <Button variant="ghost" type="button" onClick={() => navigate(-1)}>Cancel</Button>
            <Button variant="danger" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Complaints;
