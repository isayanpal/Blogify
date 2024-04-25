import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(() => fetchUsers(), []);
  // const fetchUsers = () => {
  //   axios.get("http://localhost:5000/api/users/info").then((res) => {
  //     console.log(res.data._id);
  //   });
  // };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
      })
      .then(() => {
        alert("Registration Successful");
        setUserName("");
        setEmail("");
        setPassword("");
        // fetchUsers();
        navigate("/login");
      })
      .catch((error) => {
        console.log("Registration Error", error);
      });
  };

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="sm:text-3xl text-xl font-semibold text-[var(--accent)]">
          Get Started!
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center gap-[10px] sm:w-[500px] w-[350px] bg-slate-200 text-black py-10 rounded-2xl"
        >
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            className="p-2 rounded-md sm:w-[350px]"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
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
            Register
          </button>
          <p>
            Already a User?{" "}
            <a href="/login" className="text-[var(--accent)]">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
