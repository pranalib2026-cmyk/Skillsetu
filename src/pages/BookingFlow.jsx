import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useFeedStore } from '../store/feedStore';
import toast from 'react-hot-toast';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Calendar, IndianRupee, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

const BookingFlow = () => {
  const { id } = useParams(); // URL format: /book/:workerId
  const { workers } = useFeedStore();
  const worker = workers.find(w => w.id === id) || workers[0];
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const PLATFORM_FEE = 50; 
  const totalAmount = worker.pricePerDay + PLATFORM_FEE;

  const handleProceedToPay = () => {
    if (!selectedDate) {
      toast.error('Please select a date for the work');
      return;
    }
    setShowRazorpay(true);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    
    // Simulate Razorpay success
    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpay(false);
      toast.success('Payment Successful! Worker has been booked.', { duration: 4000 });
      navigate('/dashboard'); // Go back to dashboard to see booking
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Complete Booking</h1>
      
      <div className="space-y-6">
        {/* Worker Summary */}
        <Card className="bg-blue-50/50 border-blue-100">
          <CardContent className="p-4 flex gap-4 items-center">
            <img src={worker.profilePic} alt={worker.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
            <div>
               <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
                 {worker.name}
                 {worker.isVerified && <ShieldCheck size={16} className="text-success fill-success/10" />}
               </h3>
               <p className="text-sm text-gray-600 mb-1">{worker.skills[0]}</p>
               <div className="text-xs text-gray-500 flex items-center gap-1">
                 <MapPin size={12} /> {worker.location}
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card>
          <CardHeader>
             <CardTitle className="text-lg">Select Working Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                <Calendar />
              </div>
              <div className="flex-1">
                <input
                  type="date"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setSelectedDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
               <CheckCircle2 size={12} className="text-success" /> One booking covers one full working day.
            </p>
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
          <CardHeader>
             <CardTitle className="text-lg">Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Daily Wage (1 Day)</span>
              <span className="font-medium">₹{worker.pricePerDay}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Platform Service Fee</span>
              <span className="font-medium">₹{PLATFORM_FEE}</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between text-gray-900 font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-accent">₹{totalAmount}</span>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50">
             <Button variant="primary" fullWidth size="lg" onClick={handleProceedToPay}>
                Pay ₹{totalAmount} Securely
             </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Simulated Razorpay Modal */}
      <Modal 
        isOpen={showRazorpay} 
        onClose={() => !isProcessing && setShowRazorpay(false)} 
        title="Secure Payment"
      >
         <div className="text-center pb-4">
            <div className="bg-blue-600 text-white p-4 rounded-xl mb-6 shadow-sm flex justify-between items-center">
               <div className="text-left">
                 <div className="text-sm opacity-80 mb-1">Skillsetu Escrow</div>
                 <div className="font-medium truncate max-w-[200px]">Booking: {worker.name}</div>
               </div>
               <div className="text-2xl font-bold">₹{totalAmount}</div>
            </div>
            
            <div className="space-y-3 mb-6">
              <Button variant="outline" fullWidth className="justify-start py-3" onClick={handleSimulatePayment} disabled={isProcessing}>
                 💳 Pay via Credit / Debit Card
              </Button>
              <Button variant="outline" fullWidth className="justify-start py-3" onClick={handleSimulatePayment} disabled={isProcessing}>
                 📱 Pay via UPI (GPay, PhonePe)
              </Button>
              <Button variant="outline" fullWidth className="justify-start py-3" onClick={handleSimulatePayment} disabled={isProcessing}>
                 🏦 Net Banking
              </Button>
            </div>
            
            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-4">
                 <div className="w-8 h-8 border-4 border-blue-200 border-t-primary rounded-full animate-spin mb-3"></div>
                 <p className="text-sm font-medium text-gray-600">Processing Payment...</p>
                 <p className="text-xs text-gray-400 mt-1">Please do not close this window</p>
              </div>
            )}
            
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-4 font-medium uppercase tracking-wider">
               <ShieldCheck size={14} /> 100% Secure Checkout
            </div>
         </div>
      </Modal>
    </div>
  );
};

export default BookingFlow;
