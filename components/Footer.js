// components/Footer.js

import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { client } from '@/lib/sanity';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const [footerData, setFooterData] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchFooterData = async () => {
            const query = `*[_type == "footer"][0]`;
            const data = await client.fetch(query);
            setFooterData(data);
        };

        fetchFooterData();
    }, []);

    return (
        <footer className={styles.footer}>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start">
                        <p>{footerData?.copyright || `© ${new Date().getFullYear()} Dodital Homestay. All rights reserved.`}</p>
                    </Col>
                    <Col md={6} className="text-center text-md-end">


                        <div className={styles.socialLinks}>
                            {pathname !== '/contact' && (
                                // <div className={styles.contactInfo}>
                                <a href="/contact" className={styles.mapLink}>
                                    <FaMapMarkerAlt className={styles.mapIcon} /> View Location
                                </a>
                                // </div>
                            )}
                            <a href={footerData?.instagramLink} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href={footerData?.facebookLink} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href={footerData?.whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;