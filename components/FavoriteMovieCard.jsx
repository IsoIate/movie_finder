'use client';

import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

const FavoriteMovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/no-image.png';

    return (
        <Col className="mb-4">
            <Link href={`/movie/${movie.id}`} className='text-decoration-none'>
                <Card className='d-flex flex-row col-12'>
                    <Card.Body className='col-3'>
                        <Image
                            src={posterUrl}
                            alt={movie.title}
                            width={500}
                            height={200}
                            className="card-img-top"
                        />
                    </Card.Body>
                    <Card className='col-9 border-white'>
                        <Card.Body className='d-flex flex-row justify-content-between'>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>
                                📅 {movie.release_date} | ⭐ {movie.vote_average.toFixed(1)}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>줄거리</Card.Title>
                            <Card.Text>
                                {movie.overview || '줄거리 정보가 없습니다.'}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Card>
            </Link>
        </Col >
    );
};

export default FavoriteMovieCard;