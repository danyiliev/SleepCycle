import { baseUrl } from '../config';

export const fetchSleepData = userId => {
  return fetch(`${baseUrl}?userId=${userId}`)
    .then(response => response.json())
    .catch(err => ({
      failed: true,
      reason: err
    }));
};
