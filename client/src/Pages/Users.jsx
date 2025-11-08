import React, { useEffect, useState } from "react";
import "../Style/Profile.css";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchedUser, setSearchedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalList, setModalList] = useState([]);

  // ✅ Load current user and searched user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const searchEmail = location.state?.searchEmail;

    if (storedUser && storedUser.isLoggedIn) {
      setCurrentUser(storedUser);
    } else {
      navigate("/login");
    }

    if (searchEmail) {
      const userFound = allUsers.find((u) => u.email === searchEmail);
      setSearchedUser(userFound);
    }
  }, [location.state, navigate]);

  // ✅ Load follow/following data
  useEffect(() => {
    if (!currentUser || !searchedUser) return;

    const followingData = JSON.parse(localStorage.getItem("following")) || [];
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const viewedFollowingObj = followingData.find(
      (f) => f.email === searchedUser.email
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
        return userFollowing.includes(searchedUser.email);
      })
      .map((u) => u.name);
    setFollowersList(followers);

    const currentFollowObj = followingData.find(
      (f) => f.email === currentUser.email
    );
    setIsFollowing(
      currentFollowObj?.followingEmails.includes(searchedUser.email) || false
    );
  }, [searchedUser, currentUser]);

  // ✅ Follow/unfollow handler
  const handleFollow = () => {
    if (!currentUser || !searchedUser) return;

    let followingData = JSON.parse(localStorage.getItem("following")) || [];
    let userFollow = followingData.find((f) => f.email === currentUser.email);

    if (!userFollow) {
      userFollow = { email: currentUser.email, followingEmails: [] };
      followingData.push(userFollow);
    }

    if (!isFollowing) {
      userFollow.followingEmails.push(searchedUser.email);
      alert(`You are now following ${searchedUser.name}`);
      setFollowersList((prev) => [...prev, currentUser.name]);
    } else {
      userFollow.followingEmails = userFollow.followingEmails.filter(
        (e) => e !== searchedUser.email
      );
      alert(`You unfollowed ${searchedUser.name}`);
      setFollowersList((prev) => prev.filter((f) => f !== currentUser.name));
    }

    setIsFollowing(!isFollowing);
    localStorage.setItem("following", JSON.stringify(followingData));
  };

  // ✅ Back button handler
  const handleBack = () => {
    navigate("/profile", { state: { user: currentUser } });
  };

  // ✅ Modal
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

  if (!searchedUser) {
    return (
      <div className="profile-container">
        <h2>No user found</h2>
        <button onClick={handleBack} className="back-btn">
          🔙 Back to My Profile
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1>👤 User Profile</h1>

        {/* ✅ Back button placed inside container, below header */}
        <div className="back-btn-wrapper">
          <button className="back-btn" onClick={handleBack}>
            ← Back
          </button>
        </div>

        <div className="profile-card">
          <div className="profile-image">
            <img
              src={
                searchedUser.image ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <h2>{searchedUser.name}</h2>
            <p>Email: {searchedUser.email}</p>
            <div className="followers-following">
              <p onClick={() => openModal("followers")}>
                Followers: {followersList.length}
              </p>
              <p onClick={() => openModal("following")}>
                Following: {followingList.length}
              </p>
            </div>

            <div className="profile-actions">
              <button
                className={isFollowing ? "unfollow-btn" : "follow-btn"}
                onClick={handleFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🪟 Modal */}
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

export default Users;
