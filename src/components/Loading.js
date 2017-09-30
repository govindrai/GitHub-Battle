import React from "react";
import { string, number } from "prop-types";

const style = {
  fontSize: "48px",
  textAlign: "center",
  fontWeight: "bold"
};

export default class Loading extends React.Component {
  state = { text: this.props.text };

  static propTypes = {
    text: string.isRequired,
    speed: number.isRequired
  };

  static defaultProps = {
    text: "Loading",
    speed: 300
  };

  componentDidMount() {
    const stopper = this.props.text + "...";

    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        return this.setState({ text: this.props.text });
      } else {
        return this.setState(prevState => ({ text: prevState.text + "." }));
      }
    }, this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return <div style={style}>{this.state.text}</div>;
  }
}
