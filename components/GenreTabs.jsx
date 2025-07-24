'use client'

import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Row, Col, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';
import MovieCard from './MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTable } from '@fortawesome/free-solid-svg-icons'

library.add(faTable)

const GENRES = [
    { id: 28, name: '액션' },
    { id: 35, name: '코미디' },
    { id: 18, name: '드라마' },
    { id: 27, name: '공포' },
    { id: 10749, name: '로맨스' },
    { id: 878, name: 'SF' },
];

const GenreTabs = () => {
    const [selectedGenre, setSelectedGenre] = useState(GENRES[0].id);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';

    const fetchGenreMovies = async (genreId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/discover/movie?language=ko-KR`, {
                params: {
                    api_key: API_KEY,
                    with_genres: genreId,
                    sort_by: 'popularity.desc',
                },
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('장르별 영화 불러오기 실패:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchGenreMovies(selectedGenre);
    }, [selectedGenre]);

    return (
        <Container className="mt-5">
            <h3 className="my-3"> <FontAwesomeIcon className='me-2 text-secondary' icon="fa-solid fa-table" /> 장르별 인기 영화</h3>
            <ButtonGroup className="mb-4 flex-wrap">
                {GENRES.map((genre) => (
                    <Button
                        key={genre.id}
                        variant={genre.id === selectedGenre ? 'primary' : 'outline-primary'}
                        onClick={() => setSelectedGenre(genre.id)}
                        className="me-2 mb-2"
                    >
                        {genre.name}
                    </Button>
                ))}
            </ButtonGroup>

            {loading ? (
                <div className="text-center mt-4">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row>
                    {movies.slice(0, 3).map((movie) => (
                        <Col key={movie.id} className="mb-4">
                            <MovieCard movie={movie} size={12} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default GenreTabs;
