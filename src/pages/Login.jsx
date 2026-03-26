import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    const { error } = await login(email, password);
    
    if (error) {
      toast.error(error.message || 'Login failed');
    } else {
      toast.success('Logged in successfully!');
      // Assuming Admin email format checking in store
      if (email === 'prathamw092@gmail.com') {
        navigate('/admin/dashboard');
      } else {
        // Mock checking terms later, for now go to dashboard
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Sign in to your Skillsetu account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Enter your password"
              required
              fullWidth
            />

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              className="mt-6 py-2.5"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Helper for mock admin */}
          <div className="mt-6 bg-primary/5 p-3 rounded-lg text-xs text-primary border border-primary/10">
            <p className="font-semibold mb-1">Demo Accounts:</p>
            <p className="mb-0.5">• Admin: prathamw092@gmail.com / pratham01</p>
            <p className="mb-0.5">• Worker: worker@demo.com / password</p>
            <p>• Employer: employer@demo.com / password</p>
          </div>
        </CardContent>

        <CardFooter className="justify-center bg-gray-50 border-t border-gray-100 py-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-blue-800 transition-colors">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
