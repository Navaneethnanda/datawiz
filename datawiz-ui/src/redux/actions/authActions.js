import ApiUtils from '../../helpers/APIUtils';

const api = msg => new ApiUtils(msg);

export const loadUser = () => async dispatch => {
  try {
    const token = localStorage.getItem('id_token');
    const username = localStorage.getItem('username');

    if (!token) return dispatch({ type: 'NEW_USER' });

    const res = await api().loadUser(username, { Authorization: `Bearer ${token}` });

    dispatch({
      type: 'EXISTING_USER',
      payload: {
        userId: res.data.data,
      },
      token,
    });

    return true;
  } catch (err) {
    dispatch({ type: 'AUTH_FAILED' });
    return false;
  }
};

export const register = data => async () => {
  try {
    await api(true).register(data);
    return true;
  } catch (e) {
    return false;
  }
};

export const login = data => async dispatch => {
  try {
    const res = await api().login(data);
    // after successfully login, you will get token on it
    localStorage.setItem('id_token', res?.data?.data);
    localStorage.setItem('username', data?.username);

    await dispatch(loadUser());
    dispatch({
      type: 'CHANGESIDEBAR',
      payload: '/',
    });

    return true;
  } catch (err) {
    dispatch({ type: 'AUTH_FAILED' });
    return false;
  }
};

export const logout = () => async dispatch => {
  try {
    localStorage.removeItem('id_token');
    localStorage.removeItem('username');
    // window.location.pathname = '/login';
    dispatch({ type: 'LOGOUT' });
    return true;
  } catch (err) {
    return false;
  }
};
