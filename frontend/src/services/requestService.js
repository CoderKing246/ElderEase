import { axiosInstance } from '../api/axiosInstance';
import { INITIAL_REQUESTS } from '../data/mockRequests';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const FAMILY_ID = import.meta.env.VITE_FAMILY_ID || 7;

const getStoredRequests = () => {
  const saved = localStorage.getItem('elderease_requests');
  return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
};

const saveRequests = (requests) => {
  localStorage.setItem('elderease_requests', JSON.stringify(requests));
};

export const requestService = {
  async getRequests() {
    if (USE_MOCK) {
      return Promise.resolve(getStoredRequests());
    }
    const data = await axiosInstance.get(`/api/requests?familyId=${FAMILY_ID}`);
    return data;
  },

  async createRequest(reqData) {
    const payload = {
      seniorId: Number(reqData.seniorId),
      requestType: reqData.requestType,
      description: reqData.description,
      scheduledDate: reqData.scheduledDate,
      scheduledTime: reqData.scheduledTime.length === 5 ? `${reqData.scheduledTime}:00` : reqData.scheduledTime,
      durationMinutes: Number(reqData.durationMinutes || 60),
    };

    if (USE_MOCK) {
      const requests = getStoredRequests();
      const newId = requests.length > 0 ? Math.max(...requests.map((r) => r.id)) + 1 : 101;
      const newReq = {
        id: newId,
        familyId: Number(FAMILY_ID),
        helperId: null,
        status: 'PENDING',
        ...payload,
      };
      const updated = [newReq, ...requests];
      saveRequests(updated);
      return Promise.resolve(newReq);
    }

    const data = await axiosInstance.post(`/api/requests?familyId=${FAMILY_ID}`, payload);
    return data;
  },

  async acceptRequest(requestId) {
    if (USE_MOCK) {
      const requests = getStoredRequests();
      const updated = requests.map((r) => (Number(r.id) === Number(requestId) ? { ...r, status: 'ACCEPTED', helperId: 42 } : r));
      saveRequests(updated);
      return Promise.resolve(updated.find((r) => Number(r.id) === Number(requestId)));
    }
    const data = await axiosInstance.patch(`/api/requests/${requestId}/accept?familyId=${FAMILY_ID}`);
    return data;
  },

  async completeRequest(requestId) {
    if (USE_MOCK) {
      const requests = getStoredRequests();
      const updated = requests.map((r) => (Number(r.id) === Number(requestId) ? { ...r, status: 'COMPLETED' } : r));
      saveRequests(updated);
      return Promise.resolve(updated.find((r) => Number(r.id) === Number(requestId)));
    }
    const data = await axiosInstance.patch(`/api/requests/${requestId}/complete?familyId=${FAMILY_ID}`);
    return data;
  },

  async cancelRequest(requestId) {
    if (USE_MOCK) {
      const requests = getStoredRequests();
      const updated = requests.map((r) => (Number(r.id) === Number(requestId) ? { ...r, status: 'CANCELLED' } : r));
      saveRequests(updated);
      return Promise.resolve(updated.find((r) => Number(r.id) === Number(requestId)));
    }
    const data = await axiosInstance.patch(`/api/requests/${requestId}/cancel?familyId=${FAMILY_ID}`);
    return data;
  },
};
