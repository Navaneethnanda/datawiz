import React, { Suspense, lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './shared/loader/Loader';

const App = lazy(() => import('./components/app/appRouter'));
const LoginPage = lazy(() => import('./components/authentication/login/login'));
const RegisterPage = lazy(() => import('./components/authentication/register/register'));

const Routing = () => {
  // const { isAuthenticated } = useStore().getState().auth;
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const PublicRoutes = [
    {
      exact: true,
      path: '/login',
      component: () => <LoginPage />,
    },
    {
      exact: true,
      path: '/signup',
      component: () => <RegisterPage />,
    },
  ];

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />
        }
      />
    );
  }

  return (
    // <BrowserRouter>
    <Suspense className="loader" fallback={<Loader />}>
      <Switch>
        {PublicRoutes.map(route => (
          <PublicRoute
            exact={route.exact}
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
        <PrivateRoute path="/">
          <App />
        </PrivateRoute>
      </Switch>
    </Suspense>
    // </BrowserRouter>
  );
};

export default Routing;
