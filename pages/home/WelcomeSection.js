import { Container } from 'react-bootstrap';
import styles from './index.module.css';
import { client } from '@/lib/sanity';
import { useEffect, useState } from 'react';

const WelcomeSection = () => {
    const [welcomeData, setWelcomeData] = useState(null);

    useEffect(() => {
        const fetchWelcomeData = async () => {
            const query = `*[_type == "welcome"][0] {
        title,
        text
      }`;
            const data = await client.fetch(query);
            setWelcomeData(data);
        };

        fetchWelcomeData();
    }, []);

    return (
        <div className={styles.welcomeSection}>
            <Container className="text-center">
                <h1 className={styles.welcomeTitle}>{welcomeData?.title || 'Welcome to Our Homestay'}</h1>
                <p className={styles.welcomeText}>
                    {welcomeData?.text || 'A peaceful retreat in the heart of nature. We offer a unique and welcoming homestay experience, providing comfortable accommodations and personalized service. Our goal is to make your stay memorable and enjoyable.'}
                </p>
            </Container>
        </div>
    );
};

export default WelcomeSection;