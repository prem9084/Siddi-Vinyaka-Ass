import React, { useEffect, useState } from "react";
// import "./Profile.css";

import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilPic] = useState("");
  const getSingleUser = async (e) => {
    try {
      const { data } = await axios.get(
        `/api/v1/users/get-single-user/${params.id}`
      );
      setName(data.user.name);
      setEmail(data.user.email);
      setAddress(data.user.address);

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("name", name);
      userData.append("email", email);
      userData.append("address", address);
      profilePic && userData.append("profilePic", profilePic);
      const { data } = await axios.put(
        `/api/v1/users/update-user/${params.id}`,
        userData
      );
      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container login-container" style={{ marginTop: "1rem" }}>
      <div className="row">
        <div className="col-sm-12 me-auto">
          <div class="card shadow">
            <div className="card-body px-5">
              <h4 className="card-title text-center mt-3 fw-bold"></h4>
              <form>
                <h3 className="text-center">User update</h3>
                <input
                  type="text"
                  className="p-2 mt-4  mb-2 form-control "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="p-2 mt-4  mb-2 form-control "
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  className=" p-2 mb-2 form-control "
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label className="btn btn-outline-secondary col-md-12">
                  {profilePic ? profilePic.name : "Upload Photo"}
                  <input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={(e) => setProfilPic(e.target.files[0])}
                    hidden
                  />
                </label>
                <div className="mb-3">
                  {profilePic ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(profilePic)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/users/get-photo-user/${params.id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-3 d-grid">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={handleUpdate}
                  >
                    Update
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

export default UpdateProfile;
