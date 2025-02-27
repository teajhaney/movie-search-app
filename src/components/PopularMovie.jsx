import axios from "axios";
import { useEffect, useState,useCallback } from "react";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import { useDebounce } from "react-use";
import PropTypes from "prop-types";

const API_SEARCH_BASE_URL = "https://api.themoviedb.org/3/search/movie?";
const API_BASE_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&sort_by=popularity.desc";
const API_KEY = import.meta.env.VITE_IMDB_API_KEY;
const API_OPTIONS = {
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

const PopularMovie = ({ searchTerm }) => {
  //react hooks
  const [popularMovies, setPopularMovies] = useState([]);

  let [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  // Fetch upcoming movies

  //Debounce the search term
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchPopularMovies = useCallback(async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const url =
        query && query.trim() !== ""
          ? `${API_SEARCH_BASE_URL}query=${encodeURIComponent(searchTerm)}`
          : API_BASE_URL;
      const response = await axios.get(url, API_OPTIONS);

      const popularMoviesData = response.data.results;

      if (
        !popularMoviesData ||
        popularMoviesData.success === false ||
        popularMoviesData.length === 0
      ) {
        setError(
          popularMoviesData.error ||
          "Failed to fetch PopularMoviesData, please try again"
        );
        setPopularMovies([]);
        return;
      }
      setPopularMovies(popularMoviesData || []);
      // return popularMoviesData;
    } catch (error) {
      console.error(error);
      setError("Error fetching data, please try again");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  //call upcoming movies
  useEffect(() => {
    fetchPopularMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchPopularMovies]);

  return (
    <section className="  justify-center px-10 max-w-7xl  relative left-1/2 transform -translate-x-1/2  top-10 z-0  w-full  text-white">
      <div className="all-movies flex flex-col gap-5">
        <h2>Popular Movies</h2>
        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && popularMovies && (
          <ul>
            {popularMovies.map((popularMovie) => (
              <MovieCard key={popularMovie.id} popularMovie={popularMovie} />
            ))}
          </ul>
        )}
        {!loading && popularMovies.length === 0 && !error && (
          <p>No movies found. Try a different search term.</p>
        )}
      </div>
    </section>
  );
};
PopularMovie.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
export default PopularMovie;
