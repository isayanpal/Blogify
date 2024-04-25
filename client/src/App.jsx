import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./const/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CreatePost from "./pages/CreatePost";
import Login from "./authPages/Login";
import Register from "./authPages/Register";
import SinglePost from "./pages/SinglePost";
import Edit from "./pages/Edit";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/edit/:id" element={<Edit />} />
          {/* private route */}
          <Route path="/create" element={<CreatePost />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
