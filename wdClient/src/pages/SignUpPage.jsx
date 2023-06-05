import "../css/auth.css";
import NavbarLoggedOut from "../components/NavbarLoggedOut";

export default function SignUpPage() {
  return (
    <>
      <NavbarLoggedOut />
      <div id="signUp">
        <h2>Sign Up</h2>
        <form action="/signup" method="POST" className="container signup-form">
        <div className="col-3">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Your username" value="{{username}}" />
          </div>
          <div className="col-3"><label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="Your email" value="{{email}}" /></div>
          <div className="col-3"><label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Your password" value="{{password}}" /></div>
          <div className="col-3"><label htmlFor="passwordRepeat">Password Repeat</label>
          <input id="passwordRepeat" type="password" name="passwordRepeat" placeholder="Repeat your password" value="{{passwordRepeat}}"/></div>
          <button type="submit" className="signup">
            SIGN UP
          </button>

          {/* Need to implement error alert */}
        </form>
      </div>
    </>
  );
}
