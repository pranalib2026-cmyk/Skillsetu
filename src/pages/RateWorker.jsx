import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useFeedStore } from '../store/feedStore';
import { Star, MessageSquare } from 'lucide-react';

const RateWorker = () => {
  const { id } = useParams(); // URL format: /rate/:bookingId
  const { workers } = useFeedStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock finding worker based on booking ID
  const worker = workers[0]; 

  const dimensions = [
    { id: 'quality', label: 'Quality of Work', desc: 'How well was the job done?' },
    { id: 'speed', label: 'Speed', desc: 'Was it completed efficiently?' },
    { id: 'reliability', label: 'Reliability', desc: 'Did they show up on time and stick to the plan?' },
    { id: 'communication', label: 'Communication', desc: 'Were they easy to understand and talk to?' },
    { id: 'behavior', label: 'Professional Behavior', desc: 'Were they respectful and disciplined?' }
  ];

  const [ratings, setRatings] = useState({
    quality: 0,
    speed: 0,
    reliability: 0,
    communication: 0,
    behavior: 0
  });

  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (dimension, value) => {
    setRatings(prev => ({ ...prev, [dimension]: value }));
  };

  const calculateOverall = () => {
    const values = Object.values(ratings);
    const sum = values.reduce((a, b) => a + b, 0);
    return values.filter(v => v > 0).length === 5 ? (sum / 5).toFixed(1) : '—';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(ratings).some(val => val === 0)) {
      toast.error('Please rate all 5 dimensions.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Thank you! Your rating helps keep Skillsetu safe.');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  // Star Rating Component Internal
  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 leading-none transition-colors"
          >
            <Star 
              size={24} 
              className={`
                ${star <= value ? 'text-accent fill-accent' : 'text-gray-300'}
                hover:text-accent/80 transition-colors
              `}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
         <h1 className="text-2xl font-bold text-gray-900">Rate Your Experience</h1>
         <p className="text-gray-500 mt-2">How was your booking with {worker.name} on Mar 14, 2026?</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8 p-6 sm:p-8">
            {/* Dimensions List */}
            <div className="space-y-6">
               {dimensions.map(dim => (
                 <div key={dim.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5 last:border-0">
                    <div>
                      <h4 className="font-semibold text-gray-900">{dim.label}</h4>
                      <p className="text-sm text-gray-500">{dim.desc}</p>
                    </div>
                    <div>
                       <StarRating 
                         value={ratings[dim.id]} 
                         onChange={(val) => handleRatingChange(dim.id, val)}
                       />
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl flex justify-between items-center border border-orange-100">
               <span className="font-medium text-gray-700">Calculated Overall Score</span>
               <div className="text-2xl font-bold text-accent flex items-center gap-1">
                 {calculateOverall()} <Star size={20} className="fill-accent outline-none" />
               </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                 <MessageSquare size={16} className="text-gray-400" />
                 Written Review (Optional)
              </label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                rows="4"
                placeholder="Share any specific feedback about their work..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 bg-gray-50 p-6">
            <Button variant="ghost" type="button" onClick={() => navigate('/dashboard')}>Skip for now</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RateWorker;
