import React, { useEffect, useState } from "react";
import "../Style/Profile.css";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalList, setModalList] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const viewedUser = location.state?.user || user;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isLoggedIn) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const followingData = JSON.parse(localStorage.getItem("following")) || [];
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const viewedFollowingObj = followingData.find(
      (f) => f.email === viewedUser.email
    );
    const viewedFollowing = viewedFollowingObj?.followingEmails || [];
    setFollowingList(
      viewedFollowing.map((email) => {
        const u = allUsers.find((user) => user.email === email);
        return u ? u.name : email;
      })
    );

    const followers = allUsers
      .filter((u) => {
        const userFollowObj = followingData.find((f) => f.email === u.email);
        const userFollowing = userFollowObj?.followingEmails || [];
        return userFollowing.includes(viewedUser.email);
      })
      .map((u) => u.name);
    setFollowersList(followers);
  }, [viewedUser]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);

    let followingData = JSON.parse(localStorage.getItem("following")) || [];
    let userFollow = followingData.find((f) => f.email === currentUser.email);
    if (!userFollow) {
      userFollow = { email: currentUser.email, followingEmails: [] };
      followingData.push(userFollow);
    }

    if (!isFollowing) {
      userFollow.followingEmails.push(viewedUser.email);
      alert(`You are now following ${viewedUser.name}`);
      setFollowersList((prev) => [...prev, currentUser.name]);
    } else {
      userFollow.followingEmails = userFollow.followingEmails.filter(
        (e) => e !== viewedUser.email
      );
      alert(`You unfollowed ${viewedUser.name}`);
      setFollowersList((prev) => prev.filter((f) => f !== currentUser.name));
    }

    localStorage.setItem("following", JSON.stringify(followingData));
  };

  const openModal = (type) => {
    if (type === "followers") {
      setModalTitle("Followers");
      setModalList(followersList);
    } else {
      setModalTitle("Following");
      setModalList(followingList);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalList([]);
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1>👤 My Profile</h1>

        <div className="profile-card">
          <div className="profile-image">
            <img
              src={
                viewedUser.image ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
            />
          </div>

          <div className="profile-info">
            <h2>{viewedUser.name || "Unknown User"}</h2>
            <p>Email: {viewedUser.email || "No email available"}</p>

            <div className="followers-following">
              <p onClick={() => openModal("followers")}>
                Followers: {followersList.length}
              </p>
              <p onClick={() => openModal("following")}>
                Following: {followingList.length}
              </p>
            </div>

            {currentUser?.email !== viewedUser.email && (
              <button
                className={isFollowing ? "unfollow-btn" : "follow-btn"}
                onClick={handleFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalTitle}</h3>
            {modalList.length > 0 ? (
              <ul>
                {modalList.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            ) : (
              <p>No users</p>
            )}
            <button onClick={closeModal} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
