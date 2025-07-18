'use client';

import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

const MovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/no-image.png';

    return (
        <Col md={3} sm={6} xs={12} className="mb-4">
            <Link href={`/movie/${movie.id}`} className='text-decoration-none'>
                <Card>
                    <Image
                        src={posterUrl}
                        alt={movie.title}
                        width={500}
                        height={750}
                        className="card-img-top"
                    />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>
                            ⭐ {movie.vote_average.toFixed(1)} | 📅 {movie.release_date}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default MovieCard;
