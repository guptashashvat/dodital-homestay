import Layout from '@/components/Layout';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import styles from './rooms.module.css';
import Link from 'next/link';

const RoomsPage = () => {
    // Sample room data (replace with your actual data)
    const rooms = [
        {
            id: 1,
            title: 'Standard Room',
            description: 'A cozy room with essential amenities.',
            images: ['/images/room1-1.jpg', '/images/room1-2.jpg'],
            features: ['Free Wi-Fi', 'En-suite bathroom', 'Tea/coffee maker'],
            price: 'Rs 1000/night',
        },
        {
            id: 2,
            title: 'Deluxe Suite',
            description: 'A spacious suite with a beautiful view.',
            images: ['/images/room2-1.jpg', '/images/room2-2.jpg'],
            features: ['King-size bed', 'Balcony', 'Jacuzzi'],
            price: 'Rs 1500/night',
        },
        // Add more rooms as needed
    ];

    return (
        <Layout>
            <Container className="my-5">
                <h1 className="text-center mb-4">Our Rooms</h1>
                <Row className="justify-content-center">
                    {rooms.map((room) => (
                        <Col key={room.id} md={6} lg={4} className="mb-4">
                            <Card className={styles.roomCard}>
                                <Carousel>
                                    {room.images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={image}
                                                alt={`${room.title} - Image ${index + 1}`}
                                                style={{ height: '300px', objectFit: 'cover' }}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <Card.Body>
                                    <Card.Title className={styles.roomTitle}>{room.title}</Card.Title>
                                    <Card.Text className={styles.roomDescription}>{room.description}</Card.Text>
                                    <ul className={styles.roomFeatures}>
                                        {room.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                    <p className={styles.roomPrice}>Price: {room.price}</p>
                                    <Link href="/contact" passHref>
                                        <Button variant="primary" className={styles.bookButton}>Contact for Booking</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    );
};

export default RoomsPage;