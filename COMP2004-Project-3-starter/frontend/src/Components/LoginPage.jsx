import axios from "axios";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import FormComponent from "./FormComponent";
import Cookies from "js-cookies";
import { Link, useNavigate } from "react-router-dom"; //this is for going back to pages
export default function LoginPage() {
  // States
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();
  //handlers
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const handleCookie = (jwtToken) => {
    Cookies.set("jwt-authorization", jwtToken);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setFormData({ username: "", password: "" });
  };
  const handleLogin = async () => {
    try {
      await axios
        .post("http://localhost:3000/login", {
          username: formData.username,
          password: formData.password,
        })
        .then((response) => {setPostResponse(response.data.message)
          if(response.data.message === "User authenticated"){
            handleCookie(response.data.token);
            navigate("/private");

          }
        });
    } catch (error) {
      console.log(error);
    }
    };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setFormData({ username: "", password: "" });
    };
  // Render
    return (
    <div>
      <h1>Login Page</h1>
      <UserForm
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        btnText="Login"
      />
      <Link to="/create-user">Don't Have a account Create User</Link>
    </div>
  );
}
