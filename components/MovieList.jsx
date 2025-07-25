
import MovieCard from './MovieCard';
import { Container, Spinner, Row, Image } from 'react-bootstrap';

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
                                        <div className='text-center'>
                                            <Image src={"computer_search_kensaku.png"} style={{ width: "500px" }} />
                                        </div>
                                        <h4 className="text-center mt-5">검색 결과가 없습니다. 다른 키워드를 입력해 주세요.</h4>
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