
import Layout from '@/components/Layout';
import CarouselSection from './CarouselSection';
import WelcomeSection from './WelcomeSection';
import RoomsSection from './RoomsSection';
import NearbyAttractions from './NearbyAttractions';

export default function Home() {
    return (
        <Layout>
            <CarouselSection />
            <WelcomeSection />
            <RoomsSection />
            <NearbyAttractions />
        </Layout >
    );
}
