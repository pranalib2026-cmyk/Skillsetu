import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ShieldCheck, Video, MapPin, HardHat, Sparkles } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-[80vh]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-8 border border-primary/10 shadow-sm">
          <Sparkles size={16} className="text-cta fill-cta" />
          <span>India's Verified Rural Skill Exchange</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl mb-6 leading-tight">
          Connecting <span className="text-primary">Skilled Workers</span> with <span className="text-secondary">Local Employers</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mb-10">
          A secure, verified platform for daily wage labor. We verify skills through video AI and identity through Aadhaar, ensuring trust and quality for every job.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto px-8 bg-primary hover:bg-primary/90">Find Work</Button>
          </Link>
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 text-secondary border-secondary hover:bg-secondary/5 focus:ring-secondary">Hire Workers</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-y border-gray-100 px-4 rounded-3xl mb-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Skillsetu?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary transition-colors hover:shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-primary mb-4">
                <Video size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Video Verification</h3>
              <p className="text-gray-600">Every worker's skill is verified through 60-second video uploads, analyzed for authenticity and deepfakes.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-secondary transition-colors hover:shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-secondary mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aadhaar Secured</h3>
              <p className="text-gray-600">All users undergo mandatory identity verification via OCR processing of government-issued IDs, ensuring safety.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-accent transition-colors hover:shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-accent mb-4">
                <HardHat size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Booking</h3>
              <p className="text-gray-600">Clear daily-wage pricing. One booking equals one working day. Rate workers based on 5 dimensions of quality.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
