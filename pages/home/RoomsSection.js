import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import Link from 'next/link';
import styles from './index.module.css';
import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

const RoomsSection = () => {
    const [sectionData, setSectionData] = useState(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const query = `*[_type == "roomSectionData"][0] {
        title,
        description,
        buttonText,
        buttonLink,
        images[] {
          asset->{
            url,
            alt,
          }
        }
      }`;
            const data = await client.fetch(query);
            console.log(data
            );
            setSectionData(data);
        };

        fetchSectionData();
    }, []);

    return (
        <Container className={`${styles.roomsSection} my-5`}>
            <h2 className={styles.roomsTitle}>Our Rooms</h2>
            <Row className="justify-content-center">
                <Col md={4} className="mb-4">
                    <Card className={styles.roomCard}>
                        {sectionData && sectionData.images && (
                            <Carousel>
                                {sectionData.images.map((roomImage, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={urlFor(roomImage).url()}
                                            alt={roomImage.asset.alt || `Slide ${index + 1}`}
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}

                        <Card.Body>
                            <Card.Title className={styles.roomCardTitle}>{sectionData?.title || 'Explore Our Rooms'}</Card.Title>
                            <Card.Text className={styles.roomCardText}>
                                {sectionData?.description || 'Discover the perfect room for your stay.'}
                            </Card.Text>
                            <Link href={sectionData?.buttonLink || '/rooms'} passHref>
                                <Button variant="outline-primary" className={styles.viewRoomsButton}>
                                    {sectionData?.buttonText || 'View Rooms'}
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RoomsSection;