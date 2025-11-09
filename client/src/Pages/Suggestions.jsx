import React, { useEffect, useState } from "react";
import "../Style/Suggestions.css";

function Suggestions() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Load current user
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.isLoggedIn) setCurrentUser(userData);
  }, []);

  // Load all users from "signups"
  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("signups")) || [];
    if (currentUser) {
      const filtered = allUsers.filter((u) => u.email !== currentUser.email);
      setUsers(allUsers);
      setFilteredUsers(filtered);
    } else {
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    }
  }, [currentUser]);

  // Search users by name or email
  const handleFindUsers = () => {
    if (!currentUser) return;

    const allUsers = JSON.parse(localStorage.getItem("signups")) || [];
    const results = allUsers.filter(
      (user) =>
        user.email !== currentUser.email &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(results);
  };

  // Back button to reset search
  const handleBack = () => {
    setSearchTerm("");
    const allUsers = JSON.parse(localStorage.getItem("signups")) || [];
    const filtered = currentUser
      ? allUsers.filter((u) => u.email !== currentUser.email)
      : allUsers;
    setFilteredUsers(filtered);
  };

  // Toggle follow/unfollow / follow back
  const handleFollowToggle = (userEmail) => {
    if (!currentUser) return;

    let followingData = JSON.parse(localStorage.getItem("following")) || [];
    let userFollow = followingData.find((f) => f.email === currentUser.email);

    if (!userFollow) {
      userFollow = { email: currentUser.email, followingEmails: [] };
      followingData.push(userFollow);
    }

    if (userFollow.followingEmails.includes(userEmail)) {
      // Unfollow
      userFollow.followingEmails = userFollow.followingEmails.filter(
        (e) => e !== userEmail
      );
    } else {
      // Follow / Follow back
      userFollow.followingEmails.push(userEmail);
    }

    localStorage.setItem("following", JSON.stringify(followingData));
    setFilteredUsers((prev) => [...prev]); // refresh UI
  };

  // Check if a user is following current user
  const isFollower = (userEmail) => {
    if (!currentUser) return false;
    const followingData = JSON.parse(localStorage.getItem("following")) || [];
    // Check if the other user follows current user
    const otherFollowObj = followingData.find((f) => f.email === userEmail);
    return otherFollowObj?.followingEmails.includes(currentUser.email);
  };

  return (
    <div className="suggestions-container">
      <h2>Suggestions</h2>

      {/* Search section */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="find-users-btn" onClick={handleFindUsers}>
          Find Users
        </button>
      </div>

      {/* Back button below search bar */}
      {searchTerm && (
        <div className="back-wrapper">
          <button className="back-btn" onClick={handleBack}>
            ← Back
          </button>
        </div>
      )}

      {/* Users list */}
      <div className="users-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const followingData =
              JSON.parse(localStorage.getItem("following")) || [];
            const userFollow = followingData.find(
              (f) => f.email === currentUser?.email
            );
            const isFollowing = userFollow?.followingEmails.includes(user.email);
            const follower = isFollower(user.email);

            return (
              <div className="user-card" key={user.email}>
                <div className="user-info">
                  <img
                    src={
                      user.image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="User"
                    className="user-avatar"
                  />
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>

                <div className="user-actions">
                  {follower && !isFollowing ? (
                    <button
                      className="follow-btn follow-back"
                      onClick={() => handleFollowToggle(user.email)}
                    >
                      Follow Back
                    </button>
                  ) : (
                    <button
                      className={`follow-btn ${isFollowing ? "unfollow" : ""}`}
                      onClick={() => handleFollowToggle(user.email)}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-results">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Suggestions;
