import React from "react";
import PropTypes from "prop-types";

export default function BattleProfile({ image, username, children }) {
  return (
    <div>
      <div className="column">
        <img className="profile-image" src={image} />
        <div className="username">@{username}</div>
      </div>
      {children}
    </div>
  );
}

BattleProfile.PropTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
