import axios from "axios";
import UserForm from "./UserForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; //this is for going back to pages

export default function CreateUserPage() {
  //states
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();

  //handlers
  const handleCreateUser = async () => {
    try {
      axios
        .post("http://localhost:3000/create-user", {
          username: formData.username,
          password: formData.password,
        })
        .then((response) => setPostResponse(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleCreateUser();
    setFormData({
      username: "",
      password: "",
    });
  };

  //renderer
  return (
    <div>
      <h1>Create User</h1>
      <UserForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        postResponse={postResponse}
        btnText="Create User"
      />
      <Link to="/login">Back to login Page</Link>
    </div>
  );
}
