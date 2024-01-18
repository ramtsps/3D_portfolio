import { Navbar } from "../components";
import "../App.scss";
import { About, Footer, Header, Skills, Work } from "../container";
// import Sendwork from "./server/sendwork";
// import Sendabout from "./server/sendabout";
// import SendSkills from "./server/sendskill";

const Main = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Footer />
    </div>
  );
};

export default Main;
