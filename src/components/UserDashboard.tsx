import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Search, LogOut, Calendar, Users, MapPin, Clock, IndianRupee } from 'lucide-react';
import { User, Flight, SearchParams } from '../types';
import { searchFlights, advancedSearchFlights } from '@/services/searchservice';

interface UserDashboardProps {
  user: User | null;
  onLogout: () => void;
  onFlightSelect: (flight: Flight) => void;
  searchResults: Flight[];
  setSearchResults: (flights: Flight[]) => void;
}

const UserDashboard = ({ user, onLogout, onFlightSelect, searchResults, setSearchResults }: UserDashboardProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    numberOfPassengers: 1,
    fareClass: 'Economy',
    maxPrice: undefined
  });
  const [searchType, setSearchType] = useState<'normal' | 'advanced'>('normal');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof SearchParams, value: string | number) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Ensure date is in YYYY-MM-DD
      let departureDate = searchParams.departureDate;
      if (departureDate && departureDate.includes('-')) {
        // If user types DD-MM-YYYY, convert to YYYY-MM-DD
        const parts = departureDate.split('-');
        if (parts[0].length === 2 && parts[2].length === 4) {
          departureDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }

      const criteria = {
        departureCity: searchParams.departureCity,
        arrivalCity: searchParams.arrivalCity,
        departureDate, // always YYYY-MM-DD
        passengers: searchParams.numberOfPassengers,
        travelClass: searchParams.fareClass,
      };

      let results = [];
      if (searchType === 'normal') {
        results = await searchFlights(criteria);
      } else {
        const airlines = [];
        const minPrice = 0;
        const maxPrice = searchParams.maxPrice || 999999;
        results = await advancedSearchFlights(criteria, airlines, minPrice, maxPrice);
      }

      // Map backend results to frontend Flight[]
      type BackendFlight = {
        flightId?: string | number;
        flightNumber: string;
        departureCity: string;
        arrivalCity: string;
        departureDate: string;
        departureTime: string;
        arrivalDate: string;
        arrivalTime: string;
        availableSeats: number;
        basePrice: number;
        finalPrice?: number;
        airline: string;
      };

      const flights = (results as BackendFlight[]).map((f) => ({
        flightId: f.flightId?.toString() || '',
        flightNumber: f.flightNumber,
        departureCity: f.departureCity,
        arrivalCity: f.arrivalCity,
        departureDate: f.departureDate,
        departureTime: f.departureTime,
        arrivalDate: f.arrivalDate,
        arrivalTime: f.arrivalTime,
        availableSeats: f.availableSeats,
        fareAmount: f.finalPrice ?? f.basePrice,
        airline: f.airline,
      }));
      setSearchResults(flights);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Plane className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Vimana</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
              <Search className="w-6 h-6 text-blue-600" />
              Search Flights
            </CardTitle>
            <div className="flex gap-4">
              <Button
                onClick={() => setSearchType('normal')}
                variant={searchType === 'normal' ? 'default' : 'outline'}
                className="rounded-full"
              >
                Normal Search
              </Button>
              <Button
                onClick={() => setSearchType('advanced')}
                variant={searchType === 'advanced' ? 'default' : 'outline'}
                className="rounded-full"
              >
                Advanced Search
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Departure City"
                  value={searchParams.departureCity}
                  onChange={(e) => handleInputChange('departureCity', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Arrival City"
                  value={searchParams.arrivalCity}
                  onChange={(e) => handleInputChange('arrivalCity', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="9"
                  placeholder="Passengers"
                  value={searchParams.numberOfPassengers}
                  onChange={(e) => handleInputChange('numberOfPassengers', parseInt(e.target.value))}
                  className="pl-10 h-12"
                />
              </div>
              
              <Select value={searchParams.fareClass} onValueChange={(value) => handleInputChange('fareClass', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Fare Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="First">First Class</SelectItem>
                </SelectContent>
              </Select>
              
              {searchType === 'advanced' && (
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="Max Price (₹)"
                    value={searchParams.maxPrice || ''}
                    onChange={(e) => handleInputChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="pl-10 h-12"
                  />
                </div>
              )}
            </div>
            
            <Button
              onClick={handleSearch}
              disabled={loading || !searchParams.departureCity || !searchParams.arrivalCity || !searchParams.departureDate}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg"
            >
              {loading ? 'Searching...' : 'Search Flights'}
            </Button>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Flights</h2>
            {searchResults.map((flight) => (
              <Card key={flight.flightId} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Plane className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{flight.flightNumber}</h3>
                          <p className="text-gray-600">{flight.airline}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Departure</p>
                          <p className="font-semibold text-gray-800">{flight.departureCity}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {flight.departureTime}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Arrival</p>
                          <p className="font-semibold text-gray-800">{flight.arrivalCity}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {flight.arrivalTime}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Available Seats</p>
                          <p className="font-semibold text-green-600">{flight.availableSeats}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Fare</p>
                          <p className="font-bold text-2xl text-blue-600 flex items-center">
                            <IndianRupee className="w-5 h-5" />
                            {flight.fareAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <Button
                        onClick={() => onFlightSelect(flight)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
