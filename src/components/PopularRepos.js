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
      <div>
        <LanguagesNavigation
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {this.state.repos && <ReposGrid repos={this.state.repos} />}
        {!this.state.repos && "LOADING"}
      </div>
    );
  }
}

function ReposGrid({ repos }) {
  return (
    <div className="repos-list">
      {repos.map((repo, index) => {
        return (
          <div key={repo.id} className="repo">
            <div className="repo-rank">#{index + 1}</div>
            <img className="repo-image" src={repo.owner.avatar_url} />
            <div className="repo-name">
              <a href={repo.html_url}>{repo.name}</a>
            </div>
            <div className="repo-owner">@{repo.owner.login}</div>
            <div className="repo-stars">{repo.stargazers_count}</div>
          </div>
        );
      })}
    </div>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};
