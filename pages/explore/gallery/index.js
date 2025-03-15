import Layout from '@/components/Layout';
import { Container, Row, Col, Modal, Image, Button } from 'react-bootstrap';
import styles from './gallery.module.css';
import { useState, useEffect } from 'react';
import { client, urlFor } from '@/lib/sanity'; // Import Sanity client and urlFor

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const query = `*[_type == "galleryImage"] {
                image { asset->{ url, alt } },
                alt
            }`;
            const data = await client.fetch(query);
            setImages(data);
        };

        fetchImages();
    }, []);

    const handleImageClick = (image) => {
        setModalImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalImage(null);
    };

    const handleNextImage = () => {
        if (!modalImage) return;

        const currentIndex = images.findIndex((img) => img._id === modalImage._id); // Use _id for comparison
        const nextIndex = (currentIndex + 1) % images.length;
        setModalImage(images[nextIndex]);
    };

    const handlePrevImage = () => {
        if (!modalImage) return;

        const currentIndex = images.findIndex((img) => img._id === modalImage._id); // Use _id for comparison
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setModalImage(images[prevIndex]);
    };

    return (
        <Layout>
            <Container className="my-5">
                <h1 className="text-center mb-4">Our Gallery</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {images.map((image) => (
                        <Col key={image._id}>
                            <div className={styles.imageContainer} onClick={() => handleImageClick(image)}>
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

                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalImage?.alt}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalImage && <Image src={urlFor(modalImage.image).url()} alt={modalImage.alt} fluid />}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handlePrevImage}>
                            Previous
                        </Button>
                        <Button variant="primary" onClick={handleNextImage}>
                            Next
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Layout>
    );
};

export default GalleryPage;