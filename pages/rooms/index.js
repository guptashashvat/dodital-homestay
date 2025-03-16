// pages/rooms.js

import Layout from '@/components/Layout';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import styles from './rooms.module.css';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';
import ImageViewer from '@/components/ImageViewer';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [showViewer, setShowViewer] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedRoomImages, setSelectedRoomImages] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const query = `*[_type == "room"] {
                _id,
                title,
                description,
                images[] { asset->{ url, alt } },
                features,
                price
            }`;
            const data = await client.fetch(query);
            setRooms(data);
        };

        fetchRooms();
    }, []);

    const handleImageClick = (roomImages, index) => {

        const transformedImages = roomImages.map((item, index) => ({
            image: {
                asset: item.asset,
            }
        }));

        setSelectedRoomImages(transformedImages);
        setSelectedImageIndex(index);
        setShowViewer(true);
    };

    const handleCloseViewer = () => {
        setShowViewer(false);
    };

    return (
        <Layout>
            <Container className="my-5">
                <h1 className="text-center mb-4">Our Rooms</h1>
                <Row className="justify-content-center">
                    {rooms.map((room) => (
                        <Col key={room._id} md={6} lg={4} className="mb-4">
                            <Card className={styles.roomCard}>
                                <Carousel>
                                    {room.images?.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={urlFor(image).url()}
                                                alt={image.asset?.alt || `${room.title} - Image ${index + 1}`}
                                                style={{ height: '300px', objectFit: 'cover' }}
                                                onClick={() => handleImageClick(room.images, index)}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <Card.Body>
                                    <Card.Title className={styles.roomTitle}>{room.title}</Card.Title>
                                    <Card.Text className={styles.roomDescription}>{room.description}</Card.Text>
                                    <ul className={styles.roomFeatures}>
                                        {room.features?.map((feature, index) => (
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
                {showViewer && (
                    <ImageViewer
                        images={selectedRoomImages}
                        initialIndex={selectedImageIndex} // Pass index
                        onClose={handleCloseViewer}
                    />
                )}
            </Container>
        </Layout>
    );
};

export default RoomsPage;