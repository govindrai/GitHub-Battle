import React from "react";
import PropTypes from "prop-types";

function BattleProfile({ image, username }) {
  return (
    <div>
      <div className="column">
        <img className="profile-image" src={image} />
        <div className="username">@{username}</div>
      </div>
      {props.children}
    </div>
  );
}

BattleProfile.PropTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
