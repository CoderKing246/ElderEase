import { axiosInstance } from '../api/axiosInstance';
import { INITIAL_SENIORS } from '../data/mockSeniors';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const FAMILY_ID = import.meta.env.VITE_FAMILY_ID || 7;

const getStoredSeniors = () => {
  const saved = localStorage.getItem('elderease_seniors');
  return saved ? JSON.parse(saved) : INITIAL_SENIORS;
};

const saveSeniors = (seniors) => {
  localStorage.setItem('elderease_seniors', JSON.stringify(seniors));
};

export const seniorService = {
  async getSeniors() {
    if (USE_MOCK) {
      return Promise.resolve(getStoredSeniors());
    }
    const data = await axiosInstance.get(`/api/seniors?familyId=${FAMILY_ID}`);
    return data;
  },

  async getSeniorById(seniorId) {
    if (USE_MOCK) {
      const seniors = getStoredSeniors();
      const found = seniors.find((s) => String(s.id) === String(seniorId));
      if (!found) throw { status: 404, message: 'Senior not found' };
      return Promise.resolve(found);
    }
    const data = await axiosInstance.get(`/api/seniors/${seniorId}?familyId=${FAMILY_ID}`);
    return data;
  },

  async createSenior(seniorData) {
    const payload = {
      familyId: Number(FAMILY_ID),
      name: seniorData.name,
      age: Number(seniorData.age),
      address: seniorData.address,
      phone: seniorData.phone,
    };

    if (USE_MOCK) {
      const seniors = getStoredSeniors();
      const newId = seniors.length > 0 ? Math.max(...seniors.map((s) => s.id)) + 1 : 1;
      const newSenior = {
        id: newId,
        ...payload,
        relationship: seniorData.relationship || 'Family Member',
        avatarBg: 'bg-emerald-100 text-emerald-800',
      };
      const updated = [newSenior, ...seniors];
      saveSeniors(updated);
      return Promise.resolve(newSenior);
    }

    const data = await axiosInstance.post(`/api/seniors`, payload);
    return data;
  },
};
