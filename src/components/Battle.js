import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BattleProfile from "./BattleProfile";

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
            <BattleProfile username={playerOneUsername} image={playerOneImage}>
              <a
                className="reset"
                onClick={this.resetBattleForm.bind(null, "One")}
              >
                Reset
              </a>
            </BattleProfile>
          )}
          {!playerOneUsername && (
            <BattleForm id="One" submitBattleForm={this.submitBattleForm} />
          )}
          {playerTwoUsername && (
            <BattleProfile username={playerTwoUsername} image={playerTwoImage}>
              <a
                className="reset"
                onClick={this.resetBattleForm.bind(null, "Two")}
              >
                Reset
              </a>
            </BattleProfile>
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
  state = { username: "" };

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

BattleForm.PropTypes = {
  id: PropTypes.string.isRequired,
  submitBattleForm: PropTypes.func.isRequired
};
