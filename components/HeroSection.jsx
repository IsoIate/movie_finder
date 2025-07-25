import { Container, Row, Col, Button, Image } from 'react-bootstrap';

function HeroSection() {
    return (
        <div className="bg-light py-5 mb-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start">
                        <h1 className="display-4 fw-bold"> 당신의 다음 영화는? </h1>
                        <p className="lead">
                            지금 인기 있는 영화와 평점 높은 작품을 찾아보세요.<br />원하는 장르로 검색도 가능합니다!
                        </p>
                        <Button variant="primary" size="lg" href="/searchResult">
                            영화 검색하러 가기
                        </Button>
                    </Col>
                    <Col md={6} className="text-center mt-4 mt-md-0">
                        <Image src={"kandou_movie_eigakan.png"} style={{ maxHeight: '300px' }} alt='kandou_movie_eigakan' />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HeroSection;
