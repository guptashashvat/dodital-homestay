// components/Layout.js

import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import styles from './Layout.module.css'; // Import the styles
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
    const pathname = usePathname();
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [isLargeScreen, setIsLargeScreen] = useState(true);

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

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.layoutContainer}>
            <Header />
            <div style={pathname === '/' && isLargeScreen ? {} : { paddingTop: `${navbarHeight}px` }} className={styles.mainContent}>
                {children}
            </div>
            <Footer />
        </div>
    );
}