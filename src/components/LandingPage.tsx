import { Plane, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import backgroundImg from '@/asset/background.jpg'; // <-- Add this import

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
   
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        {/* Logo and Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-16 h-16 text-yellow-400 mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Vimana
            </h1>
          </div>
          <p className="text-xl text-blue-100 mb-2">Premium Airline Booking Experience</p>
          <p className="text-lg text-blue-200">Soar Beyond Boundaries</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-blue-100">Book flights in minutes with our intuitive interface</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
            <p className="text-blue-100">Experience luxury travel with our premium services</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-blue-100">Round-the-clock assistance for all your travel needs</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-x-4">
          <Button 
            onClick={() => onNavigate('login')}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold px-8 py-3 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => onNavigate('register')}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full text-lg transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default LandingPage;
