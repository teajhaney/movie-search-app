import { useState } from "react";
import Hero from "./components/Hero";
import PopularMovie from "./components/PopularMovie";
import PopularTvShows from "./components/PopularTvShows";
import Footer from "./components/Footer";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main>
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PopularMovie searchTerm={searchTerm} />
      <PopularTvShows searchTerm={searchTerm} />
      <Footer />
    </main>
  );
};

export default App;
