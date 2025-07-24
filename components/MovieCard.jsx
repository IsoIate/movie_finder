'use client';

import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

library.add(fasStar, faCalendarDays)


const MovieCard = ({ movie, size }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/no-image.png';

    return (
        <Col md={size} className="mb-4">
            <Card className="h-100 w-100 shadow-sm">
                <Link href={`/movie/${movie.id}`} className="text-decoration-none">
                    <div style={{ position: 'relative', width: '100%', height: '375px' }}>
                        <Image
                            src={posterUrl}
                            alt={movie.title}
                            fill
                            style={{ objectFit: 'cover', borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}
                        />
                    </div>
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="fs-6 text-dark">{movie.title}</Card.Title>
                        <Card.Text className="text-muted mt-auto">
                            <FontAwesomeIcon className='text-warning' icon="fa-solid fa-star" /> {movie.vote_average.toFixed(1)} |&nbsp;
                            <FontAwesomeIcon className='text-secondary' icon="fa-solid fa-calendar-days" /> {movie.release_date}
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </Col>


    );
};

export default MovieCard;
