import React from "react";
import { ListFormat } from "typescript";
import { MembersList, MemberItem } from "../components/User"
import { getProject, getProjectIssues, getMembers } from "../services/api";
// import { ProjectType, IssuesType, MembersType } from "../services/api";
import './css/viewInfo.css';


class ViewInfo extends React.Component<{}, { token: any, project_id:any, data: any, issues: any, members: any, sorting_members: string, checkboxes: any }> {
    constructor(props: any) {
        super(props);

        this.state = {
            token: localStorage.getItem("token") || "",
            project_id: localStorage.getItem("project_id")||0,
            data: " ",
            issues: null,
            members: [1, 2],
            sorting_members: " ",
            checkboxes: [false, false, false, false]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

    }



    handleChange(event: any) {
        console.log("Jeg endres");
        console.log(event.target.value);

        this.setState({
            sorting_members: event.target.value
        });
        console.log(this.state.sorting_members);
        // window.location.reload();
    }

    handleCheckboxChange(event: any) {
        console.log(event.target.checked);
        console.log(event.target.id);
        const id = parseInt(event.target.id);

        let checkboxes = this.state.checkboxes;
        checkboxes[id] = event.target.checked;

        this.setState({
            checkboxes
        });

        console.log(this.state.checkboxes);
    }


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
            data: getProject(this.state.token,this.state.project_id)
        });

        console.log(this.state.data);


        const data: any = getProject(this.state.token,this.state.project_id);

        const requestIssues: any = getProjectIssues(this.state.token, this.state.project_id);
        requestIssues.then((issues: any) => {
            console.log(issues);
            this.setState({
                issues: issues
            });

        }).catch((err: any) => {
            console.log("fakk");
        });

        const requestMembers: any = getMembers(this.state.token,this.state.project_id);
        requestMembers.then((members: any) => {
            console.log(members);
            this.setState({
                members: members
            });

        }).catch((err: any) => {
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
                        <p className = "memberliste">Liste over members</p>
                        <form>
                            <table>Sort by:
                                <select name={this.state.sorting_members} onChange={this.handleChange}>
                                    <option value="number">Role</option>
                                    <option value="name">Name</option>
                                </select>
                            </table>

                            <table>Filter by:
                                <input type="checkbox" name="" id="0" onChange={this.handleCheckboxChange} />Developer 
                                <input type="checkbox" name="" id="1" onChange={this.handleCheckboxChange} />Maintainer 
                                <input type="checkbox" name="" id="2" onChange={this.handleCheckboxChange} />Owner
                                <input type="checkbox" name="" id="3" onChange={this.handleCheckboxChange} />Bots
                            </table>
                        </form>
                        <MembersList members={this.state.members} sort={this.state.sorting_members} filterBy={this.state.checkboxes} />
                        
                    </div>
                    <div className="column commits">
                    <p className="graph"> Her kommer en graf</p> 
                    <table> graf</table>
                    </div>
                </div>
            </div>

            
        );
    }
}

export default ViewInfo;
