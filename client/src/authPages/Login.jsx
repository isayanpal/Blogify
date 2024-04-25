import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://blogify-xy7n.onrender.com/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/");
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="sm:text-3xl text-xl font-semibold text-[var(--accent)]">
          Welcome Back!
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-[10px] sm:w-[500px] w-[350px] bg-slate-200 text-black py-10 rounded-2xl"
        >
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="p-2 rounded-md sm:w-[350px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="p-2 rounded-md sm:w-[350px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-[100px] p-2 rounded-lg text-[var(--text)] bg-[var(--accent)]"
            type="submit"
          >
            Log In
          </button>
          <p>
            Not a User?{" "}
            <a href="/signup" className="text-[var(--accent)]">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
