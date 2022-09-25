import React from "react";
import { getProject, getProjectIssues } from "../services/api";
import { ProjectType, IssuesType } from "../services/api";

class ViewInfo extends React.Component {
  state = {
    token: localStorage.getItem("token") || "",
    data: " ",
    issues: []
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
    this.setState({
        data: getProject(this.state.token)
    });

    console.log(this.state.data);
    

    const data: any = getProject(this.state.token);
    console.log(data);
    console.log(data.name);
    console.log(data.build_timeout);

    const requestIssues: any = getProjectIssues(this.state.token);
    
    requestIssues.then((issues:any) => {
        console.log(issues);
        this.setState({
            issues: issues
        });

    }).catch((err:any) => {
        console.log("fakk");
        
    });
    
    // console.log(issues);
    // console.log(issues[0][1]);
  }

  render() {
    return (
      <div>
        <h1>Hi</h1>
        <p>{this.state.token}</p>
        <div>
            <p>Her kommer data:</p>
            <p>{this.state.issues}</p>
            {/* <p>{getProject(this.state.token)}</p> */}
        </div>
      </div>
    );
  }
}

export default ViewInfo;
