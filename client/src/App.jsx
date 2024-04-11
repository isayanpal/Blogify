import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./const/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default App;
