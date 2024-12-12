import { useNavigate } from "react-router-dom";
export default function FormComponent({
  handleOnChange,
  handleSubmit,
  formData,
  postResponse,
  goToPage,
  currentPage,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>{currentPage}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <br />
        <label htmlFor="password">password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value="hello"
          onChange={handleOnChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {postResponse && <p>{postResponse}</p>}
      <button onClick={() => navigate(`/${goToPage}`)}>
        {goToPage == "login" ? "Go to Login Page" : "Go to registary page"}
      </button>
    </div>
  );
}
