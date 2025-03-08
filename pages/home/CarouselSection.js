import { Carousel, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './index.module.css';
import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

const CarouselSection = () => {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      const query = `*[_type == "carouselImage"] {
        image {
          asset->{
            url,
            alt
          }
        },
        title,
        text,
        buttonText,
        buttonLink
      }`;
      const data = await client.fetch(query);
      setCarouselImages(data);
    };

    fetchCarouselImages();
  }, []);

  return (
    <div className={styles.fullWidthCarousel}>
      <Carousel>
        {carouselImages.map((carouselImage, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={urlFor(carouselImage.image).url()}
              alt={carouselImage.image.asset.alt || `Slide ${index + 1}`}
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
            <div className={styles.overlayContainer}>
              <Carousel.Caption className={styles.carouselCaptionCustom}>
                <h3 className={styles.captionTitle}>{carouselImage.title || 'Relax and Rejuvenate'}</h3>
                <p className={styles.captionText}>{carouselImage.text || 'Enjoy a peaceful and comfortable stay.'}</p>
                <Link href={carouselImage.buttonLink || '/explore/gallery'} passHref>
                  <Button variant='success'>{carouselImage.buttonText || 'View Gallery'}</Button>
                </Link>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSection;