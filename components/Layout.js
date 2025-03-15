import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
    const pathname = usePathname();
    const [navbarData, setNavbarData] = useState(null);
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const fetchNavbarData = async () => {
            const query = `*[_type == "navbar"][0] {
        logo { asset->{ url, alt } },
        homestayName
      }`;
            const data = await client.fetch(query);
            setNavbarData(data);
        };

        fetchNavbarData();
    }, []);

    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('.sticky-navbar');
            if (navbar) {
                setNavbarHeight(navbar.offsetHeight);
            }
        };

        const handleLoad = () => {
            updateNavbarHeight();
        };

        window.addEventListener('load', handleLoad);
        window.addEventListener('resize', updateNavbarHeight);

        // Initial check after a short delay to ensure rendering
        const timeoutId = setTimeout(updateNavbarHeight, 100);

        return () => {
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('resize', updateNavbarHeight);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="sticky-navbar fixed-top">
                <Container>
                    <Navbar.Brand as={Link} className="navbar-brand-custom" href="/">
                        {navbarData?.logo ? (
                            <Image
                                src={urlFor(navbarData.logo).url()}
                                alt={navbarData.logo.asset.alt || 'Homestay Logo'}
                                height={60}
                                width={60}
                                className="d-inline-block align-top me-2"
                            />
                        ) : null}{' '}
                        {navbarData?.homestayName || 'Dodital Homestay'}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} href="/" active={pathname === "/"}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} href="/rooms" active={pathname === "/rooms"}>
                                Rooms
                            </Nav.Link>
                            <Nav.Link as={Link} href="/explore/gallery" active={pathname === "/explore/gallery"}>
                                Gallery
                            </Nav.Link>
                            {/* <NavDropdown title="Explore" id="explore-dropdown">
                                <NavDropdown.Item
                                    as={Link}
                                    href="/explore/gallery"
                                    active={pathname === "/explore/gallery"}
                                >
                                    Gallery
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={Link}
                                    href="/explore/activities"
                                    active={pathname === "/explore/activities"}
                                >
                                    Activities
                                </NavDropdown.Item>
                            </NavDropdown> */}
                            <Nav.Link as={Link} href="/contact" active={pathname === "/contact"}>
                                Contact
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ paddingTop: `${navbarHeight}px` }}>{children}</div>
            <Footer />
        </>
    );
}