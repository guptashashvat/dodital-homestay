import Layout from '@/components/Layout';
import { Container, Row, Col, Image } from 'react-bootstrap';
import styles from './gallery.module.css';
import { useState, useEffect } from 'react';
import { client, urlFor } from '@/lib/sanity';
import ImageViewer from '@/components/ImageViewer';

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [showViewer, setShowViewer] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchImages = async () => {
            const query = `*[_type == "galleryImage"] {
                image { asset->{ url, alt } },
                alt
            }`;
            const data = await client.fetch(query);
            setImages(data);
            console.log(data);
        };

        fetchImages();
    }, []);

    const handleImageClick = (image, index) => {
        setSelectedImageIndex(index);
        setShowViewer(true);
    };

    const handleCloseViewer = () => {
        setShowViewer(false);
    };

    return (
        <Layout>
            <Container className="my-5">
                <h1 className="text-center mb-4">Our Gallery</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {images.map((image, index) => (
                        <Col key={image._id}>
                            <div className={styles.imageContainer} onClick={() => handleImageClick(image, index)}> {/* Pass index */}
                                <Image
                                    src={urlFor(image.image).url()}
                                    alt={image.alt}
                                    layout="fill"
                                    objectFit="cover"
                                    className={styles.galleryImage}
                                />
                            </div>
                            <p className={styles.imageCaption}>{image.alt}</p>
                        </Col>
                    ))}
                </Row>
                {showViewer && (
                    <ImageViewer
                        images={images}
                        initialIndex={selectedImageIndex} // Pass index
                        onClose={handleCloseViewer}
                    />
                )}
            </Container>
        </Layout>
    );
};

export default GalleryPage;