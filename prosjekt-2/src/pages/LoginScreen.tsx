import React, { useEffect } from "react";
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { getProject } from "../services/api";
import { render } from "react-dom";


class LoginScreen extends React.Component {

  state = {
    token: "",
    rememberMe: false
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>{
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    this.setState({[input.name]: value});
  };

  handleFormSubmit = () => {
      const {token, rememberMe} = this.state;
      localStorage.setItem('rememberMe', rememberMe.toString());
      localStorage.setItem('token', rememberMe ? token : '');
      getProject(token);
  };

  componentDidMount(){
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      const token = rememberMe ? localStorage.getItem('token') : '';
      this.setState({token, rememberMe});
  }
  

  render()  {
    return (
        <form onSubmit={this.handleFormSubmit}>
            <label>
                Access Token: <input name = "token" value={this.state.token} onChange={this.handleChange}/>
            </label>
            <br/>
            <label>
                <input name= "rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox"/> Remember Me
            </label>
            <button type = "submit">Submit</button>
        </form>
    );

};
};

export default LoginScreen;