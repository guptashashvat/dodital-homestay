// components/Footer.js

import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'; // Install react-icons

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start">
                        <p>&copy; {new Date().getFullYear()} Dodital Homestay. All rights reserved.</p>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <div className={styles.socialLinks}>
                            <a href="YOUR_INSTAGRAM_LINK" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                <FaInstagram />
                            </a>
                            <a href="YOUR_FACEBOOK_LINK" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                <FaFacebook />
                            </a>
                            <a href="YOUR_WHATSAPP_LINK" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
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