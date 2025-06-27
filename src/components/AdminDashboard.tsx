import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, LogOut, Settings, DollarSign, BarChart3, Plus, Edit, Trash2 } from 'lucide-react';
import { User } from '../types';
import AddFlightModal from './AddFlight';
import AddFareModal from './AddFares';

interface AdminDashboardProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const AdminDashboard = ({ user, onLogout, onNavigate }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'flights' | 'fares' | 'bookings'>('overview');
  const [stats] = useState({
    totalBookings: 1247,
    totalFlights: 89,
    totalRevenue: 2435000,
    activeRoutes: 25
  });

  const mockFlights = [
    { id: 1, flightNumber: 'VI-101', route: 'Delhi - Mumbai', status: 'Active', seats: 180 },
    { id: 2, flightNumber: 'VI-205', route: 'Mumbai - Bangalore', status: 'Active', seats: 150 },
    { id: 3, flightNumber: 'VI-308', route: 'Kolkata - Chennai', status: 'Maintenance', seats: 200 }
  ];

  const mockFares = [
    { id: 1, route: 'Delhi - Mumbai', economy: 5500, business: 12000, first: 25000 },
    { id: 2, route: 'Mumbai - Bangalore', economy: 4800, business: 10500, first: 22000 },
    { id: 3, route: 'Kolkata - Chennai', economy: 6200, business: 13500, first: 28000 }
  ];

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddFareModal, setShowAddFareModal] = useState(false);
  const [flights, setFlights] = useState(mockFlights);
  const [fares, setFares] = useState(mockFares);

  const handleFlightAdded = (newFlight) => {
    setFlights([...flights, newFlight]);
  };

  const handleFareAdded = (newFare) => {
    setFares([...fares, newFare]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Plane className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Vimana Admin</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
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
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => setActiveTab('overview')}
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Overview
          </Button>
          <Button
            onClick={() => setActiveTab('flights')}
            variant={activeTab === 'flights' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Plane className="w-4 h-4" />
            Manage Flights
          </Button>
          <Button
            onClick={() => setActiveTab('fares')}
            variant={activeTab === 'fares' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Manage Fares
          </Button>
          <Button
            onClick={() => setActiveTab('bookings')}
            variant={activeTab === 'bookings' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Booking Stats
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Bookings</p>
                      <p className="text-3xl font-bold">{stats.totalBookings.toLocaleString()}</p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Active Flights</p>
                      <p className="text-3xl font-bold">{stats.totalFlights}</p>
                    </div>
                    <Plane className="w-12 h-12 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Revenue</p>
                      <p className="text-3xl font-bold">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
                    </div>
                    <DollarSign className="w-12 h-12 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Active Routes</p>
                      <p className="text-3xl font-bold">{stats.activeRoutes}</p>
                    </div>
                    <Settings className="w-12 h-12 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'flights' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Flight Management</h2>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="w-4 h-4" />
                Add Flight
              </Button>
            </div>
            <AddFlightModal
              open={showAddModal}
              onClose={() => setShowAddModal(false)}
              onFlightAdded={handleFlightAdded}
            />
            <div className="space-y-4">
              {flights.map((flight) => (
                <Card key={flight.id} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Plane className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{flight.flightNumber}</h3>
                          <p className="text-gray-600">{flight.route}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Seats</p>
                          <p className="font-semibold">{flight.seats}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Status</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            flight.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {flight.status}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-red-50 hover:border-red-300 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fares' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Fare Management</h2>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                onClick={() => setShowAddFareModal(true)}
              >
                <Plus className="w-4 h-4" />
                Add Fare
              </Button>
            </div>
            <AddFareModal
              open={showAddFareModal}
              onClose={() => setShowAddFareModal(false)}
              onFareAdded={handleFareAdded}
            />
            <div className="space-y-4">
              {fares.map((fare) => (
                <Card key={fare.id} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{fare.route}</h3>
                        <div className="flex gap-6 mt-2">
                          <div>
                            <p className="text-sm text-gray-500">Economy</p>
                            <p className="font-semibold text-green-600">₹{fare.economy ? fare.economy.toLocaleString() : '-'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Business</p>
                            <p className="font-semibold text-blue-600">{fare.business ? `₹${fare.business.toLocaleString()}` : '-'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">First Class</p>
                            <p className="font-semibold text-purple-600">{fare.first ? `₹${fare.first.toLocaleString()}` : '-'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="hover:bg-red-50 hover:border-red-300 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Booking Statistics</h2>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-4">
                    {stats.totalBookings.toLocaleString()}
                  </div>
                  <p className="text-gray-600">Total number of bookings processed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
