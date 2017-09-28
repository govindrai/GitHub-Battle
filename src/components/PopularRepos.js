import React from "react";
import PropTypes from "prop-types";
import api from "../utils/api";

function LanguagesNavigation({ selectedLanguage, updateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Python", "Java", "CSS"];
  return (
    <ul className="language">
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
      </div>
    );
  }
}
