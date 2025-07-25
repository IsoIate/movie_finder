'use client'

import { Carousel, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowTrendUp)

const MovieCarousel = ({ movies }) => {

    return (
        <>
            <h3 className="my-3"> <FontAwesomeIcon className='me-2 text-danger' icon="fa-solid fa-arrow-trend-up" />인기 급상승 영화 </h3>
            <Carousel className='mb-5'>
                {movies.slice(0, 5).map(movie => (
                    <Carousel.Item key={movie.id} onClick={() => { location.href = `/movie/${movie.id}` }} style={{ cursor: "pointer" }}>
                        <div className="carousel-image-wrapper">
                            <Image
                                className="d-block w-100"
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                            />
                            <div className="overlay" />
                            <Carousel.Caption>
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                            </Carousel.Caption>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}

export default MovieCarousel;