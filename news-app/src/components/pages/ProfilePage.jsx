import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const ProfilePage = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setaddress] = useState("");
  const getSingleUser = async (e) => {
    try {
      const { data } = await axios.get(
        `/api/v1/users/get-single-user/${params.id}`
      );
      setName(data.user.name);
      setEmail(data.user.email);
      setaddress(data.user.address);
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

  return (
    <div className="container">
      <form className="profile-form rounded">
        <div className="profilePic p-2 d-flex align-items-center justify-content-center">
          <Link
            to={`/update-profile/${params.id}`}
            className="p-2 btn btn-primary"
          >
            Edit
          </Link>
          <img
            src={`/api/v1/users/get-photo-user/${params.id}`}
            alt="profilePic"
          />
        </div>
        <div className="p-5">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputText1"
              value={name}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              className="form-control"
              id="exampleInputText1"
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
