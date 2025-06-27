import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/api';

interface Fare {
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  basePrice: number;
  taxAmount: number;
  serviceFee: number;
  fuelSurcharge: number;
  totalFare: number;
  discountedFare: number;
  discountCode: string;
  discountAmount: number;
  passengerCount: number;
  farePerPassenger: number;
}

interface AddFareModalProps {
  open: boolean;
  onClose: () => void;
  onFareAdded: (fare: Fare) => void;
}

export default function AddFareModal({ open, onClose, onFareAdded }: AddFareModalProps) {
  const [form, setForm] = useState({
    flightNumber: '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    basePrice: '',
    taxAmount: '',
    serviceFee: '',
    fuelSurcharge: '',
    totalFare: '',
    discountedFare: '',
    discountCode: '',
    discountAmount: '',
    passengerCount: '',
    farePerPassenger: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Prepare DTO for backend
      const dto = {
        ...form,
        basePrice: parseFloat(form.basePrice),
        taxAmount: parseFloat(form.taxAmount),
        serviceFee: parseFloat(form.serviceFee),
        fuelSurcharge: parseFloat(form.fuelSurcharge),
        totalFare: parseFloat(form.totalFare),
        discountedFare: parseFloat(form.discountedFare),
        discountAmount: parseFloat(form.discountAmount),
        passengerCount: parseInt(form.passengerCount),
        farePerPassenger: parseFloat(form.farePerPassenger),
      };
      const response = await api.post('/api/fares', dto);
      onFareAdded(response.data);
      onClose();
    } catch (err) {
      setError('Failed to add fare');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <div className="text-lg font-semibold mb-4">Add Fare for Flight</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="flightNumber" value={form.flightNumber} onChange={handleChange} placeholder="Flight Number" required />
        <Input name="departureCity" value={form.departureCity} onChange={handleChange} placeholder="Departure City" required />
        <Input name="arrivalCity" value={form.arrivalCity} onChange={handleChange} placeholder="Arrival City" required />
        <Input name="departureDate" type="date" value={form.departureDate} onChange={handleChange} required />
        <Input name="basePrice" type="number" value={form.basePrice} onChange={handleChange} placeholder="Base Price" required />
        <Input name="taxAmount" type="number" value={form.taxAmount} onChange={handleChange} placeholder="Tax Amount" required />
        <Input name="serviceFee" type="number" value={form.serviceFee} onChange={handleChange} placeholder="Service Fee" required />
        <Input name="fuelSurcharge" type="number" value={form.fuelSurcharge} onChange={handleChange} placeholder="Fuel Surcharge" required />
        <Input name="totalFare" type="number" value={form.totalFare} onChange={handleChange} placeholder="Total Fare" required />
        <Input name="discountedFare" type="number" value={form.discountedFare} onChange={handleChange} placeholder="Discounted Fare" required />
        <Input name="discountCode" value={form.discountCode} onChange={handleChange} placeholder="Discount Code" />
        <Input name="discountAmount" type="number" value={form.discountAmount} onChange={handleChange} placeholder="Discount Amount" />
        <Input name="passengerCount" type="number" value={form.passengerCount} onChange={handleChange} placeholder="Passenger Count" required />
        <Input name="farePerPassenger" type="number" value={form.farePerPassenger} onChange={handleChange} placeholder="Fare Per Passenger" required />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Fare'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}