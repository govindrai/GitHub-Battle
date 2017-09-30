import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import api from "../utils/api";
import { Link } from "react-router-dom";
import BattleProfile from "./BattleProfile";

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    var players = queryString.parse(this.props.location.search);

    api.battle([players.playerOneUsername, players.playerTwoUsername]).then(
      function(players) {
        if (players === null) {
          return this.setState({
            error:
              "Looks like there was an error. Check that both users exist on Github.",
            loading: false
          });
        }

        this.setState({
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false
        });
      }.bind(this)
    );
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if (loading === true) {
      return <p>Loading!</p>;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    return (
      <div className="row">
        <Player label="Winner" score={winner.score} profile={winner.profile} />
        <Player label="Loser" score={loser.score} profile={loser.profile} />
      </div>
    );
  }
}

function Player({ label, score, profile }) {
  return (
    <div>
      <h1 className="header">{label}</h1>
      <h3 style={{ textAlign: "center" }}>Score: {score}</h3>
      <BattleProfile username={profile.login} image={profile.avatar_url}>
        <ul className="space-list-items">
          {profile.name && <li>{profile.name}</li>}
          {profile.location && <li>{profile.location}</li>}
          {profile.company && <li>{profile.company}</li>}
          <li>Followers: {profile.followers}</li>
          <li>Following: {profile.following}</li>
          <li>Public Repos: {profile.public_repos}</li>
          {profile.blog && (
            <li>
              <a href={profile.blog}>{profile.blog}</a>
            </li>
          )}
        </ul>
      </BattleProfile>
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};
