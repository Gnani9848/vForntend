
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, User, Calendar, Clock, MapPin, IndianRupee, CreditCard, CheckCircle } from 'lucide-react';
import { Flight, User as UserType, Passenger } from '../types';

interface BookingPageProps {
  flight: Flight | null;
  user: UserType | null;
  onNavigate: (page: string) => void;
}

const BookingPage = ({ flight, user, onNavigate }: BookingPageProps) => {
  const [passengers, setPassengers] = useState<Passenger[]>([
    { passengerName: '', age: 0, gender: '', passportNumber: '' }
  ]);
  const [fareClass, setFareClass] = useState('Economy');
  const [paymentId, setPaymentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string | number) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { passengerName: '', age: 0, gender: '', passportNumber: '' }]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const calculateTotalFare = () => {
    if (!flight) return 0;
    
    const basePrice = flight.fareAmount;
    const multiplier = fareClass === 'Business' ? 2.2 : fareClass === 'First' ? 4.5 : 1;
    return Math.round(basePrice * multiplier * passengers.length);
  };

  const handleBooking = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock booking response
      const mockBooking = {
        pnr: 'PNR' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        flightNumber: flight?.flightNumber,
        departureCity: flight?.departureCity,
        arrivalCity: flight?.arrivalCity,
        departureDate: flight?.departureDate,
        departureTime: flight?.departureTime,
        arrivalDate: flight?.arrivalDate,
        arrivalTime: flight?.arrivalTime,
        bookingStatus: 'CONFIRMED',
        totalFare: calculateTotalFare(),
        numberOfPassengers: passengers.length,
        passengers: passengers,
        bookingDate: new Date().toISOString().split('T')[0],
        bookingTime: new Date().toTimeString().split(' ')[0],
        userId: user?.userId,
        fareClass: fareClass
      };
      
      setBookingDetails(mockBooking);
      setBookingComplete(true);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!flight) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600 mb-4">No flight selected</p>
            <Button onClick={() => onNavigate('user-dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingComplete && bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold">Booking Confirmed!</CardTitle>
              <p className="text-green-100">Your flight has been successfully booked</p>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Booking Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">PNR Number</p>
                    <p className="font-bold text-blue-600">{bookingDetails.pnr}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Flight Number</p>
                    <p className="font-semibold">{bookingDetails.flightNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Route</p>
                    <p className="font-semibold">{bookingDetails.departureCity} → {bookingDetails.arrivalCity}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-semibold">{bookingDetails.departureDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Departure Time</p>
                    <p className="font-semibold">{bookingDetails.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Arrival Time</p>
                    <p className="font-semibold">{bookingDetails.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fare Class</p>
                    <p className="font-semibold">{bookingDetails.fareClass}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Fare</p>
                    <p className="font-bold text-green-600 text-lg">₹{bookingDetails.totalFare.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Passenger Details</h3>
                <div className="space-y-2">
                  {bookingDetails.passengers.map((passenger: Passenger, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-semibold">{passenger.passengerName}</span>
                      <span className="text-sm text-gray-500">Age: {passenger.age}, {passenger.gender}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={() => onNavigate('user-dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={() => onNavigate('user-dashboard')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Search
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Complete Your Booking</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flight Details */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-blue-600" />
                  Flight Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{flight.flightNumber}</h3>
                  <p className="text-gray-600">{flight.airline}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{flight.departureCity} → {flight.arrivalCity}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{flight.departureDate}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{flight.departureTime} - {flight.arrivalTime}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Base Fare</span>
                    <span>₹{flight.fareAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Passengers</span>
                    <span>{passengers.length}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Class</span>
                    <span>{fareClass}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-green-600 flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {calculateTotalFare().toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fare Class Selection */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Select Fare Class</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={fareClass} onValueChange={setFareClass}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy - ₹{flight.fareAmount.toLocaleString()}</SelectItem>
                    <SelectItem value="Business">Business - ₹{Math.round(flight.fareAmount * 2.2).toLocaleString()}</SelectItem>
                    <SelectItem value="First">First Class - ₹{Math.round(flight.fareAmount * 4.5).toLocaleString()}</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Passenger Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Passenger Details</CardTitle>
                  <Button onClick={addPassenger} variant="outline" size="sm">
                    Add Passenger
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Passenger {index + 1}
                        </h4>
                        {passengers.length > 1 && (
                          <Button
                            onClick={() => removePassenger(index)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Full Name"
                          value={passenger.passengerName}
                          onChange={(e) => handlePassengerChange(index, 'passengerName', e.target.value)}
                          className="h-10"
                        />
                        
                        <Input
                          type="number"
                          placeholder="Age"
                          value={passenger.age || ''}
                          onChange={(e) => handlePassengerChange(index, 'age', parseInt(e.target.value) || 0)}
                          className="h-10"
                        />
                        
                        <Select
                          value={passenger.gender}
                          onValueChange={(value) => handlePassengerChange(index, 'gender', value)}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Input
                          placeholder="Passport Number"
                          value={passenger.passportNumber}
                          onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                          className="h-10"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Payment ID (Demo: PAYMENT123)"
                    value={paymentId}
                    onChange={(e) => setPaymentId(e.target.value)}
                    className="h-12"
                  />
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Demo Mode:</strong> Enter any payment ID to simulate payment processing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Button */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Button
                  onClick={handleBooking}
                  disabled={loading || !paymentId || passengers.some(p => !p.passengerName || !p.age || !p.gender || !p.passportNumber)}
                  className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg rounded-lg shadow-lg"
                >
                  {loading ? 'Processing Booking...' : `Confirm Booking - ₹${calculateTotalFare().toLocaleString()}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
