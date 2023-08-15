import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarKey = useSelector(state => state.auth.sidebarKey);

  const handleChange = e => {
    dispatch({
      type: 'CHANGESIDEBAR',
      payload: e?.key,
    });
  };

  return (
    <Sider collapsible collapsedWidth="0" width="300" className="left-sidebar">
      <div className="sidebar-top full-width">
        <Link
          to="/"
          role="presentation"
          onClick={() =>
            dispatch({
              type: 'CHANGESIDEBAR',
              payload: '/',
            })
          }
        >
          <img className="sidebar-logo" src="images/DataWiz-logo.svg" alt="logo" />
        </Link>
      </div>
      <Menu mode="inline" selectedKeys={[sidebarKey]} onClick={e => handleChange(e)}>
        <Menu.Item key={sidebarKey === '/' ? '/' : '/dashboard'}>
          <Link to="/dashboard">
            <img className="not-hover-show" src="images/sidebar-dashboard-icon.svg" alt="" />
            <img className="hover-show" src="images/sidebar-dashboard-hover-icon.svg" alt="" />
            Config Dashboard
            <i className="fa fa-angle-right" aria-hidden="true" />
          </Link>
        </Menu.Item>

        <Menu.Item key="/customDashboard">
          <Link to="/customDashboard">
            <img className="not-hover-show" src="images/sidebar-dashboard-icon.svg" alt="" />
            <img className="hover-show" src="images/sidebar-dashboard-hover-icon.svg" alt="" />
            Custom Dashboard
            <i className="fa fa-angle-right" aria-hidden="true" />
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
