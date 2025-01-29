import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Logo from '@/assets/icons/spotnet-logo.svg?react';
import WalletSection from '@/components/layout/wallet-section/WalletSection';
import NavigationLinks from '@/components/layout/navigation-links/NavigationLinks';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import MobDropdownMenu from '@/components/layout/mob-dropdown-menu/MobDropdownMenu';
import './header.css';
import '@/globals.css';
import { ReportBugButton } from '@/components/report-button/ReportBugButton';
import { ReportBugModal } from '@/components/report-modal/ReportBugModal';

function Header({ onConnectWallet, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const makeNavStick = [
    '/overview',
    '/documentation',
    '/dashboard',
    '/dashboard/position-history',
    '/dashboard/deposit',
    '/stake',
    '/dashboard/withdraw',
    '/terms-and-conditions',
    '/defispring',
  ].includes(location.pathname);

  // Blocking screen scroll if menu is open
  useLockBodyScroll(isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Closing menu is case route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Closing menu in case of screen size change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className={makeNavStick ? 'header-nav-sticky' : 'header-nav'}>
        <div className="list-items">
          <div className="logo">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          {/* Desktop navigation */}
          <NavigationLinks onNavClick={handleNavClick} />
          <div className="menu-section">
            <div className="dropdown">
              <MobDropdownMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            </div>
            <WalletSection onConnectWallet={onConnectWallet} onLogout={onLogout} />
          </div>
        </div>
      </nav>

      {!isModalOpen && <ReportBugButton onClick={openModal} />}

      {isModalOpen && <ReportBugModal onClose={closeModal} />}
    </>
  );
}

export default Header;
