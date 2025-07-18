'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// axios 설치 후 검색결과 조회 종료 시 searchResult 페이지로 이동
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

    const movieSearch = async (e) => {
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
                        </Nav>
                        <Form className="d-flex" onSubmit={movieSearch}>
                            <FormControl
                                type="search"
                                placeholder="영화 검색..."
                                className="me-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="outline-info" type="submit">검색</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}