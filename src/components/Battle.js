import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class Battle extends React.Component {
  state = {
    playerOneUsername: "",
    playerTwoUsername: "",
    playerOneImage: null,
    playerTwoImage: null
  };

  submitBattleForm = (id, username) => {
    return this.setState({
      ["player" + id + "Username"]: username,
      ["player" + id + "Image"]:
        "https://github.com/" + username + ".png?size=200"
    });
  };

  resetBattleForm = id => {
    this.setState({
      ["player" + id + "Username"]: "",
      ["player" + id + "Image"]: null
    });
  };

  render() {
    const { url } = this.props.match;
    const {
      playerOneUsername,
      playerTwoUsername,
      playerOneImage,
      playerTwoImage
    } = this.state;
    return (
      <div>
        <div className="row">
          {playerOneUsername && (
            <BattleProfile
              username={playerOneUsername}
              image={playerOneImage}
              id="One"
              resetBattleForm={this.resetBattleForm}
            />
          )}
          {!playerOneUsername && (
            <BattleForm id="One" submitBattleForm={this.submitBattleForm} />
          )}
          {playerTwoUsername && (
            <BattleProfile
              id="Two"
              username={playerTwoUsername}
              image={playerTwoImage}
              resetBattleForm={this.resetBattleForm}
            />
          )}
          {!playerTwoUsername && (
            <BattleForm id="Two" submitBattleForm={this.submitBattleForm} />
          )}
        </div>
        {playerOneUsername &&
        playerTwoUsername && (
          <Link
            to={{
              pathname: url + "/results",
              search: `?playerOneUsername=${playerOneUsername}&playerTwoUsername=${playerTwoUsername}`
            }}
          >
            <button>Battle</button>
          </Link>
        )}
      </div>
    );
  }
}

class BattleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  handleFormFieldChange = e => {
    this.setState({ username: e.target.value });
  };

  render() {
    return (
      <form
        className="column"
        onSubmit={this.props.submitBattleForm.bind(
          null,
          this.props.id,
          this.state.username
        )}
      >
        <h1>Player {this.props.id}</h1>
        <input
          type="text"
          placeholder="GitHub username"
          onChange={this.handleFormFieldChange}
          value={this.state.username}
        />
        <button type="submit" disabled={!this.state.username}>
          Submit
        </button>
      </form>
    );
  }
}

function BattleProfile({ image, username, id, resetBattleForm }) {
  return (
    <div>
      <div className="column">
        <img className="profile-image" src={image} />
        <div className="username">@{username}</div>
      </div>
      <a className="reset" onClick={resetBattleForm.bind(null, id)}>
        Reset
      </a>
    </div>
  );
}

BattleForm.PropTypes = {
  id: PropTypes.string.isRequired,
  submitBattleForm: PropTypes.func.isRequired
};

BattleProfile.PropTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  resetBattleForm: PropTypes.func.isRequired
};
