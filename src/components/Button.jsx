import PropTypes from "prop-types";

const Button = ({ text, spanIcon, onClick, className, spanClassName }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`  px-4 py-2   ${className}`}>
        {text} <span className={`${spanClassName}`}> {spanIcon || ""}</span>
      </button>
    </>
  );
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  spanClassName: PropTypes.string,
  spanIcon: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
