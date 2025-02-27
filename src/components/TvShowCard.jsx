import PropTypes from "prop-types";

const TvShowCard = ({
  popularTvShow: {
    original_name,
    vote_average,
    poster_path,
    original_language,
    first_air_date,
  },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/original${poster_path}: 'No-Poster-png.`
            : "No-Poster-png"
        }
        alt={original_name}
      />
      <div className="mt-4">
        <h3>{original_name}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>♦</span>
          <p className="lang">{original_language}</p>
          <span>♦</span>
          <p className="year">
            {first_air_date ? first_air_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};
TvShowCard.propTypes = {
  popularTvShow: PropTypes.object.isRequired,
};

export default TvShowCard;
