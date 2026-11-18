import React, { useState } from 'react';
import { seniorService } from '../services/seniorService';

export function SeniorForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    phone: '',
    relationship: 'Father',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.address || !formData.phone) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await seniorService.createSenior(formData);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to create senior profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-[#26342A] mb-1">Full Name *</label>
        <input
          type="text"
          placeholder="e.g., Ramesh Sharma"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#26342A] mb-1">Age *</label>
          <input
            type="number"
            placeholder="72"
            min="50"
            max="120"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#26342A] mb-1">Relationship</label>
          <select
            value={formData.relationship}
            onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm bg-white"
          >
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Grandfather">Grandfather</option>
            <option value="Grandmother">Grandmother</option>
            <option value="Uncle">Uncle</option>
            <option value="Aunt">Aunt</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#26342A] mb-1">Address *</label>
        <input
          type="text"
          placeholder="e.g., Greater Kailash Part 1, New Delhi"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#26342A] mb-1">Phone Number *</label>
        <input
          type="tel"
          placeholder="9876543210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm"
          required
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E9EDE8]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-semibold text-[#89928A] hover:bg-gray-100 rounded-xl transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#4F914D] hover:bg-[#437d41] text-white font-semibold text-sm rounded-xl shadow-sm transition-all disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Senior'}
        </button>
      </div>
    </form>
  );
}
