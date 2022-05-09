import DefaultLayout from "./Components/Layout/WebLayout/index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route end path="/*" element={<DefaultLayout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
