
import MovieCard from './MovieCard';
import {
    Container,
    Spinner,
    Row,
} from 'react-bootstrap';

const MovieList = ({ loading, movies }) => {

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
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                        ) : (
                            <p className="text-center">영화를 찾을 수 없습니다.</p>
                        )}
                    </Row>
                )}
            </Container>
        </>
    )
}

export default MovieList;