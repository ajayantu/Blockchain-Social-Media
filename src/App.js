import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home'
import HomePage from './Components/HomePage/HomePage';
import Profile from './Components/Profile/Profile';
import People from './Components/People/People';
import Friends from './Components/Friends/Friends';
import AddPostModal from './Components/Modals/AddPostModal';
import UserPost from './Components/UserPost/UserPost';
import MyProfile from './Components/MyProfile/MyProfile';
import FriendModal from './Components/Modals/FriendsModal/FriendModal';
import PeopleModal from './Components/Modals/PeopleModal/PeopleModal';
import Navbar from './Components/Navbar/Navbar';
function App() {
  
  return (
    <>
    <Navbar />
    <AddPostModal />
    <FriendModal />
    <PeopleModal />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/mypost" element={<UserPost />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
