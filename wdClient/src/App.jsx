import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/profilePages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ErrorPage from "./pages/ErrorPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/logout" element={<LogoutPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/:username" element={<ProfilePage/>}/>
        <Route path="/:username/edit" element={<EditProfilePage/>} />
        <Route path="/*" element={<ErrorPage/>} />
        <Route path="/404" element={<ErrorPage/>} />
      </Routes>      
    </>
  )
}

export default App
