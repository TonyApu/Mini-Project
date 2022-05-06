import axiosInstances from './axios-instance';

export const getReminder = async data => {
  const url = '/reminder';
  let result = null;
  await axiosInstances
    .get(url, {
      params: {
        firstMemberId: data.firstMemberId,
        secondMemberId: data.secondMemberId,
      },
    })
    .then(response => {
      result = response.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const addNewReminder = async data => {
  const url = '/reminder';
  let result = false;
  await axiosInstances
    .post(url, data)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const updateReminder = async data => {
  const url = '/reminder';
  let result = false;
  await axiosInstances
    .put(url, data)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const deleteReminder = async reminderId => {
  const url = `/reminder/${reminderId}`;
  let result = false;
  await axiosInstances
    .delete(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};
