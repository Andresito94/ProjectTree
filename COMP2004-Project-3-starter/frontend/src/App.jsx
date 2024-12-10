import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import CreateUserPage from "./Components/CreateUserPage";
import NotFoundPage from "./Components/NotFoundPage";
import LoginPage from "./Components/LoginPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/main" element={<GroceriesAppContainer />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
