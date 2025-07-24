'use client'

import MovieList from "@/components/MovieList";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import MoviePagination from "@/components/MoviePagenation";
import { Spinner } from 'react-bootstrap';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default function SearchResult({ searchParams }) {

    const searchTerm = searchParams.movieName;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const pathname = usePathname();
    let currentPage = parseInt(searchParams?.page || '1');


    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchTerm}&page=${currentPage}`)
            .then((res) => {
                setMovies(res.data.results);
                setTotalPages(res.data.total_pages);
                console.log(res.data)
            })
            .catch((e) => {
                alert(`에러가 발생했습니다.\n에러 : ${e.message}`)
            });
        setLoading(false);
    }, [searchParams])

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