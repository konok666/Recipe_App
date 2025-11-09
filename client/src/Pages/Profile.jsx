import React, { useEffect, useState } from "react";
import "../Style/Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalList, setModalList] = useState([]);

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isLoggedIn) {
      setCurrentUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Load followers and following
  useEffect(() => {
    if (!currentUser) return;

    const allUsers = JSON.parse(localStorage.getItem("signups")) || [];
    const followingData = JSON.parse(localStorage.getItem("following")) || [];

    // Following list
    const userFollowObj = followingData.find(
      (f) => f.email === currentUser.email
    );
    const followingEmails = userFollowObj?.followingEmails || [];
    setFollowingList(
      followingEmails.map((email) => {
        const u = allUsers.find((user) => user.email === email);
        return u ? u.name : email;
      })
    );

    // Followers list
    const followers = allUsers
      .filter((u) => {
        const uFollowObj = followingData.find((f) => f.email === u.email);
        const uFollowing = uFollowObj?.followingEmails || [];
        return uFollowing.includes(currentUser.email);
      })
      .map((u) => u.name);
    setFollowersList(followers);
  }, [currentUser]);

  // Open modal for followers or following
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

  if (!currentUser) {
    return (
      <div className="profile-container">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  // Function to toggle follow/unfollow
  const handleToggleFollow = (name) => {
    const allUsers = JSON.parse(localStorage.getItem("signups")) || [];
    const followingData = JSON.parse(localStorage.getItem("following")) || [];
    const userFollowObj =
      followingData.find((f) => f.email === currentUser.email) || {
        email: currentUser.email,
        followingEmails: [],
      };

    const userObj = allUsers.find((u) => u.name === name);
    if (!userObj) return;
    const email = userObj.email;

    const isFollowing = userFollowObj.followingEmails.includes(email);

    if (isFollowing) {
      // Unfollow
      userFollowObj.followingEmails = userFollowObj.followingEmails.filter(
        (e) => e !== email
      );
      setFollowingList((prev) => prev.filter((n) => n !== name));
      if (modalTitle === "Following") {
        setModalList((prev) => prev.filter((n) => n !== name));
      }
    } else {
      // Follow / Follow back
      userFollowObj.followingEmails.push(email);
      setFollowingList((prev) => [...prev, name]);
      if (modalTitle === "Following") {
        setModalList((prev) => [...prev, name]);
      }
    }

    // Save back to localStorage
    const otherUsers = followingData.filter((f) => f.email !== currentUser.email);
    localStorage.setItem(
      "following",
      JSON.stringify([...otherUsers, userFollowObj])
    );

    // Update followers list too
    const updatedFollowers = allUsers
      .filter((u) => {
        const uFollowObj = JSON.parse(localStorage.getItem("following"))?.find(
          (f) => f.email === u.email
        );
        const uFollowing = uFollowObj?.followingEmails || [];
        return uFollowing.includes(currentUser.email);
      })
      .map((u) => u.name);
    setFollowersList(updatedFollowers);
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1>👤 My Profile</h1>
        <div className="profile-card">
          <div className="profile-image">
            <img
              src={
                currentUser.image ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <h2>{currentUser.name || "Unknown User"}</h2>
            <p>Email: {currentUser.email || "No email available"}</p>

            <div className="followers-following">
              <p onClick={() => openModal("followers")}>
                Followers: {followersList.length}
              </p>
              <p onClick={() => openModal("following")}>
                Following: {followingList.length}
              </p>
            </div>
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
                  <li key={idx}>
                    {name}
                    <button
                      className={`follow-btn ${
                        followingList.includes(name) ? "unfollow" : "follow-back"
                      }`}
                      onClick={() => handleToggleFollow(name)}
                      style={{ marginLeft: "10px" }}
                    >
                      {followingList.includes(name) ? "Unfollow" : "Follow Back"}
                    </button>
                  </li>
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
