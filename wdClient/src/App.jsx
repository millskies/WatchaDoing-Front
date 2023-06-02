import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import DashboardPage from "./pages/DashboardPage";
import UserProfilePage from "./pages/profilePages/UserProfilePage";
import FriendsOverview from "./components/FriendsOverview";
import EditProfilePage from "./pages/EditProfilePage";
import ErrorPage from "./pages/ErrorPage";
import InviteList from "./components/InviteList";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/logout" element={<LogoutPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/:username" element={<UserProfilePage/>}>
          <Route path="/:username/friends" element={<FriendsOverview/>}/>
          <Route path="/:username/friendslists" element={<InviteList/>}/>
        </Route>
        <Route path="/:username/edit" element={<EditProfilePage/>} />
        <Route path="/*" element={<ErrorPage/>} />
        <Route path="/404" element={<ErrorPage/>} />
      </Routes>      
    </>
  )
}

export default App
