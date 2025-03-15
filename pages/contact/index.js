import Layout from '@/components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './contact.module.css';
import { client } from '@/lib/sanity';
import { useEffect, useState } from 'react';

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
                <h1 className="text-center mb-4">Contact Us</h1>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <p className="text-center mb-4">
                            We'd love to hear from you! Please contact us using the information provided.
                        </p>

                        <div className={styles.contactInfo}>
                            <h3 className="text-center mb-3">Contact Information</h3>
                            <p><strong>{contactInfo?.phone2 ? 'Phone 1' : 'Phone'}:</strong> {contactInfo?.phone1}</p>
                            {contactInfo?.phone2 && <p><strong>Phone 2:</strong> {contactInfo?.phone2}</p>}
                            <p><strong>Email:</strong> {contactInfo?.email}</p>
                            <p><strong>Address:</strong> {contactInfo?.address}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default ContactPage;