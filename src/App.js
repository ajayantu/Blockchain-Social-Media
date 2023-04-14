import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home'
import HomePage from './Components/HomePage/HomePage';
import AddPostModal from './Components/Modals/AddPostModal';
import UserPost from './Components/UserPost/UserPost';
import MyProfile from './Components/MyProfile/MyProfile';
import FriendModal from './Components/Modals/FriendsModal/FriendModal';
import PeopleModal from './Components/Modals/PeopleModal/PeopleModal';
import Navbar from './Components/Navbar/Navbar';
import ChatPage from './Components/ChatPage/ChatPage';
import Chatting from './Components/ChatPage/Chatting';
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
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:userId" element={<Chatting />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
