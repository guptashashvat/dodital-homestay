import Layout from '@/components/Layout';
import { Container, Row, Col, Modal, Image, Button } from 'react-bootstrap';
import styles from './gallery.module.css';
import { useState } from 'react';

const GalleryPage = () => {
    const images = [
        { id: 1, src: '/images/gallery/image1.jpg', alt: 'Homestay Exterior' },
        { id: 2, src: '/images/gallery/image2.jpg', alt: 'Cozy Living Room' },
        { id: 3, src: '/images/gallery/image3.jpg', alt: 'Comfortable Bedroom' },
        { id: 4, src: '/images/gallery/image4.jpg', alt: 'Dining Area' },
        { id: 5, src: '/images/gallery/image5.jpg', alt: 'Scenic View' },
        // Add more images as needed
    ];

    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    const handleImageClick = (image) => {
        setModalImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalImage(null);
    };

    const handleNextImage = () => {
        if (!modalImage) return; // Prevent errors if modalImage is null

        const currentIndex = images.findIndex((img) => img.id === modalImage.id);
        const nextIndex = (currentIndex + 1) % images.length;
        setModalImage(images[nextIndex]);
    };

    const handlePrevImage = () => {
        if (!modalImage) return; // Prevent errors if modalImage is null

        const currentIndex = images.findIndex((img) => img.id === modalImage.id);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setModalImage(images[prevIndex]);
    };

    return (
        <Layout>
            <Container className="my-5">
                <h1 className="text-center mb-4">Our Gallery</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {images.map((image) => (
                        <Col key={image.id}>
                            <div className={styles.imageContainer} onClick={() => handleImageClick(image)}>
                                <Image
                                    src={image.src}
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
                        {modalImage && <Image src={modalImage.src} alt={modalImage.alt} fluid />}
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