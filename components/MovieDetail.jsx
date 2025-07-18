import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import Image from 'next/image';

const MovieDetail = ({ movie, posterUrl }) => {
    return (
        <>
            <Container className="my-5">
                <Row>
                    {/* 포스터 */}
                    <Col md={4}>
                        <Image
                            src={posterUrl}
                            alt={movie.title}
                            width={500}
                            height={750}
                            className="img-fluid rounded shadow"
                        />
                    </Col>

                    {/* 정보 */}
                    <Col md={8}>
                        <h1>{movie.title}</h1>
                        <p className="text-muted">
                            개봉일: {movie.release_date} | 평점: ⭐ {movie.vote_average}
                        </p>

                        {/* 장르 */}
                        <div className="mb-3">
                            {movie.genres.map((genre) => (
                                <Badge key={genre.id} bg="info" className="me-2">
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>

                        {/* 개요 */}
                        <Card>
                            <Card.Body>
                                <Card.Title>줄거리</Card.Title>
                                <Card.Text>
                                    {movie.overview || '줄거리 정보가 없습니다.'}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        {/* 홈페이지 링크 */}
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

export default MovieDetail;