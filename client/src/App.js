import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "scenes/loginPage";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import { useSelector } from "react-redux";
import FriendListPage from "scenes/friendListPage";

function App() {
  const isAuth = Boolean(useSelector(state=>state.token))
  return (
    <div className="app" style={{overflowY:'hidden'}}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth? <Navigate to='/home'/>:<LoginPage/>} />
            <Route
              path="/home"
              element={isAuth? <HomePage />:<Navigate to='/'/>}
            />
            <Route
              path="/profile/:userId"
              element={isAuth? <ProfilePage/>:<Navigate to='/'/>}
            />
            <Route path="/friendList" element={<FriendListPage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
