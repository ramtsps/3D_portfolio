import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Sendinfo from "./server/sendinf";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Sendinfo />} />
    </Routes>
  );
};

export default App;
