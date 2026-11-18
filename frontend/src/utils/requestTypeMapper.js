export const REQUEST_TYPES = {
  GROCERY: 'Grocery Assistance',
  COMPANIONSHIP: 'Companionship Visit',
  MEDICAL: 'Medical Appointment Assistance',
  CHECKIN: 'Daily Check-in',
  HOUSEHOLD: 'Household Assistance',
  OTHER: 'Other',
};

export const REVERSE_REQUEST_TYPES = Object.entries(REQUEST_TYPES).reduce(
  (acc, [key, val]) => {
    acc[val] = key;
    return acc;
  },
  {}
);

export function formatRequestType(backendType) {
  if (!backendType) return 'Other';
  return REQUEST_TYPES[backendType.toUpperCase()] || backendType;
}

export function toBackendRequestType(frontendLabel) {
  if (!frontendLabel) return 'OTHER';
  return REVERSE_REQUEST_TYPES[frontendLabel] || frontendLabel.toUpperCase().replace(/\s+/g, '_');
}
