import React, { useEffect } from "react";
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { getProject } from "../services/api";
import { render } from "react-dom";


class LoginScreen extends React.Component {

  state = {
    token: "",
    project_id:0,
    rememberMe: true
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>{
    const input = event.target;
    const value = input.value;

    this.setState({[input.name]: value});
  };

  handleFormSubmit = () => {
      const {token, project_id} = this.state;
      localStorage.setItem('token', token);
      localStorage.setItem('project_id', project_id.toString());
      getProject(token, project_id.toString()).then( message => {
        // if (message == 200) {

        // }
      })
 


  };

  componentDidMount(){
      const token = localStorage.getItem('token');
      this.setState({token});
  }
  

  render()  {
    return (
        <form onSubmit={this.handleFormSubmit}>
            <label>
                Project ID: <input name="project_id" value ={this.state.project_id} onChange={this.handleChange}></input>
            </label>
            <br/>
            <label>
                Access Token: <input name = "token" value={this.state.token} onChange={this.handleChange}/>
            </label>
            <br/>
            <button type = "submit">Submit</button>
        </form>
    );

};
};

export default LoginScreen;