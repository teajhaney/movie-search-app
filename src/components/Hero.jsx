import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import Button from "./button";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const API_BASE_URL =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
const API_KEY = import.meta.env.VITE_IMDB_API_KEY;
const API_OPTIONS = {
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

const Hero = ({ searchTerm, setSearchTerm }) => {
  //react hooks
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  let [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Fetch upcoming movies
  const fetchUpcomingMovie = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_BASE_URL, API_OPTIONS);

      const movieData = response.data.results;

      if (!movieData || movieData.success === false || movieData.length === 0) {
        setError(
          movieData.error || "Failed to fetch movieData, please try again"
        );
        setUpcomingMovie([]);
        return;
      }
      setUpcomingMovie(movieData || []);

      return movieData;
    } catch (error) {
      console.error(error);
      setError("Error fetching data, please try again");
    } finally {
      setLoading(false);
    }
  };
  const currentUpcomingMovie = upcomingMovie[currentMovieIndex];
  // Function to go to the next movie
  const handleNextMovie = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex < upcomingMovie.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
  // Function to go to the next movie
  const handlePrevMovie = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  //call upcoming movies
  useEffect(() => {
    fetchUpcomingMovie();
  }, []);

  // Get the current movie

  // Build the background image URL
  const bgImage = currentUpcomingMovie
    ? `url(https://image.tmdb.org/t/p/original${currentUpcomingMovie.poster_path})`
    : "No-Poster-land.png";

  //description
  const description =
    currentUpcomingMovie?.overview?.replace(/Watch Here :.*$/, "").trim() ||
    "No description available.";
  return (
    <div className="hero" style={{ backgroundImage: bgImage }}>
      <div className="contain">
        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && currentUpcomingMovie && (
          <div className="flex flex-col items-start gap-5">
            <h1 className="">{currentUpcomingMovie.title}</h1>
            <div className="h-60 lg:text-2xl ">
              <h3 className="max-w-2xl">{description}</h3>
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-primary text-white hover:bg-primary_hover transition rounded-full"
                spanClassName="text-white"
                text="Watch Now"
                spanIcon="▶"
              />
              <Button
                className="bg-primary text-black hover:bg-primary_hover transition rounded-full"
                spanClassName="text-black"
                text="Details"
                spanIcon=">"
              />
            </div>
            <div className="flex gap-3 ">
              <Button
                className="bg-yellow text-black hover:bg-yellow_hover transition rounded-full"
                text="Back"
                onClick={handlePrevMovie}
              />
              <Button
                className="bg-yellow text-black hover:bg-yellow_hover transition rounded-full"
                text="Next"
                onClick={handleNextMovie}
              />
            </div>
          </div>
        )}
      </div>

      <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};
Hero.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
export default Hero;
