// components/Header.js

import { Container, Navbar, Nav, Image } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity';
import { useEffect, useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [navbarData, setNavbarData] = useState(null);

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
    },);

    return (
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
                        <Nav.Link as={Link} href="/contact" active={pathname === "/contact"}>
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}