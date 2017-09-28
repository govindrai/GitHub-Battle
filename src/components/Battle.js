import React from "react";
import PropTypes from "prop-types";

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneUsername: "",
      playerTwoUsername: "",
      playerOneImage: null,
      playerTwoImage: null
    };
  }

  submitBattleForm = (id, username) => {
    return this.setState({
      ["player" + id + "Username"]: username,
      ["player" + id + "Image"]:
        "https://github.com/" + username + ".png?size=200"
    });
  };

  render() {
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
            />
          )}
          {playerTwoUsername && (
            <BattleProfile
              username={playerTwoUsername}
              image={playerTwoImage}
            />
          )}
          {!playerOneUsername && (
            <BattleForm id="One" submitBattleForm={this.submitBattleForm} />
          )}
          {!playerTwoUsername && (
            <BattleForm id="Two" submitBattleForm={this.submitBattleForm} />
          )}
        </div>
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
      <div>
        <h1>Player {this.props.id}</h1>
        <form
          onSubmit={this.props.submitBattleForm.bind(
            null,
            this.props.id,
            this.state.username
          )}
        >
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
      </div>
    );
  }
}

function BattleProfile({ image, username }) {
  return (
    <div>
      <img src={image} />
      <div>{username}</div>
    </div>
  );
}

BattleForm.PropTypes = {
  id: PropTypes.string.isRequired,
  submitBattleForm: PropTypes.func.isRequired
};

BattleProfile.PropTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
