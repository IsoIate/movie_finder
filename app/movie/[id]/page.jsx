'use client'

import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import MovieDetail from '@/components/MovieDetail';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function MovieDetailPage({ params }) {
    let [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/no-image.png';

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=ko-KR`, {
            cache: 'no-store', // 최신 정보 유지
        })
            .then((res) => {
                setMovie(res.data)
                setLoading(false)
            })
            .catch((e) => {
                alert(`에러가 발생했습니다.\n에러 : ${e.message}`)
            });
    }, [])


    return (
        <>
            {
                loading == true
                    ? <div className="text-center my-5">
                        <Spinner animation="border" />
                        <p>로딩 중...</p>
                    </div>
                    : <MovieDetail movie={movie} posterUrl={posterUrl} />
            }

        </>
    );
}
