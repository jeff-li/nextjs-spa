import React from 'react';
import { NavLink, Outlet,  } from "react-router-dom";

import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Layout: React.FC = () => {
  const getActiveStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
    margin: "1rem 0",
    color: isActive ? 'blue' : ''
  });

  return (
    <div className="App">
      <nav>
        <NavLink to="/" style={getActiveStyle}>Home</NavLink> |{" "}
        <NavLink to="about" style={getActiveStyle}>About</NavLink>
      </nav>
      <div className={styles.container}>
        <main className={styles.main}>
          <Outlet />
        </main>
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Layout;