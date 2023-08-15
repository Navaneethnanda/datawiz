import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const { Header } = Layout;

const TopHeader = ({ title, link, name }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const username = localStorage.getItem('username');

  const handleLogout = async () => {
    await dispatch(logout());
  };

  const items = [
    {
      key: '1',
      label: (
        <Link to="/login" onClick={() => handleLogout()}>
          Logout
        </Link>
      ),
    },
  ];

  return (
    <Header className="site-layout-sub-header-background page-top-section full-width flex-center">
      <h2>
        {link && (
          <span
            role="presentation"
            onClick={() => {
              history.push(`/visualization/${window.location.pathname.split('/')[3]}`, {
                name,
              });
            }}
            className="link"
          >
            Home/{' '}
          </span>
        )}
        {title}
      </h2>

      <div className="flex-center topbar-switch">
        <Dropdown menu={{ items }} placement="bottomLeft">
          <a role="presentation" onClick={e => e.preventDefault()}>
            <Space>
              <div className="title">{username}</div>
              <DownOutlined style={{ color: '#2b2836' }} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

TopHeader.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default TopHeader;
