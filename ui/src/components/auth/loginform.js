import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSumbit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        if (res.data.Login) {
          navigate("/dash");
        } else {
          toast.error("Please check your email and password", {
            position: "top-center",
            theme: "dark",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form
        className="m-2 w-full max-w-sm"
        id="customer"
        onSubmit={handleSumbit}
      >
        <div className="mb-9 text-xl ">
          Don't have NewMedia account? Please click!
          <Link to="/register">Sign-Up</Link>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label htmlFor="email">Email</label>
          </div>

          <div className="md:w-3/4">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-700"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label htmlFor="password">Password</label>
          </div>

          <div className="md:w-3/4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-700"
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
            />
          </div>
        </div>
        <button
          onClick={handleSumbit}
          className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
