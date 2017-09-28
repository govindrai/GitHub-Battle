import React from "react";

export default class PopularRepos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All"
    };
  }

  updateLanguage = selectedLanguage => {
    this.setState({ selectedLanguage });
  };

  render() {
    const languages = ["All", "JavaScript", "Ruby", "Python", "Java", "CSS"];
    return (
      <div className="container">
        Selected Language: {this.state.selectedLanguage}
        <ul className="language">
          {languages.map(language => (
            <li
              key={language}
              onClick={this.updateLanguage.bind(null, language)}
            >
              {language}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
