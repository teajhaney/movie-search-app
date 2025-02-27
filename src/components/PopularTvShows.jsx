import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Spinner from "./Spinner";
import TvShowCard from "./tvShowcard";
import PropTypes from "prop-types";
import { useDebounce } from "react-use";

const API_SEARCH_BASE_URL = "https://api.themoviedb.org/3/search/tv?";
const API_BASE_URL =
  "https://api.themoviedb.org/3/discover/tv?include_adult=true&include_video=true&sort_by=popularity.desc";
const API_KEY = import.meta.env.VITE_IMDB_API_KEY;
const API_OPTIONS = {
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

const PopularTvShows = ({ searchTerm }) => {
  //react hooks
  const [popularTvShows, setPopularTvShows] = useState([]);
  let [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  //Fetch upcoming movies
  const fetchPopularTvShows = useCallback(async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const url =
        query && query.trim() !== ""
          ? `${API_SEARCH_BASE_URL}query=${encodeURIComponent(searchTerm)}`
          : API_BASE_URL;
      const response = await axios.get(url, API_OPTIONS);

      const popularTvShowsData = response.data.results;
      console.log(popularTvShowsData);

      if (
        !popularTvShowsData ||
        popularTvShowsData.success === false ||
        popularTvShowsData.length === 0
      ) {
        setError(
          popularTvShowsData.error ||
            "Failed to fetch popularTvShowsData, please try again"
        );
        setPopularTvShows([]);
        return;
      }
      setPopularTvShows(popularTvShowsData || []);

      return popularTvShowsData;
    } catch (error) {
      console.error(error);
      setError("Error fetching data, please try again");
    } finally {
      setLoading(false);
    }
  },[searchTerm]);

  //call upcoming movies
  useEffect(() => {
    fetchPopularTvShows(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchPopularTvShows]);

  return (
    <section className="  my-20 justify-center px-10 max-w-7xl  relative left-1/2 transform -translate-x-1/2  top-10 z-0  w-full  text-white">
      <div className="all-movies flex flex-col gap-5">
        <h2>Popular Tv shows</h2>
        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && popularTvShows && (
          <ul>
            {popularTvShows.map((popularTvShow) => (
              <TvShowCard
                key={popularTvShow.id}
                popularTvShow={popularTvShow}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

PopularTvShows.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default PopularTvShows;
