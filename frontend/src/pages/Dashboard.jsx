import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, CheckCircle2, ArrowRight, Plus, Calendar } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { formatDate, formatTime } from '../utils/formatters';
import { formatRequestType } from '../utils/requestTypeMapper';

export function Dashboard({ seniors, requests, onOpenNewRequest, onOpenNewSenior }) {
  const totalSeniors = seniors.length;
  const pendingRequests = requests.filter((r) => r.status === 'PENDING').length;
  const inProgressRequests = requests.filter((r) => r.status === 'ACCEPTED').length;
  const completedRequests = requests.filter((r) => r.status === 'COMPLETED').length;

  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate))
    .slice(0, 4);

  const getSeniorName = (seniorId) => {
    const s = seniors.find((item) => Number(item.id) === Number(seniorId));
    return s ? s.name : 'Unknown Senior';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-[#EDF5EB] to-white p-6 sm:p-8 rounded-2xl border border-[#E9EDE8] flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm">
        <div>
          <span className="inline-block px-3 py-1 bg-white text-[#4F914D] font-semibold text-xs rounded-full border border-[#4F914D]/20 mb-3 shadow-2xs">
            Family Care Portal • v0.1.0 MVP
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#26342A] tracking-tight">
            Good morning! Here's an overview of your family's care.
          </h2>
          <p className="text-sm text-[#89928A] mt-1 max-w-xl">
            Monitor daily assistance schedules, coordinate visits for your elderly loved ones, and track active requests in real time.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onOpenNewRequest}
            className="px-5 py-3 bg-[#4F914D] hover:bg-[#437d41] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Assistance Request
          </button>
          <button
            onClick={onOpenNewSenior}
            className="px-5 py-3 bg-white hover:bg-gray-50 text-[#26342A] border border-[#E9EDE8] font-semibold text-sm rounded-xl transition-all"
          >
            Add Senior Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-[#E9EDE8] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EDF5EB] text-[#4F914D] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#89928A]">Total Registered Seniors</p>
            <p className="text-2xl font-bold text-[#26342A] mt-0.5">{totalSeniors}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E9EDE8] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#89928A]">Pending Requests</p>
            <p className="text-2xl font-bold text-[#26342A] mt-0.5">{pendingRequests}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E9EDE8] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#89928A]">Accepted / In Progress</p>
            <p className="text-2xl font-bold text-[#26342A] mt-0.5">{inProgressRequests}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E9EDE8] shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#89928A]">Completed Requests</p>
            <p className="text-2xl font-bold text-[#26342A] mt-0.5">{completedRequests}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-[#E9EDE8] shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#26342A]">Your Seniors</h3>
            <Link to="/seniors" className="text-sm font-semibold text-[#4F914D] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4 flex-1">
            {seniors.length === 0 ? (
              <p className="text-sm text-[#89928A] py-8 text-center">No seniors registered yet.</p>
            ) : (
              seniors.slice(0, 3).map((senior) => (
                <div key={senior.id} className="p-4 rounded-xl border border-[#E9EDE8] bg-[#F7F8F6]/50 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#EDF5EB] text-[#4F914D] font-bold flex items-center justify-center text-lg">
                    {senior.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#26342A] truncate">{senior.name}</h4>
                    <p className="text-xs text-[#89928A] truncate">{senior.relationship || 'Family Member'} • {senior.age} yrs</p>
                  </div>
                  <Link
                    to={`/seniors/${senior.id}`}
                    className="p-2 text-[#4F914D] hover:bg-[#EDF5EB] rounded-lg transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
          </div>

          <button
            onClick={onOpenNewSenior}
            className="w-full mt-6 py-2.5 border border-dashed border-[#4F914D]/40 text-[#4F914D] hover:bg-[#EDF5EB]/50 font-semibold text-sm rounded-xl transition-all"
          >
            + Add Another Senior
          </button>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E9EDE8] shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#26342A]">Recent Assistance Requests</h3>
            <Link to="/requests" className="text-sm font-semibold text-[#4F914D] hover:underline flex items-center gap-1">
              View All Requests <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E9EDE8] text-xs font-semibold text-[#89928A]">
                  <th className="py-3 px-3">ID</th>
                  <th className="py-3 px-3">Senior</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Scheduled</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9EDE8] text-sm">
                {recentRequests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-[#89928A]">No assistance requests found.</td>
                  </tr>
                ) : (
                  recentRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-[#26342A]">#{req.id}</td>
                      <td className="py-3.5 px-3 font-medium text-[#26342A]">{getSeniorName(req.seniorId)}</td>
                      <td className="py-3.5 px-3 text-[#89928A]">{formatRequestType(req.requestType)}</td>
                      <td className="py-3.5 px-3 text-[#89928A]">{formatDate(req.scheduledDate)}</td>
                      <td className="py-3.5 px-3">
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
    </div>
  );
}
