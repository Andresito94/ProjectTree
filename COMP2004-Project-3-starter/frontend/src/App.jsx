import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import CreateUserPage from "./Components/CreateUserPage";
import NotFoundPage from "./Components/NotFoundPage";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import FormPage from "./Components/FormPage";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivatePage from "./Components/PrivatePage";
import NotAuthorized from "./Components/NotAuthorized";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route element={<PrivateRoute />}>
        <Route path="/private" element={<PrivatePage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/main" element={<GroceriesAppContainer />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
