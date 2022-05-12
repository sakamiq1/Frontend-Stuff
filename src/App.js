import DefaultLayout from "./Components/Layout/WebLayout/index";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { LogIn } from "./Components/Layout/LogInAndSignUp";

function App() {
  const currentUser = localStorage.getItem("Token");
  return (
    <>
      <Router>
        <Routes>
          <Route end path="/*" element={<DefaultLayout />} />
          <Route
            end
            path="/login"
            element={!currentUser ? <LogIn /> : <Navigate to="/home" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
