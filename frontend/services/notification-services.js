import axiosInstances from './axios-instance';

export const getRequestNotification = async memberId => {
  const url = '/requestNotifications';
  let result;
  await axiosInstances
    .get(url, {
      params: {
        userId: memberId,
      },
    })
    .then(res => {
      result = res.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const getReminderNotification = async memberId => {
  const url = '/reminderNotification';
  let result;
  await axiosInstances
    .get(url, {
      params: {
        userId: memberId,
      },
    })
    .then(res => {
      result = res.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const getBookNotification = async memberId => {
  const url = '/bookNotifications';
  let result;
  await axiosInstances
    .get(url, {
      params: {
        memberId,
      },
    })
    .then(res => {
      result = res.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const getBannedNotification = async memberId => {
  const url = '/banMemberNotification';
  let result;
  await axiosInstances
    .get(url, {
      params: {
        memberId,
      },
    })
    .then(res => {
      result = res.data;
    })
    .catch(error => console.error(error));
  return result;
};
