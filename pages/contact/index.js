import Layout from '@/components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './contact.module.css';

const ContactPage = () => {
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
                            <p><strong>Phone 1:</strong> +1 (123) 456-7890</p>
                            <p><strong>Phone 2:</strong> +1 (987) 654-3210</p>
                            <p><strong>Email:</strong> info@yourhomestay.com</p>
                            <p><strong>Address:</strong> 123 Homestay Street, City, Country</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default ContactPage;