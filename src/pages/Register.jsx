import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { UserPlus, HardHat, Building2 } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('worker'); // default role
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const { error } = await register(email, password, role);
    
    if (error) {
      toast.error(error.message || 'Registration failed');
    } else {
      toast.success('Account created successfully!');
      // Forward to onboarding
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Join Skillsetu platform today</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('worker')}
                  className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${
                    role === 'worker' 
                      ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary' 
                      : 'border-gray-200 hover:border-primary/20 text-gray-600'
                  }`}
                >
                  <HardHat className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Worker</span>
                  <span className="text-[10px] text-center mt-1 opacity-80">Looking for daily jobs</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${
                    role === 'employer' 
                      ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary' 
                      : 'border-gray-200 hover:border-primary/20 text-gray-600'
                  }`}
                >
                  <Building2 className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Employer</span>
                  <span className="text-[10px] text-center mt-1 opacity-80">Looking to hire</span>
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Input
                id="email"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                fullWidth
              />
              
              <Input
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min 6 chars)"
                required
                fullWidth
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              className="mt-6 py-2.5"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center bg-gray-50 border-t border-gray-100 py-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-blue-800 transition-colors">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
