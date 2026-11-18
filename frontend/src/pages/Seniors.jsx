import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Phone, MapPin, ArrowRight, User } from 'lucide-react';

export function Seniors({ seniors, onOpenNewSenior, onOpenNewRequestForSenior }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSeniors = seniors.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#26342A]">Registered Seniors</h2>
          <p className="text-sm text-[#89928A]">Manage elderly family members and schedule assistance visits.</p>
        </div>
        <button
          onClick={onOpenNewSenior}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-[#4F914D] hover:bg-[#437d41] text-white font-semibold text-sm rounded-xl shadow-sm transition-all gap-2"
        >
          <Plus className="w-4 h-4" /> Add Senior
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#E9EDE8] shadow-2xs">
        <input
          type="text"
          placeholder="Search seniors by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-[#E9EDE8] focus:outline-none focus:ring-2 focus:ring-[#4F914D]/30 focus:border-[#4F914D] text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSeniors.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-[#E9EDE8]">
            <User className="w-12 h-12 mx-auto text-[#89928A] mb-3" />
            <p className="text-base font-semibold text-[#26342A]">No seniors found</p>
            <p className="text-sm text-[#89928A] mt-1">Try adjusting your search or add a new senior profile.</p>
          </div>
        ) : (
          filteredSeniors.map((senior) => (
            <div key={senior.id} className="bg-white rounded-2xl border border-[#E9EDE8] p-6 shadow-2xs flex flex-col justify-between hover:border-[#4F914D]/40 transition-all">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#EDF5EB] text-[#4F914D] font-bold text-xl flex items-center justify-center">
                    {senior.name.charAt(0)}
                  </div>
                  <span className="px-3 py-1 bg-[#F7F8F6] text-[#26342A] text-xs font-semibold rounded-full border border-[#E9EDE8]">
                    {senior.relationship || 'Senior'} • {senior.age} yrs
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#26342A]">{senior.name}</h3>
                
                <div className="mt-4 space-y-2 text-sm text-[#89928A]">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#4F914D] shrink-0" />
                    <span className="truncate">{senior.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#4F914D] shrink-0" />
                    <span>{senior.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E9EDE8] flex items-center justify-between gap-3">
                <Link
                  to={`/seniors/${senior.id}`}
                  className="text-sm font-semibold text-[#4F914D] hover:underline flex items-center gap-1"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => onOpenNewRequestForSenior(senior.id)}
                  className="px-3 py-1.5 bg-[#EDF5EB] hover:bg-[#4F914D] hover:text-white text-[#4F914D] text-xs font-semibold rounded-lg transition-colors"
                >
                  + Request Help
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
