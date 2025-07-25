'use client';

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import MovieList from "@/components/MovieList";
import MoviePagination from "@/components/MoviePagenation";
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default function newMovies({ searchParams }) {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const pathname = usePathname();
    let currentPage = parseInt(searchParams?.page || '1');

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/discover/movie?sort_by=release_date.desc&vote_count.gte=50&language=ko-KR&api_key=${API_KEY}&page=${currentPage}`)
            .then((res) => {
                setMovies(res.data.results);
                setTotalPages(res.data.total_pages);
                setLoading(false);
            })
            .catch((e) => {
                alert(`에러가 발생했습니다.\n에러 : ${e.message}`)
            });

    }, [searchParams]);

    return (
        <>
            {
                loading == true
                    ? <div className="text-center my-5">
                        <Spinner animation="border" />
                        <p>로딩 중...</p>
                    </div>
                    : <>
                        <MovieList loading={loading} movies={movies} />
                        <MoviePagination pathname={pathname} currentPage={currentPage} totalPages={totalPages} />
                    </>
            }
        </>
    )
}