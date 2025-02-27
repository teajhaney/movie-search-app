import { navItems } from "../constant/constant";
// import { useState } from "react";
import PropTypes from "prop-types";

const Navigation = ({ searchTerm, setSearchTerm }) => {
  // const [searchTerm, setSearchTerm] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      (event) => setSearchTerm(event.target.value);
      event.target.value = "";
      setSearchTerm("");
    }
  }
  return (
    <>
      <nav className="fixed left-1/2 transform -translate-x-1/2  top-10 z-50 flex w-full px-10 max-w-7xl justify-between items-center text-white">
        <h2 id="#home" className="">
          Disco <span className="text-gradient">movie</span>
        </h2>
        <div>
          <ul className="hidden lg:flex space-x-4 text-[#030014] text-2xl font-bold">
            {navItems.map((navItem, index) => (
              <li key={index} className="inline ">
                <a href={`#${navItem.toLowerCase()}`} className="">
                  {navItem}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <input
          className="p-2 lg:w-80 items-center text-sm text-[#030014] border  focus:border-[#030014] focus:border-1 border-[#0F0D23] bg-[#AB8BFF] rounded-lg"
          type="search"
          name="search"
          placeholder="Search through thousands movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={handleKeyDown}
          id=""
        />
      </nav>
    </>
  );
};
Navigation.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
export default Navigation;
