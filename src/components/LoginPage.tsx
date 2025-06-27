import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plane, Lock, User } from 'lucide-react';
import { User as UserType } from '../types';
import { authService } from '@/services/authService';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (user: UserType, token: string) => void;
}

const LoginPage = ({ onNavigate, onLogin }: LoginPageProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try backend login first
      const data = await authService.login(formData);
      // Construct user object from backend response
      const user = {
        userId: '', // You can fetch userId if needed from backend
        username: data.username,
        name: data.username, // Or fetch/display name if available
        email: '', // If not returned, leave blank or fetch separately
        role: data.role ? data.role.toUpperCase() : '' // <-- Normalize to uppercase
      };
      onLogin(user, data.token);
    } catch (err) {
      // If backend fails, use mock data
      console.warn('Backend login failed, using mock data:', err);

      // Only allow mock login for known users
      if (
        (formData.username === 'user' && formData.password === 'password') ||
        (formData.username === 'admin' && formData.password === 'admin')
      ) {
        const mockUser: UserType = {
          userId: '1',
          username: formData.username,
          name: formData.username === 'admin' ? 'Administrator' : 'John Doe',
          email: formData.username === 'admin' ? 'admin@vimana.com' : 'user@vimana.com',
          role: formData.username === 'admin' ? 'ADMIN' : 'USER'
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        onLogin(mockUser, mockToken);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('landing')}
          className="text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center mb-4">
              <Plane className="w-8 h-8 text-blue-600 mr-2" />
              <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
            </div>
            <p className="text-gray-600">Sign in to your Vimana account</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('register')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </div>

            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>User: username: "user", password: "password"</p>
              <p>Admin: username: "admin", password: "admin"</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
