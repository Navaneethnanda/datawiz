import React, { Suspense, lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Loader from '../../shared/loader/Loader';
import Sidebar from '../../shared/sidebar/sidebar';

const Dashboard = lazy(() => import('../dashboard/dashboard'));
const VisulizationDashboard = lazy(() => import('../visulizationDashboard/visulizationDashboard'));
const AddVisulization = lazy(() => import('../visulizationDashboard/addVisulization'));
const Editvisulization = lazy(() => import('../visulizationDashboard/editVisuilization'));
const CustomDashboard = lazy(() => import('../customDashboard/customDashboard'));
const CustomComparision = lazy(() => import('../customComparison/customComparison'));
const ErrorPage = lazy(() => import('../../shared/404/error-page'));

const Routing = () => {
  const PrivateRoutes = [
    {
      exact: true,
      path: '/',
      component: () => <Dashboard />,
      title: 'Dashboard',
    },
    {
      exact: true,
      path: '/dashboard',
      component: () => <Dashboard />,
      title: 'Dashboard',
    },
    {
      exact: true,
      path: '/visualization/:id',
      component: () => <VisulizationDashboard />,
      title: 'Dashboard',
    },
    {
      exact: true,
      path: '/visualization/add/:id',
      component: () => <AddVisulization />,
      title: 'Add Visualization',
    },
    {
      exact: true,
      path: '/visualization/edit/:id/:visulizationId',
      component: () => <Editvisulization />,
      title: 'Edit Visualization',
    },
    {
      exact: true,
      path: '/customDashboard',
      component: () => <CustomDashboard />,
      title: 'Custom Dashboard',
    },
    {
      exact: true,
      path: '/customComparison/:id',
      component: () => <CustomComparision />,
      title: 'Custom Comparison',
    },
    {
      exact: true,
      path: '*',
      component: () => <ErrorPage />,
    },
  ].filter(cur => cur);

  return (
    <Suspense className="loader" fallback={<Loader />}>
      <Layout className="main-pages full-width">
        <Sidebar />
        <Switch>
          {PrivateRoutes.map(route => (
            <Route
              exact={route.exact !== false}
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
          <Redirect from="/" to="/404" />
        </Switch>
      </Layout>
    </Suspense>
  );
};

export default Routing;
