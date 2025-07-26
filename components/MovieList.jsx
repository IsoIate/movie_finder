'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MovieCard from './MovieCard';
import { Container, Spinner, Row, Image, FormControl, Form, Button } from 'react-bootstrap';

const MovieList = ({ loading, movies }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const movieSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        router.push(`/searchResult?movieName=${encodeURIComponent(searchTerm)}`);
    };


    return (
        <>
            <Container className="my-4">
                {loading ? (
                    <div className="text-center my-5">
                        <Spinner animation="border" />
                        <p>로딩 중...</p>
                    </div>
                ) : (
                    <Row>
                        {
                            movies.length > 0
                                ?
                                (
                                    movies.map((movie) => (
                                        <MovieCard key={movie.id} movie={movie} size={3} />
                                    ))
                                )
                                :
                                (
                                    <>
                                        <Container>
                                            <div className='text-center'>
                                                <Image src={"computer_search_kensaku.png"} style={{ width: "500px" }} alt='computer_search_kensaku' />
                                            </div>
                                            <h4 className="text-center mt-5">검색 결과가 없습니다. 다른 키워드를 입력해 주세요.</h4>
                                            <div className='d-flex justify-content-center'>
                                                <Form className="d-flex align-items-center mt-3" onSubmit={movieSearch}>
                                                    <FormControl
                                                        type="search"
                                                        placeholder="영화 검색..."
                                                        className="me-2"
                                                        style={{ width: "40vw", maxWidth: "450px", minWidth: "400px" }}
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                    <Button variant="outline-info" style={{ flex: "0 0 auto" }} type="submit">검색</Button>
                                                </Form>
                                            </div>
                                        </Container>
                                    </>
                                )
                        }
                    </Row>
                )}
            </Container>
        </>
    )
}

export default MovieList;