'use client'

import React, { useEffect, useState } from 'react';
import {
    Navbar,
    Nav,
    Container,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';
import { useRouter } from 'next/navigation';



export default function NavigationBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const movieSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        router.push(`/searchResult?movieName=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">🎬 Movie Finder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        <Nav className="me-auto">
                            <Nav.Link href={`/popularMovies`}>인기 영화</Nav.Link>
                            <Nav.Link href={`/newMovies`}>최신 영화</Nav.Link>
                            <Nav.Link href={`/favoriteMovies`}>즐겨찾기</Nav.Link>
                        </Nav>
                        <Form className="d-flex align-items-center" onSubmit={movieSearch}>
                            <FormControl
                                type="search"
                                placeholder="영화 검색..."
                                className="me-2 "
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="outline-info" style={{ flex: "0 0 auto" }} type="submit">검색</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}