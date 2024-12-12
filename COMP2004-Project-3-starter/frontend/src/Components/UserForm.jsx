export default function UserForm({
  handleOnSubmit,
  handleOnChange,
  formData,
  postResponse,
  btnText,
}) {
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleOnChange}
        />
        <br />
        <button>{btnText}</button>
      </form>
      {postResponse}
    </div>
  );
}
