'use client';

import { useEffect, useState } from "react";
import { Spinner, Container } from 'react-bootstrap';
import axios from 'axios';
import './styles/globals.css';
import GenreTabs from "@/components/GenreTabs";
import MovieCarousel from "@/components/MovieCarousel";
import HeroSection from "@/components/HeroSection";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default function HomePage() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/trending/movie/week?language=ko-KR&api_key=${API_KEY}`)
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((e) => {
        alert(`에러가 발생했습니다.\n에러 : ${e.message}`)
      });

  }, []);

  return (
    <>
      {
        loading == true
          ? <div className="text-center my-5">
            <Spinner animation="border" />
            <p>로딩 중...</p>
          </div>
          : <>
            <Container>
              <HeroSection></HeroSection>
              <MovieCarousel movies={movies}></MovieCarousel>
              <GenreTabs></GenreTabs>
            </Container>
          </>
      }
    </>
  )
}