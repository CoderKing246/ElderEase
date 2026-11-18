import React, { useState } from 'react';
import { Plus, Search, CheckCircle, XCircle, Play } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { formatRequestType } from '../utils/requestTypeMapper';
import { formatDate, formatTime } from '../utils/formatters';

export function AssistanceRequests({ requests, seniors, onOpenNewRequest, onAccept, onComplete, onCancel }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const getSeniorName = (seniorId) => {
    const s = seniors.find((item) => Number(item.id) === Number(seniorId));
    return s ? s.name : 'Unknown Senior';
  };

  const filteredRequests = requests.filter((req) => {
    const seniorName = getSeniorName(req.seniorId).toLowerCase();
    const matchesSearch = seniorName.includes(searchTerm.toLowerCase()) || String(req.id).includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#26342A]">Assistance Requests</h2>
          <p className="text-sm text-[#89928A]">Track status, manage care activities, and lifecycle transitions.</p>
        </div>
        <button
          onClick={onOpenNewRequest}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-[#4F914D] hover:bg-[#437d41] text-white font-semibold text-sm rounded-xl shadow-sm transition-all gap-2"
        >
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#E9EDE8] shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#89928A]" />
          <input
            type="text"
            placeholder="Search by senior name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['ALL', 'PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-[#4F914D] text-white shadow-2xs'
                  : 'bg-[#F7F8F6] text-[#89928A] hover:text-[#26342A] border border-[#E9EDE8]'
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9EDE8] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E9EDE8] bg-[#F7F8F6]/50 text-xs font-semibold text-[#89928A]">
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Senior</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Scheduled Date & Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9EDE8] text-sm">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-[#89928A]">
                    No assistance requests match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#26342A]">#{req.id}</td>
                    <td className="py-4 px-4 font-semibold text-[#26342A]">{getSeniorName(req.seniorId)}</td>
                    <td className="py-4 px-4 text-[#26342A] font-medium">{formatRequestType(req.requestType)}</td>
                    <td className="py-4 px-4 text-[#89928A] max-w-xs truncate" title={req.description}>{req.description}</td>
                    <td className="py-4 px-4 text-[#89928A]">
                      {formatDate(req.scheduledDate)} <span className="block text-xs">({formatTime(req.scheduledTime)})</span>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {req.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => onAccept(req.id)}
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1"
                            title="Accept Request"
                          >
                            <Play className="w-3 h-3" /> Accept
                          </button>
                          <button
                            onClick={() => onCancel(req.id)}
                            className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1"
                            title="Cancel Request"
                          >
                            <XCircle className="w-3 h-3" /> Cancel
                          </button>
                        </>
                      )}
                      {req.status === 'ACCEPTED' && (
                        <button
                          onClick={() => onComplete(req.id)}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1"
                          title="Complete Request"
                        >
                          <CheckCircle className="w-3 h-3" /> Complete
                        </button>
                      )}
                      {(req.status === 'COMPLETED' || req.status === 'CANCELLED') && (
                        <span className="text-xs text-[#89928A] italic">No actions</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
