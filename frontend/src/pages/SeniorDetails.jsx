import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Plus } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { formatRequestType } from '../utils/requestTypeMapper';
import { formatDate, formatTime } from '../utils/formatters';

export function SeniorDetails({ seniors, requests, onOpenNewRequestForSenior }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [senior, setSenior] = useState(null);

  useEffect(() => {
    const found = seniors.find((s) => String(s.id) === String(id));
    setSenior(found || null);
  }, [id, seniors]);

  if (!senior) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-[#E9EDE8]">
        <h3 className="text-lg font-bold text-[#26342A]">Senior not found</h3>
        <p className="text-sm text-[#89928A] mt-1">The requested senior profile does not exist.</p>
        <Link to="/seniors" className="inline-block mt-4 px-4 py-2 bg-[#4F914D] text-white rounded-xl text-sm font-semibold">
          Back to Seniors
        </Link>
      </div>
    );
  }

  const seniorRequests = requests.filter((r) => Number(r.seniorId) === Number(senior.id));

  return (
    <div className="space-y-6 animate-fadeIn">
      <button
        onClick={() => navigate('/seniors')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#89928A] hover:text-[#26342A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Seniors
      </button>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E9EDE8] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#EDF5EB] text-[#4F914D] font-bold text-3xl flex items-center justify-center shrink-0">
            {senior.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-[#26342A]">{senior.name}</h2>
              <span className="px-3 py-0.5 bg-[#EDF5EB] text-[#4F914D] text-xs font-semibold rounded-full">
                {senior.relationship || 'Senior'}
              </span>
            </div>
            <p className="text-sm text-[#89928A] mt-1">Age: {senior.age} years old</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-[#89928A]">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#4F914D]" /> {senior.address}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-[#4F914D]" /> {senior.phone}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onOpenNewRequestForSenior(senior.id)}
          className="px-5 py-3 bg-[#4F914D] hover:bg-[#437d41] text-white font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Assistance Request
        </button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E9EDE8] shadow-2xs">
        <h3 className="text-lg font-bold text-[#26342A] mb-4">Assistance Requests for {senior.name}</h3>
        
        {seniorRequests.length === 0 ? (
          <p className="text-sm text-[#89928A] py-8 text-center bg-[#F7F8F6]/50 rounded-xl border border-dashed border-[#E9EDE8]">
            No assistance requests recorded for this senior yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E9EDE8] text-xs font-semibold text-[#89928A]">
                  <th className="py-3 px-3">Request ID</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Description</th>
                  <th className="py-3 px-3">Scheduled</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9EDE8] text-sm">
                {seniorRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-[#26342A]">#{req.id}</td>
                    <td className="py-3.5 px-3 font-medium text-[#26342A]">{formatRequestType(req.requestType)}</td>
                    <td className="py-3.5 px-3 text-[#89928A] max-w-xs truncate">{req.description}</td>
                    <td className="py-3.5 px-3 text-[#89928A]">{formatDate(req.scheduledDate)} at {formatTime(req.scheduledTime)}</td>
                    <td className="py-3.5 px-3"><StatusBadge status={req.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
