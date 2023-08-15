import ApiUtils from '../../helpers/APIUtils';

const api = new ApiUtils();

export const storeDashboardData = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth.user;

    const res = await api.getDashboard(userId);

    dispatch({
      type: 'DASHBOARD_DATA',
      payload: res.data.data,
    });

    return true;
  } catch (err) {
    return false;
  }
};
