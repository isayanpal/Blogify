import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    axios.get("http://localhost:5000/api/users/register").then((res) => {
      console.log(res.data);
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      const token = response.data.token;
      if (token) {
        alert("Login Successful");
        setEmail("");
        setPassword("");
        fetchUsers();
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        // Handle scenario if token is not received
        console.log("Token is undefined or null");
      }
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
