import React from 'react';
import { History } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { formatRequestType } from '../utils/requestTypeMapper';
import { formatDate, formatTime } from '../utils/formatters';

export function VisitHistory({ requests, seniors }) {
  const completedRequests = requests.filter((r) => r.status === 'COMPLETED');

  const getSeniorName = (seniorId) => {
    const s = seniors.find((item) => Number(item.id) === Number(seniorId));
    return s ? s.name : 'Unknown Senior';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-[#26342A]">Visit History</h2>
        <p className="text-sm text-[#89928A]">Review completed assistance visits and care logs.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9EDE8] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E9EDE8] bg-[#F7F8F6]/50 text-xs font-semibold text-[#89928A]">
                <th className="py-3.5 px-4">Request ID</th>
                <th className="py-3.5 px-4">Senior Name</th>
                <th className="py-3.5 px-4">Assistance Type</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Completed Schedule</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9EDE8] text-sm">
              {completedRequests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center text-[#89928A]">
                    <History className="w-10 h-10 mx-auto text-[#89928A]/50 mb-2" />
                    <p className="font-semibold text-[#26342A]">No completed visits yet</p>
                    <p className="text-xs mt-1">Completed assistance requests will automatically appear here.</p>
                  </td>
                </tr>
              ) : (
                completedRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#26342A]">#{req.id}</td>
                    <td className="py-4 px-4 font-semibold text-[#26342A]">{getSeniorName(req.seniorId)}</td>
                    <td className="py-4 px-4 text-[#26342A] font-medium">{formatRequestType(req.requestType)}</td>
                    <td className="py-4 px-4 text-[#89928A] max-w-xs truncate">{req.description}</td>
                    <td className="py-4 px-4 text-[#89928A]">
                      {formatDate(req.scheduledDate)} at {formatTime(req.scheduledTime)}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={req.status} />
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
