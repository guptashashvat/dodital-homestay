import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';
import ImageViewer from '@/components/ImageViewer';
import styles from './index.module.css';

const NearbyAttractions = () => {
    const [attractions, setAttractions] = useState([]);
    const [showViewer, setShowViewer] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);

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

    const handleImageClick = (images, index) => {

        const transformedImages = images.map((item, index) => ({
            image: {
                asset: item.asset,
            }
        }));

        setSelectedImages(transformedImages);
        setSelectedImageIndex(index);
        setShowViewer(true);
    };

    const handleCloseViewer = () => {
        setShowViewer(false);
    };

    return (
        <div className={styles.nearbyAttractionsSection}>
            <h2 className={styles.nearbyAttractionsTitle}>Nearby Attractions</h2>
            <Container className="my-5">
                <Row className="justify-content-center">
                    {attractions.map((attraction) => (
                        <Col key={attraction.title} md={4}>
                            <Card border="light" className={styles.nearbyAttractionsCard}>
                                <Carousel>
                                    {attraction.images?.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={urlFor(image).url()}
                                                alt={image.asset.alt || `Slide ${index + 1}`}
                                                style={{ height: '250px', objectFit: 'cover' }}
                                                onClick={() => handleImageClick(attraction.images, index)}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <Card.Body>
                                    <Card.Title>{attraction.title}</Card.Title>
                                    <Card.Text>{attraction.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {showViewer && (
                    <ImageViewer
                        images={selectedImages}
                        initialIndex={selectedImageIndex} // Pass index
                        onClose={handleCloseViewer}
                    />
                )}
            </Container>
        </div>
    );
};

export default NearbyAttractions;