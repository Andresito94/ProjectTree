import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormComponent from "./FormComponent";

export default function FormPage() {
  //States
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate(); // This is a hook that allows you to navigate to a different page in your app.

  //Handlers
  const handleChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    setFormData({ username: "", password: "" });
  };

  const handleRegister = async () => {
    try {
      await axios
        .post("http://localhost:3000/register", {
          username: formData.username,
          password: formData.password,
        })
        .then((response) => {
          setPostResponse(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Render
  return (
    <FormComponent
      goToPage="login"
      currentPage={"register"}
      handleOnChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
      postResponse={postResponse}
    />
  );
}
