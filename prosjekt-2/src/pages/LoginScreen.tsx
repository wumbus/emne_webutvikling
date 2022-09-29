import React, { useEffect } from "react";
import { getProject } from "../services/api";
import { render } from "react-dom";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewInfo from "./viewInfo";
import { Redirect } from "../components/Redirect";


class LoginScreen extends React.Component<
  {},
  { token: any; project_id: any; rememberMe: any; connection_established: any}
> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: "",
      project_id: 0,
      rememberMe: true,
      connection_established: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;

    if (input.name === "project_id") {
      this.setState({ project_id: input.value });
    } else if (input.name === "token") {
      this.setState({ token: input.value });
    }
  }

  handleFormSubmit(event: any) {
    event.preventDefault();
    const { token, project_id } = this.state;
    localStorage.setItem("token", token);
    localStorage.setItem("project_id", project_id.toString());

    getProject(token, project_id.toString()).then(() => {
      if (localStorage.getItem("connection_established") == "true") { // Redirect
        Redirect(true)
        
      } else { // Don't redirect
        Redirect(false)
        
      }
    });
    this.setState({connection_established: localStorage.getItem("connection_established")})
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const project_id = localStorage.getItem("project_id");
    this.setState({ token, project_id });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>
          Project ID:{" "}
          <input
            name="project_id"
            value={this.state.project_id}
            onChange={this.handleChange}
          ></input>
        </label>
        <br />
        <label>
          Access Token:{" "}
          <input
            name="token"
            value={this.state.token}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <Link type="submit" to="/viewInfo">Submit</Link>
      </form>
    );
  }
}

export default LoginScreen;
