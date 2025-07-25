'use client'

import React, { useEffect, useState } from 'react';
import FavoriteMovieCard from '../../components/FavoriteMovieCard';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const FavoritesPage = () => {

    let [movieData, setMovieData] = useState([]);

    useEffect(() => {
        // DB에 저장된 즐겨찾기 영화 ID 조회
        const getFavoriteMovieId = async () => {
            try {
                const res = await axios.get('/api/favorite')
                const data = res.data;

                if (data) {
                    const movieId = data.map(data => data.movieId);
                    getFavoriteMovieData(movieId);
                }
            } catch (e) {
                alert(`에러가 발생했습니다.\n에러 : ${e.message}`)
            }
        }

        // DB에서 조회한 영화 ID를 토대로 TMDB API에서 영화정보 조회. 여러 ID값을 조회할 수 없어서 Promise.all을 사용해서 병렬처리함
        const getFavoriteMovieData = async (ids) => {
            try {
                const requests = ids.map(id =>
                    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`)
                );
                const responses = await Promise.all(requests);
                const movies = responses.map(res => res.data);

                setMovieData(movies);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };

        getFavoriteMovieId();
    }, []);

    return (
        <>
            <Container className="mt-4">
                {
                    movieData.length > 0
                        ?
                        movieData.map((movie) => (
                            <FavoriteMovieCard key={movie.id} movie={movie} />
                        ))
                        : <>
                            <div className="text-center my-5">
                                <p>즐겨찾기 된 영화가 없습니다.</p>
                            </div>
                        </>
                }
            </Container>
        </>
    );
};



export default FavoritesPage;
