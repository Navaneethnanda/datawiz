import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import store from './redux/store';
import Loader from './shared/loader/Loader';
import { loadUser } from './redux/actions/authActions';
import { storeDashboardData } from './redux/actions/dashboardActions';

const App = () => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await store.dispatch(loadUser());
      if (
        window.location.pathname !== '/' &&
        window.location.pathname !== '/dashboard' &&
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/signup'
      )
        await store.dispatch(storeDashboardData());
      setLoaded(true);
    })();
  }, []);

  if (!isLoaded) return <Loader />;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
