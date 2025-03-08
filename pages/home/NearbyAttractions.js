import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';
import styles from './index.module.css'; // Import the CSS module

const NearbyAttractions = () => {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchAttractions = async () => {
            const query = `*[_type == "nearbyAttraction"] {
        title,
        description,
        images[] {
          asset->{
            url,
            alt,
          }
        }
      }`;
            const data = await client.fetch(query);
            setAttractions(data);
        };

        fetchAttractions();
    }, []);

    return (
        <div className={styles.nearbyAttractionsSection}> {/* Apply section style */}
            <h2 className={styles.nearbyAttractionsTitle}>Nearby Attractions</h2> {/* Apply title style */}
            <Container className="my-5"> {/* Keep Bootstrap Container */}
                <Row className="justify-content-center"> {/* Keep Bootstrap Row */}
                    {attractions.map((attraction) => (
                        <Col key={attraction.title} md={4}> {/* Keep Bootstrap Col */}
                            <Card className={styles.nearbyAttractionsCard}>
                                <Carousel>
                                    {attraction.images?.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={urlFor(image).url()}
                                                alt={image.asset.alt || `Slide ${index + 1}`}
                                                style={{ height: '250px', objectFit: 'cover' }}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <Card.Body>
                                    <Card.Title>{attraction.title}</Card.Title> {/* Keep Bootstrap Card Title */}
                                    <Card.Text>{attraction.description}</Card.Text> {/* Keep Bootstrap Card Text */}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default NearbyAttractions;