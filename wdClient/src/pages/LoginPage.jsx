import NavbarLoggedOut from "../components/NavbarLoggedOut";

export default function LoginPage() {
  return (
    <>
    <NavbarLoggedOut/>
    <div id="login">
  <h2>Log In</h2>
  <form action="/login" method="POST" className="signup-form container">
  <div className="col-3">
    <label htmlFor="username"> Username</label>
      <input id="username" type="text" name="username" placeholder="Your username" />
    </div>
    <div className="col-3">
    <label htmlFor="password"> Password</label>
      <input id="password" type="password" name="password" placeholder="Your password" />
      </div>
    <a className="forgot" href="/forgot-password">Forgot password?</a> {/* changeLater: this won't be an anchor */}
    <button type="submit" className="signup">LOG IN</button>

{/* changeLater: Need to implement error alert */}

  </form>
</div>
    </>
  )
}
