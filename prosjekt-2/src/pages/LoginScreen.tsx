import React, { useEffect } from "react";
import { getProject } from "../services/api";
import { render } from "react-dom";


class LoginScreen extends React.Component <{}, {token: any, project_id: any, rememberMe: any}> {
  constructor(props:any) {
    super(props)
    this.state = {
      token: "",
      project_id: 0,
      rememberMe: true
    }

    this.handleChange=this.handleChange.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);

  }


  handleChange(event: React.ChangeEvent<HTMLInputElement>){
    const input = event.target;

    //this.setState({[input.name]:input.value});

    if (input.name === "project_id") {
      this.setState({project_id: input.value});
    } else if (input.name === "token") {
      this.setState({token: input.value});
    }
  };

  handleFormSubmit() {
      console.log("Handle form submit 1")
      const {token, project_id} = this.state;
      localStorage.setItem('token', token);
      localStorage.setItem('project_id', project_id.toString());
      console.log("Handle form submit")
      getProject(token, project_id.toString()).then( message => {
        console.log(message)
        // if (message == true) {

        // }
      })
      // try {
      //   let redirect : any = getProject(token, project_id.toString())
      //   console.log("Redirect: ", redirect)
      //   if (redirect) {

      //   }
        
      // } catch (error) {
      //   console.log("Error (:")
      // }

  };

  componentDidMount(){
      const token = localStorage.getItem('token');
      const project_id = localStorage.getItem('project_id')
      this.setState({token, project_id});
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