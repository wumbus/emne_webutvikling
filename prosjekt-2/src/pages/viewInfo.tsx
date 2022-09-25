import React from "react";
import { getProject, getProjectIssues, getMembers } from "../services/api";
// import { ProjectType, IssuesType, MembersType } from "../services/api";
import './css/viewInfo.css';

class ViewInfo extends React.Component {
  state = {
    token: localStorage.getItem("token") || "",
    data: " ",
    issues: null,
    members: null
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

    const requestIssues: any = getProjectIssues(this.state.token);
    requestIssues.then((issues:any) => {
        console.log(issues);
        this.setState({
            issues: issues
        });

    }).catch((err:any) => {
        console.log("fakk");
    });
    
    const requestMembers: any = getMembers(this.state.token);
    requestMembers.then((members:any) => {
        console.log(members);
        this.setState({
            members: members
        });

    }).catch((err:any) => {
        console.log("fakk");
    });
  }

  render() {
    return (
      <div>
        <h1>Hi</h1>
        <p>{this.state.token}</p>
        <div className="row">
            <div className="column members">
                <p>Her kommer liste over members</p>
            </div>
            <div className="column commits">
                <p> Her kommer en graf</p>
            </div>
            {/* <p>{this.state.issues}</p> */}
            {/* <p>{getProject(this.state.token)}</p> */}
        </div>
      </div>
    );
  }
}

export default ViewInfo;
