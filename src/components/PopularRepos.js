import React from "react";
import PropTypes from "prop-types";
import api from "../utils/api";

function LanguagesNavigation({ selectedLanguage, updateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Python", "Java", "CSS"];
  return (
    <ul className="languages">
      {languages.map(language => (
        <li
          style={language === selectedLanguage ? { color: "red" } : null}
          key={language}
          onClick={updateLanguage.bind(null, language)}
        >
          {language}
        </li>
      ))}
    </ul>
  );
}

LanguagesNavigation.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
};

export default class PopularRepos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null
    };
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = selectedLanguage => {
    this.setState({ selectedLanguage, repos: null });

    api
      .fetchPopularRepos(this.state.language)
      .then(repos => this.setState({ repos }));
  };

  render() {
    return (
      <div className="container">
        <LanguagesNavigation
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        <ReposGrid repos={this.state.repos} />
      </div>
    );
  }
}

function ReposGrid({ repos }) {
  if (repos) {
    return (
      <div className="repos-list">
        {repos.map(repo => {
          return (
            <div key={repo.id} className="repo">
              <img className="repo-image" src={repo.owner.avatar_url} />
              <div className="repo-name">{repo.name}</div>
              <div className="repo-stars">{repo.stargazers_count}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return "LOADING";
  }
}
