import { Routes, Route } from "react-router-dom";
import { authContext } from './contexts/auth.context';
import { useContext } from "react";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/profilePages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ErrorPage from "./pages/ErrorPage";
import EventDetailPage from "./pages/EventDetailPage";
import FindFriendsPage from "./pages/FindFriendsPage";

function App() {

  const {isLoggedIn} = useContext(authContext);

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <DashboardPage/> : <HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/logout" element={<LogoutPage/>} />
        <Route path="/:username" element={<ProfilePage/>}/>
        <Route path="/:username/edit" element={<EditProfilePage/>} />
        <Route path="/events/:eventId" element={<EventDetailPage/>} />
        <Route path="/findfriends" element={<FindFriendsPage/>} />
        <Route path="/*" element={<ErrorPage/>} />
        <Route path="/404" element={<ErrorPage/>} />
      </Routes>      
    </>
  )
}

export default App
