import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import TermsModal from '../components/layout/TermsModal';
import { Camera, MapPin, FileVideo, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

const Onboarding = () => {
  const { user, updateUser, acceptTerms } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showTerms, setShowTerms] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    skills: '', // comma separated for now
    businessName: '',
    gstin: '',
  });

  // Mock processing states
  const [isUploading, setIsUploading] = useState(false);

  // Redirect if no user or if already onboarded
  if (!user) {
    navigate('/login');
    return null;
  }
  
  if (user.accepted_terms) {
    navigate('/dashboard');
    return null;
  }

  const isWorker = user.role === 'worker';
  const totalSteps = isWorker ? 5 : 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Show terms modal at the very end
      setShowTerms(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleTermsAccept = () => {
    // Save all data
    updateUser({ ...formData, onboarding_complete: true });
    acceptTerms();
    toast.success('Onboarding complete! Welcome to Skillsetu.');
    setShowTerms(false);
    navigate('/dashboard');
  };

  const handleTermsDecline = () => {
    toast.error('You must accept the terms to use the platform.');
    setShowTerms(false);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      handleNext();
    }, 1200);
  };

  // --- Worker Steps ---
  const WorkerSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <Camera className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600">Click to upload Profile Photo</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Ramesh Kumar"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Skills</label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                rows="3"
                placeholder="e.g. Plumber, Electrician, Carpenter (comma separated)"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg mb-4 text-blue-800 text-sm">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <p>Upload a short video (max 60s) showing you performing your skill. This will be verified by our AI.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
              <FileVideo className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600">Select Skill Video</p>
              <p className="text-xs text-gray-400 mt-1">MP4, WebM (Max 50MB)</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg mb-4 text-green-800 text-sm border border-green-100">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-success" />
              <p>Upload your Aadhaar Card for identity verification. We use secure OCR to validate this.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
              <FileText className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600">Upload Aadhaar Front</p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="e.g. 9876543210"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                rows="2"
                placeholder="Enter your street address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center text-gray-500 text-sm border border-gray-200">
              <MapPin className="w-4 h-4 mr-2" />
              Location Pin (Map Placeholder)
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // --- Employer Steps ---
  const EmployerSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <Camera className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600">Click to upload Profile/Logo</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Input
              label="Your Name / Business Name"
              value={formData.businessName || formData.name}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              placeholder="e.g. Sharma Builders"
            />
            <Input
              label="GSTIN (Optional for individuals)"
              value={formData.gstin}
              onChange={(e) => setFormData({...formData, gstin: e.target.value})}
              placeholder="e.g. 29ABCDE1234F1Z5"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="e.g. 9876543210"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                rows="2"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center text-gray-500 text-sm border border-gray-200">
              <MapPin className="w-4 h-4 mr-2" />
              Location Pin (Map Placeholder)
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg mb-4 text-blue-800 text-sm border border-blue-100">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <p>Upload a Government ID (Aadhaar/PAN/Driving License) to verify your account.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
              <FileText className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600">Upload Govt ID</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto mb-6">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">
            {isWorker ? 'Worker Setup' : 'Employer Setup'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">
             {isWorker ? (
               step === 1 ? 'Profile Photo' :
               step === 2 ? 'Personal Details' :
               step === 3 ? 'Skill Verification' :
               step === 4 ? 'Identity Verification' :
               'Contact & Location'
             ) : (
               step === 1 ? 'Profile/Logo' :
               step === 2 ? 'Business Details' :
               step === 3 ? 'Contact & Location' :
               'Identity Verification'
             )}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {isWorker ? <WorkerSteps /> : <EmployerSteps />}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            disabled={step === 1 || isUploading}
          >
            Back
          </Button>
          <Button 
            variant="primary" 
            onClick={[1, 3, 4].includes(step) ? simulateUpload : handleNext}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : step === totalSteps ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>

      <TermsModal 
        isOpen={showTerms} 
        onAccept={handleTermsAccept}
        onDecline={handleTermsDecline}
      />
    </div>
  );
};

export default Onboarding; 