import React from 'react';
import { Server } from 'lucide-react';

export function Settings() {
  const isMock = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const familyId = import.meta.env.VITE_FAMILY_ID || 7;

  return (
    <div className="space-y-6 max-w-3xl animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-[#26342A]">Platform Settings</h2>
        <p className="text-sm text-[#89928A]">Configuration and connection diagnostics for ElderEase MVP.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#E9EDE8] shadow-2xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#E9EDE8]">
          <div className="w-10 h-10 rounded-xl bg-[#EDF5EB] text-[#4F914D] flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#26342A]">Backend Integration Status</h3>
            <p className="text-xs text-[#89928A]">Spring Boot REST API connectivity parameters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E9EDE8]">
            <span className="block text-xs text-[#89928A] font-medium">Data Mode</span>
            <span className="font-bold text-[#26342A] mt-0.5 inline-flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isMock ? 'bg-amber-500' : 'bg-emerald-500'}`} />
              {isMock ? 'Mock Mode (Local)' : 'Backend API Mode'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E9EDE8]">
            <span className="block text-xs text-[#89928A] font-medium">Backend Base URL</span>
            <span className="font-bold text-[#26342A] mt-0.5 truncate block">{apiBaseUrl}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E9EDE8]">
            <span className="block text-xs text-[#89928A] font-medium">Configured Family ID</span>
            <span className="font-bold text-[#26342A] mt-0.5 block">#{familyId}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E9EDE8]">
            <span className="block text-xs text-[#89928A] font-medium">Technology Stack</span>
            <span className="font-bold text-[#26342A] mt-0.5 block">React 19 + Vite + Spring Boot 3.3.5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
