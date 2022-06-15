import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Components/Layout/WebLayout/WebLayout";
import ScrollToTop from "./Components/Layout/ScrollToTop";
import LogIn from "./Components/ClientPages/LogInAndSignUp/login";
import SignUp from "./Components/ClientPages/LogInAndSignUp/signup";

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route end path="/*" element={<DefaultLayout />} />
          <Route end path="/login" element={<LogIn />} />
          <Route end path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
