import React, { useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContex";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
          <img
            alt="social "
            className="socialDesktop"
            height="100%"
            src="https://t3.ftcdn.net/jpg/01/82/04/38/240_F_182043866_cQZwPYqKo2xZvZ8sSwW7rdRbf72GcsH4.jpg"
          />
          <img
            alt="social "
            className="socialMobile"
            src="https://t3.ftcdn.net/jpg/01/82/04/38/240_F_182043866_cQZwPYqKo2xZvZ8sSwW7rdRbf72GcsH4.jpg"
          />
        </div>
        <div className="col-md-5 col-sm-12">
          <div class="card shadow">
            <div className="card-body px-5">
              <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
              <form onSubmit={handleLogin}>
                <input
                  type="Email"
                  className="p-2 mt-4  mb-2 form-control input-bg"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className=" p-2 mb-2 form-control input-bg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className=" mt-3 d-grid">
                  <button className="btn btn-primary ">login</button>
                </div>
                <div className="mt-3">
                  <hr className="text-muted" />
                  <h3 className="text-muted text-center">OR</h3>
                  <hr className="text-muted" />
                </div>

                <div className="mt-3 mb-5 d-grid">
                  <button className="custom-btn custom-btn-white">
                    <span className="text-muted fs-6">
                      Don't have an account?
                    </span>
                    <Link to="/register" className="ms-1  fw-bold">
                      Sign Up
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
