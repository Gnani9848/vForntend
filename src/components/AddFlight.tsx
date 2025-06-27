import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog'; // Use Dialog as Modal
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';// Adjust import paths as needed
import { flightService } from '@/services/flightService';

interface Flight {
  flightNumber: string;
  airline: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  totalSeats: number;
  availableSeats: number;
  basePrice: number;
  isActive: boolean;
}

interface AddFlightModalProps {
  open: boolean;
  onClose: () => void;
  onFlightAdded: (flight: Flight) => void;
}

const AddFlightModal = ({ open, onClose, onFlightAdded }: AddFlightModalProps) => {
  const [form, setForm] = useState({
    flightNumber: '',
    airline: '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    totalSeats: 0,
    availableSeats: 0,
    basePrice: 0,
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? Number(value)
          : value,
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
        departureDate: form.departureDate, // YYYY-MM-DD
        arrivalDate: form.arrivalDate,     // YYYY-MM-DD
        departureTime: form.departureTime, // HH:mm
        arrivalTime: form.arrivalTime,     // HH:mm
      };
      const added = await flightService.createFlight(dto);
      onFlightAdded(added);
      onClose();
    } catch (err) {
      setError('Failed to add flight');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <div className="text-lg font-semibold mb-4">Add New Flight</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="flightNumber" value={form.flightNumber} onChange={handleChange} placeholder="Flight Number" required />
        <Input name="airline" value={form.airline} onChange={handleChange} placeholder="Airline" required />
        <Input name="departureCity" value={form.departureCity} onChange={handleChange} placeholder="Departure City" required />
        <Input name="arrivalCity" value={form.arrivalCity} onChange={handleChange} placeholder="Arrival City" required />
        <Input name="departureDate" type="date" value={form.departureDate} onChange={handleChange} required />
        <Input name="departureTime" type="time" value={form.departureTime} onChange={handleChange} required />
        <Input name="arrivalDate" type="date" value={form.arrivalDate} onChange={handleChange} required />
        <Input name="arrivalTime" type="time" value={form.arrivalTime} onChange={handleChange} required />
        <Input name="totalSeats" type="number" value={form.totalSeats} onChange={handleChange} placeholder="Total Seats" required />
        <Input name="availableSeats" type="number" value={form.availableSeats} onChange={handleChange} placeholder="Available Seats" required />
        <Input name="basePrice" type="number" value={form.basePrice} onChange={handleChange} placeholder="Base Price" required />
        <div>
          <label>
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />
            Active
          </label>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Flight'}</Button>
      </form>
    </Dialog>
  );
};

export default AddFlightModal;