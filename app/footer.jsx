
'use client';

import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 py-4">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={8}>
                        <p className="mb-2">
                            This product uses the TMDB API but is not endorsed or certified by TMDB.
                        </p>
                    </Col>
                    <Col xs={12} md={4} className="text-md-end text-center">
                        <Image
                            src="/tmdb_logo.svg"
                            alt="TMDB Logo"
                            height={40}
                            fluid
                        />
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
