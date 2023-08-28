import React from 'react';
import '../css/SideBar.css';
import '../assets/undraw_Online_test_re_kyfx.jpg';
// import Lottie from 'lottie-react';
import { useState } from 'react';
import { useLottie } from 'lottie-react';
import animation from '../lotties/animation_llme9vof.json';
import PropTypes from 'prop-types';
import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const options = {
    animationData: animation,
    loop: true,
  };

  const { View } = useLottie(options);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`container ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {sidebarCollapsed ? (
        <FontAwesomeIcon
          icon={faBars}
          id="sidebar-toggle"
          onClick={toggleSidebar}
          className="hamburger-icon"
          style={{margin: '1.5rem'}}
        />
      ) : (
        ''
      )}
      <nav className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <FontAwesomeIcon
          icon={faBars}
          id="sidebar-toggle"
          onClick={toggleSidebar}
          className="hamburger-icon"
        />
        <div className="sidebar__logo" onClick={toggleSidebar}>
          {View}
          {/* <Lottie options={defaultOptions} height={400} width={400} /> */}
        </div>
        {/* <img src="undraw_Online_test_re_kyfx.jpg" alt="Logo" /> */}
        <div className="side-bar__links">
          <NavLink to="/" className={'side-bar__link'}>
            <h3>Dashboard</h3>
          </NavLink>

          <NavLink to="/questionnaire/" className={'side-bar__link'}>
            <h3>Questionnaire</h3>
          </NavLink>

          <NavLink to="/create/" className={'side-bar__link'}>
            <h3>Create</h3>
          </NavLink>
        </div>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

SideBar.propTypes = {};

export default SideBar;
