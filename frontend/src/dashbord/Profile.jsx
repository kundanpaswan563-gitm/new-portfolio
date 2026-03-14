import React, { useState } from "react";
import "./Profile.css";
import axios from "axios";
import API from "../components/Api";

const Profile = () => {

  const [name,setName] = useState("");
  const [heroTitle,setHeroTitle] = useState("");
  const [heroLine1,setHeroLine1] = useState("");
  const [heroLine2,setHeroLine2] = useState("");
  const [description,setDescription] = useState("");
  const [profileImage,setProfileImage] = useState(null);

  const updateProfile = async () => {

    const formData = new FormData();

    formData.append("name",name);
    formData.append("heroTitle",heroTitle);
    formData.append("heroLine1",heroLine1);
    formData.append("heroLine2",heroLine2);
    formData.append("description",description);

    if(profileImage){
      formData.append("profileImage",profileImage);
    }

    await axios.put(
      `${API}/update-profile`,
      formData
    );

    alert("Profile Updated");

  };

  return (

    <div className="profile-form">

      <input
        type="text"
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Hero Title"
        onChange={(e)=>setHeroTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Hero Line 1"
        onChange={(e)=>setHeroLine1(e.target.value)}
      />

      <input
        type="text"
        placeholder="Hero Line 2"
        onChange={(e)=>setHeroLine2(e.target.value)}
      />

      <textarea
        placeholder="Description"
        onChange={(e)=>setDescription(e.target.value)}
      />

      <input
        type="file"
        onChange={(e)=>setProfileImage(e.target.files[0])}
      />

      <button onClick={updateProfile}>
        Update Profile
      </button>

    </div>

  );
};

export default Profile;