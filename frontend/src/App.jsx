import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar, Topbar } from './components/Sidebar';
import { Modal } from './components/Modal';
import { SeniorForm } from './components/SeniorForm';
import { RequestForm } from './components/RequestForm';

import { Dashboard } from './pages/Dashboard';
import { Seniors } from './pages/Seniors';
import { SeniorDetails } from './pages/SeniorDetails';
import { AssistanceRequests } from './pages/AssistanceRequests';
import { VisitHistory } from './pages/VisitHistory';
import { Settings } from './pages/Settings';

import { seniorService } from './services/seniorService';
import { requestService } from './services/requestService';

export function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seniors, setSeniors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [seniorModalOpen, setSeniorModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [preselectedSeniorId, setPreselectedSeniorId] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [seniorsData, requestsData] = await Promise.all([
        seniorService.getSeniors(),
        requestService.getRequests(),
      ]);
      setSeniors(seniorsData);
      setRequests(requestsData);
    } catch (err) {
      console.error('Failed to load application data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenRequestModal = (seniorId = null) => {
    setPreselectedSeniorId(seniorId);
    setRequestModalOpen(true);
  };

  const handleAcceptRequest = async (id) => {
    try {
      await requestService.acceptRequest(id);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to accept request');
    }
  };

  const handleCompleteRequest = async (id) => {
    try {
      await requestService.completeRequest(id);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to complete request');
    }
  };

  const handleCancelRequest = async (id) => {
    try {
      await requestService.cancelRequest(id);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to cancel request');
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F7F8F6] text-[#26342A] font-sans antialiased flex flex-col lg:flex-row">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
          <Topbar 
            setMobileOpen={setMobileOpen} 
            onOpenNewRequest={() => handleOpenRequestModal()} 
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F914D]"></div>
              </div>
            ) : (
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Dashboard 
                      seniors={seniors} 
                      requests={requests} 
                      onOpenNewRequest={() => handleOpenRequestModal()}
                      onOpenNewSenior={() => setSeniorModalOpen(true)}
                    />
                  } 
                />
                <Route 
                  path="/seniors" 
                  element={
                    <Seniors 
                      seniors={seniors} 
                      onOpenNewSenior={() => setSeniorModalOpen(true)}
                      onOpenNewRequestForSenior={(id) => handleOpenRequestModal(id)}
                    />
                  } 
                />
                <Route 
                  path="/seniors/:id" 
                  element={
                    <SeniorDetails 
                      seniors={seniors} 
                      requests={requests}
                      onOpenNewRequestForSenior={(id) => handleOpenRequestModal(id)}
                    />
                  } 
                />
                <Route 
                  path="/requests" 
                  element={
                    <AssistanceRequests 
                      requests={requests} 
                      seniors={seniors}
                      onOpenNewRequest={() => handleOpenRequestModal()}
                      onAccept={handleAcceptRequest}
                      onComplete={handleCompleteRequest}
                      onCancel={handleCancelRequest}
                    />
                  } 
                />
                <Route 
                  path="/history" 
                  element={<VisitHistory requests={requests} seniors={seniors} />} 
                />
                <Route 
                  path="/settings" 
                  element={<Settings />} 
                />
              </Routes>
            )}
          </main>
        </div>

        <Modal 
          isOpen={seniorModalOpen} 
          onClose={() => setSeniorModalOpen(false)} 
          title="Add New Senior Profile"
        >
          <SeniorForm 
            onSuccess={() => {
              setSeniorModalOpen(false);
              loadData();
            }}
            onCancel={() => setSeniorModalOpen(false)}
          />
        </Modal>

        <Modal 
          isOpen={requestModalOpen} 
          onClose={() => setRequestModalOpen(false)} 
          title="Create Assistance Request"
        >
          <RequestForm 
            seniors={seniors}
            preselectedSeniorId={preselectedSeniorId}
            onSuccess={() => {
              setRequestModalOpen(false);
              loadData();
            }}
            onCancel={() => setRequestModalOpen(false)}
          />
        </Modal>
      </div>
    </BrowserRouter>
  );
}

export default App;
