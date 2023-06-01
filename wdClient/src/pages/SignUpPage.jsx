import NavbarLoggedOut from "../components/NavbarLoggedOut";

export default function SignUpPage() {
  return (
    <>
      <NavbarLoggedOut />
      <div id="form">
        <h2>Sign Up</h2>
        <form action="/signup" method="POST" className="container signup-form">
          <label>
            {" "}
            Username
            <input type="text" name="username" placeholder="Your username" value="{{username}}" />
          </label>
          <p></p>
          <label>
            {" "}
            Email
            <input type="email" name="email" placeholder="Your email" value="{{email}}" />
          </label>
          <p></p>
          <label>
            {" "}
            Password
            <input type="password" name="password" placeholder="Your password" value="{{password}}" />
          </label>
          <p></p>
          <label>
            {" "}
            Repeat Password
            <input type="password" name="passwordRepeat" placeholder="Repeat your password" value="{{passwordRepeat}}" />
          </label>
          <p></p>

          <button type="submit" className="signup">
            SIGN UP
          </button>

          {/* Need to implement error alert */}
        </form>
      </div>
    </>
  );
}
