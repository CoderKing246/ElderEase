import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, History, Settings, HeartPulse, Menu, Bell } from 'lucide-react';

export function Sidebar({ mobileOpen, setMobileOpen }) {
  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/seniors', label: 'My Seniors', icon: Users },
    { to: '/requests', label: 'Assistance Requests', icon: Calendar },
    { to: '/history', label: 'Visit History', icon: History },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#E9EDE8] flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-20 flex items-center px-6 gap-3 border-b border-[#E9EDE8]">
          <div className="w-10 h-10 rounded-xl bg-[#EDF5EB] flex items-center justify-center text-[#4F914D]">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-[#26342A]">ElderEase</span>
            <span className="block text-xs font-medium text-[#89928A]">Senior Care Platform</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all
                  ${isActive 
                    ? 'bg-[#EDF5EB] text-[#4F914D] shadow-sm' 
                    : 'text-[#89928A] hover:bg-[#F7F8F6] hover:text-[#26342A]'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E9EDE8] bg-[#F7F8F6]/40">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-[#E9EDE8]">
            <div className="w-9 h-9 rounded-full bg-[#4F914D] text-white flex items-center justify-center font-bold text-sm">
              FS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#26342A] truncate">Sharma Family</p>
              <p className="text-xs text-[#89928A] truncate">Family ID: #7 (MVP)</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Topbar({ setMobileOpen, onOpenNewRequest }) {
  return (
    <header className="sticky top-0 z-30 h-20 bg-white/85 backdrop-blur-md border-b border-[#E9EDE8] px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-[#26342A] lg:hidden hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#26342A] hidden sm:block">ElderEase Family Portal</h1>
          <p className="text-xs text-[#89928A] hidden sm:block">Coordinating care with love and reliability</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenNewRequest}
          className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-[#4F914D] hover:bg-[#437d41] text-white font-semibold text-sm rounded-xl shadow-sm transition-all hover:shadow"
        >
          + New Request
        </button>

        <button className="relative p-2.5 text-[#89928A] hover:text-[#26342A] bg-[#F7F8F6] hover:bg-gray-100 rounded-xl border border-[#E9EDE8] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#4F914D] rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-[#E9EDE8]">
          <div className="w-10 h-10 rounded-xl bg-[#EDF5EB] text-[#4F914D] font-bold flex items-center justify-center border border-[#4F914D]/20">
            FS
          </div>
        </div>
      </div>
    </header>
  );
}
