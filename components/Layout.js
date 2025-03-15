// components/Layout.js

import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css'; // Import the styles
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('.sticky-navbar');
            if (navbar) {
                setNavbarHeight(navbar.offsetHeight);
            }
        };

        const handleLoad = () => {
            updateNavbarHeight();
        };

        window.addEventListener('load', handleLoad);
        window.addEventListener('resize', updateNavbarHeight);

        const timeoutId = setTimeout(updateNavbarHeight, 100);

        return () => {
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('resize', updateNavbarHeight);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className={styles.layoutContainer}> {/* Add layoutContainer class */}
            <Header />
            <div style={{ paddingTop: `${navbarHeight}px` }} className={styles.mainContent}> {/* Add mainContent class */}
                {children}
            </div>
            <Footer />
        </div>
    );
}