import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="signup" element={<SignUpPage/>} />
        <Route path="login" element={<LoginPage/>} />
      </Routes>      
    </>
  )
}

export default App
