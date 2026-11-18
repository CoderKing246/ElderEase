import React, { useState } from 'react';
import { requestService } from '../services/requestService';

export function RequestForm({ seniors, preselectedSeniorId, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    seniorId: preselectedSeniorId || (seniors.length > 0 ? seniors[0].id : ''),
    requestType: 'GROCERY',
    description: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '10:00',
    durationMinutes: 60,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.seniorId || !formData.requestType || !formData.description || !formData.scheduledDate || !formData.scheduledTime) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await requestService.createRequest(formData);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to create assistance request.');
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
        <label className="block text-xs font-semibold text-[#26342A] mb-1">Select Senior *</label>
        <select
          value={formData.seniorId}
          onChange={(e) => setFormData({ ...formData, seniorId: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm bg-white"
          required
        >
          <option value="">-- Choose Senior --</option>
          {seniors.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.relationship || 'Senior'})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#26342A] mb-1">Assistance Category *</label>
        <select
          value={formData.requestType}
          onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm bg-white"
          required
        >
          <option value="GROCERY">Grocery Assistance</option>
          <option value="COMPANIONSHIP">Companionship Visit</option>
          <option value="MEDICAL">Medical Appointment Assistance</option>
          <option value="CHECKIN">Daily Check-in</option>
          <option value="HOUSEHOLD">Household Assistance</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#26342A] mb-1">Description / Instructions *</label>
        <textarea
          rows="3"
          placeholder="Provide specific instructions or details for the helper..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#26342A] mb-1">Scheduled Date *</label>
          <input
            type="date"
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#26342A] mb-1">Scheduled Time *</label>
          <input
            type="time"
            value={formData.scheduledTime}
            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#26342A] mb-1">Duration (Minutes)</label>
        <input
          type="number"
          step="15"
          min="15"
          max="480"
          value={formData.durationMinutes}
          onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
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
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
}
