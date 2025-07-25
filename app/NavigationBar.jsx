'use client'

import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

library.add(faFilm)

export default function NavigationBar({ session }) {
    const [searchTerm, setSearchTerm] = useState('');
    const pathname = usePathname()
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
                    <Navbar.Brand href="/"><FontAwesomeIcon icon="fa-film" /> Movie Finder </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        <Nav className="me-auto">
                            <Nav.Link href={`/popularMovies`} className={`nav-link ${pathname === '/popularMovies' ? 'text-info fw-bold' : ''}`}>인기 영화</Nav.Link>
                            <Nav.Link href={`/newMovies`} className={`nav-link ${pathname === '/newMovies' ? 'text-info fw-bold' : ''}`}>최신 영화</Nav.Link>
                            {
                                session
                                    ? <Nav.Link href={`/favoriteMovies`} className={`nav-link ${pathname === '/favoriteMovies' ? 'text-info fw-bold' : ''}`}>즐겨찾기</Nav.Link>
                                    : ""
                            }
                            {
                                session
                                    ?
                                    <>
                                        <Nav.Link>{session.user.name} 님</Nav.Link>
                                        <Nav.Link onClick={() => { signOut() }}>로그아웃</Nav.Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link onClick={() => { signIn() }}>로그인</Nav.Link>
                                        <Nav.Link href={`/register`}>회원가입</Nav.Link>
                                    </>
                            }

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