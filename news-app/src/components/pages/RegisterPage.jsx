import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appentData = new FormData();

      appentData.append("name", name);
      appentData.append("email", email);
      appentData.append("password", password);
      appentData.append("address", address);
      appentData.append("profilePic", profilePic);

      const res = await axios.post("/api/v1/auth/register", appentData);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
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
            height="75%"
            src="https://as2.ftcdn.net/v2/jpg/00/68/70/45/1000_F_68704548_Sp5sLKg5ji2S2j4tZovGB6SVdciAPcJi.jpg"
          />
          <img
            alt="social "
            className="socialMobile"
            src="https://as2.ftcdn.net/v2/jpg/00/68/70/45/1000_F_68704548_Sp5sLKg5ji2S2j4tZovGB6SVdciAPcJi.jpg"
          />
        </div>
        <div className="col-md-5 col-sm-12">
          <div class="card shadow">
            <div className="card-body px-5">
              <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="p-2 mt-4  mb-2 form-control "
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="p-2   mb-2 form-control "
                  placeholder="Email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  className="p-2  mb-2 form-control "
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="password"
                  className=" p-2 mb-2 form-control "
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {profilePic ? profilePic.name : "Upload Photo"}
                    <input
                      type="file"
                      name="profilePic"
                      accept="image/*"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>

                <div className=" mt-3 d-grid">
                  <button className="btn btn-primary">Sign Up</button>
                </div>
                <div className="mt-3">
                  <hr className="text-muted" />
                  <h3 className="text-muted text-center">OR</h3>
                  <hr className="text-muted" />
                </div>

                <div className="mt-3 mb-5 d-grid">
                  <button className="custom-btn custom-btn-white">
                    <span className="text-muted fs-6">
                      Already have an account
                    </span>
                    <Link to="/login" className="ms-1  fw-bold">
                      log in
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

export default RegisterPage;
