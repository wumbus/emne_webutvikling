import React from "react";
import { getProject } from "../services/api";

class ViewInfo extends React.Component {
  state = {
    token: localStorage.getItem("token") || "",
  };

  componentDidMount() {
    if (localStorage.getItem("token") == null) {
      this.setState({
        token: "ops",
      });
    } else {
      this.setState({
        token: localStorage.getItem("token"),
      });
    }
    console.log(this.state.token);
    getProject(this.state.token);
  }

  render() {
    return (
      <div>
        <h1>Hi</h1>
        <p>{this.state.token}</p>
      </div>
    );
  }
}

export default ViewInfo;
