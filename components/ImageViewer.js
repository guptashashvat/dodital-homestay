// components/ImageViewer.js

import { useState, useEffect, useRef } from 'react';
import { Image } from 'react-bootstrap';
import styles from './ImageViewer.module.css';
import { urlFor } from '@/lib/sanity';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageViewer = ({ images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    //const [currentImage, setCurrentImage] = useState(initialImage);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleNextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
    };

    const handlePrevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
    };

    useEffect(() => {
        const navbar = document.querySelector('.sticky-navbar');
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight);
        }
    }, []);

    useEffect(() => {
        if (closeButtonRef.current) {
            closeButtonRef.current.style.top = `${navbarHeight + 20}px`; // Adjust top position
        }
    }, [navbarHeight]);

    return (
        <div className={styles.imageViewer}>
            <div className={styles.closeButton} onClick={onClose}>
                <FaTimes />
            </div>
            <div className={styles.navigation}>
                <button className={styles.navButton} onClick={handlePrevImage}>
                    <FaChevronLeft />
                </button>
                <button className={styles.navButton} onClick={handleNextImage}>
                    <FaChevronRight />
                </button>
            </div>
            <div className={styles.imageContainer}>
                {images[currentIndex] && images[currentIndex].image && images[currentIndex].image.asset && images[currentIndex].image.asset.url ? (
                    <Image src={urlFor(images[currentIndex].image).url()} alt={images[currentIndex].alt} fluid />
                ) : (
                    <p>Image not available.</p>
                )}
            </div>
        </div>
    );
};

export default ImageViewer;