import Layout from '@/components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './contact.module.css';
import { client } from '@/lib/sanity';
import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react'; // Import PortableText

const ContactPage = () => {
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        const fetchContactInfo = async () => {
            const query = `*[_type == "contact"][0]`;
            const data = await client.fetch(query);
            setContactInfo(data);
        };

        fetchContactInfo();
    }, []);

    return (
        <Layout>
            <Container className="my-5">
                <div className={styles.contactHeader}>
                    <h1 className="text-center mb-4">Contact Us</h1>
                    <p className="text-center mb-4">
                        We'd love to hear from you! Please contact us using the information provided.
                    </p>
                </div>

                <Row className="justify-content-center">
                    <Col md={8}>
                        <div className={styles.contactDetails}>
                            <h3 className="text-center mb-3">Contact Information</h3>
                            <p><strong>{contactInfo?.phone2 ? 'Phone 1' : 'Phone'}:</strong> {contactInfo?.phone1}</p>
                            {contactInfo?.phone2 && <p><strong>Phone 2:</strong> {contactInfo?.phone2}</p>}
                            <p><strong>Email:</strong> {contactInfo?.email}</p>
                            <p><strong>Address:</strong> {contactInfo?.address}</p>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-5">
                    <Col md={8} className="text-center">
                        <div className={styles.mapSection}>
                            <h2 className="mb-3">Our Location</h2>
                            {contactInfo?.mapInstructions && (
                                <div className="mb-3">
                                    <PortableText value={contactInfo.mapInstructions} />
                                </div>
                            )}
                            <div className={styles.mapContainer}>
                                <iframe
                                    src={contactInfo?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.935102551475!2d78.45524277498384!3d30.82688847372986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908e3309a47890f%3A0x675841753173d101!2sDodital%20Trek!5e0!3m2!1sen!2sin!4v1703248677689!5m2!1sen!2sin"}
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default ContactPage;