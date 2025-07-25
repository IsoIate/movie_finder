import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import axios from 'axios';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'

library.add(farStar, fasStar)

const MovieDetail = ({ movie, posterUrl }) => {

    let [favorite, setFavorite] = useState(false);

    useEffect(() => {   // 영화 상세정보 조회
        axios.get(`/api/movie?movieId=${movie.id}`)
            .then((res) => {
                res.data
                    ? setFavorite(true)
                    : setFavorite(false)
            })
            .catch((e) => {
                alert(`에러가 발생했습니다.\n에러 : ${e.message}`)
            })
    }, [movie.id])

    const setFavoriteMovie = () => {    // 즐겨찾기 된 영화인지 조회
        axios.post('/api/movie', {
            movieId: movie.id.toString(),
            isFavorite: !favorite
        })
            .then((res) => {
                setFavorite(!favorite)
            })
            .catch((e) => {
                alert(`에러가 발생했습니다.\n에러 : ${e.message}`)
            })
    }

    return (
        <>
            <Container className="my-5">
                <Row>
                    <Col md={4}>
                        <Image
                            src={posterUrl}
                            alt={movie.title}
                            width={500}
                            height={750}
                            className="img-fluid rounded shadow"
                        />
                        <div className='d-flex justify-content-center'>
                            <Button className='mt-4 mx-auto' variant="secondary" onClick={() => { setFavoriteMovie() }}> 즐겨찾기
                                {
                                    favorite === true
                                        ? <SolidStar />
                                        : <RegularStar />
                                }
                            </Button>
                        </div>
                    </Col>

                    <Col md={8}>
                        <h1>{movie.title}</h1>
                        <p className="text-muted">
                            개봉일: {movie.release_date} | 평점: <FontAwesomeIcon className='text-warning' icon="fa-solid fa-star" /> {movie.vote_average}
                        </p>

                        <div className="mb-3">
                            {movie.genres.map((genre) => (
                                <Badge key={genre.id} bg="info" className="me-2">
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>

                        <Card>
                            <Card.Body>
                                <Card.Title>줄거리</Card.Title>
                                <Card.Text>
                                    {movie.overview || '줄거리 정보가 없습니다.'}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        {movie.homepage && (
                            <Button
                                variant="primary"
                                className="mt-4"
                                href={movie.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                공식 홈페이지 방문
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}


function SolidStar() {
    return (
        <FontAwesomeIcon className='text-warning ms-2' icon="fa-solid fa-star" />
    )
}

function RegularStar() {
    return (
        <FontAwesomeIcon className='ms-2' icon="fa-regular fa-star" />
    )
}

export default MovieDetail;