import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './profile.css'; // Assuming you have your CSS in this file

const Profile = () => {
  // State variables to store form inputs
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Load stored user data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setFname(storedData.firstName || "");
      setLname(storedData.lastName || "");
      setEmail(storedData.email || "");
      setPhoneCode(storedData.phoneCode || "");
      setPhoneNumber(storedData.phoneNumber || "");
    }
  }, []);

  // Handle profile update (save changes)
  const handleProfileUpdate = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !fname || !lname || !phoneCode || !phoneNumber) {
      toast.error("Please fill in all fields!", {
        position: "top-center",
      });
      return;
    }

    // Save updated user data to localStorage
    const updatedUserData = {
      firstName: fname,
      lastName: lname,
      email,
      phoneCode,
      phoneNumber,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    toast.success("Profile updated successfully!", {
      position: "top-center",
    });
  };

  return (
    <div className="formcontainer">
      <form onSubmit={handleProfileUpdate}>
        <h1 className="profile-heading">PROFILE</h1>

        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone Code</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone code"
            value={phoneCode}
            onChange={(e) => setPhoneCode(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Save Profile
          </button>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
};

export default Profile;
