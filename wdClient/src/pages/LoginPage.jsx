import NavbarLoggedOut from "../components/NavbarLoggedOut";

export default function LoginPage() {
  return (
    <>
    <NavbarLoggedOut/>
    <div id="login-form">
  <h2>Log In</h2>
  <form action="/login" method="POST" className="signup-form container">

    <label> Username
      <input type="text" name="username" placeholder="Your username" />
    </label>
<p></p>
    <label> Password
      <input type="password" name="password" placeholder="Your password" />
    </label><br/>
    <a className="forgot" href="/forgot-password">Forgot password?</a>
<p></p>
    <button type="submit" className="signup">LOG IN</button>

{/* Need to implement error alert */}

  </form>
</div>
    </>
  )
}
