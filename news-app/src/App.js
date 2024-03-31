import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateNews from "./components/CreateNewsFeed";
import PerformanceChart from "./components/PerformanceReport";
import NavBar from "./components/NavBar";
import Login from "./components/pages/LoginPage";
import Register from "./components/pages/RegisterPage";
import ProfilePage from "./components/pages/ProfilePage";
import Header from "./components/pages/Header";
import TopHeadLines from "./components/category/TopHeadlines";
import Business from "./components/category/Business";
import Entertainment from "./components/category/Entertainment";
import Sports from "./components/category/Sports";
import Health from "./components/category/Health";
import Science from "./components/category/Science";
import Technology from "./components/category/Technology";
import General from "./components/category/General";
import UpdateProfile from "./components/pages/UpdateProfile";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="create-news" element={<CreateNews />} />
        <Route path="/report" element={<PerformanceChart />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
        <Route path="/top-headlines" element={<TopHeadLines />} />
        <Route path="/business" element={<Business />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/general" element={<General />} />
        <Route path="/health" element={<Health />} />
        <Route path="/science" element={<Science />} />
        <Route path="/technology" element={<Technology />} />
      </Routes>
    </>
  );
}

export default App;
