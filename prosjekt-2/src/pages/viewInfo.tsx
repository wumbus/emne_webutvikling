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
            token: sessionStorage.getItem("token") || "",
            project_id: sessionStorage.getItem("project_id")||0,
            data: " ",
            issues: null,
            members: [1, 2],
            sorting_members: localStorage.getItem("sort") || "" ,
            checkboxes: this.getCheckboxes(localStorage.getItem("checkboxes"))
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.getCheckboxes = this.getCheckboxes.bind(this);

    }

    getCheckboxes(checkbox: any) {
        if (checkbox == null) {
            return [];
        } else {
            let checkbox_list_string = checkbox.split(",");
            let checkbox_list: any = [];
            checkbox_list_string.forEach((element : string) => {
                if (element === "true"){
                    checkbox_list.push(true);
                } else if (element === "false") {
                    checkbox_list.push(false);
                }
            });
            console.log(checkbox_list);
            return checkbox_list;
        }
    }

    selectedSort(value: string) {
        if (this.state.sorting_members == value) {
            return true;
        } else {
            return false;
        }

    }

    handleChange(event: any) {
        console.log("Jeg endres");
        console.log(event.target.value);

        this.setState({
            sorting_members: event.target.value
        });

        localStorage.setItem("sort", event.target.value);
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

        localStorage.setItem("checkboxes", checkboxes);

        console.log(this.state.checkboxes);
    }


    componentDidMount() {
        console.log("Component Did MOunt");
        
        if (sessionStorage.getItem("token") == null) {
            this.setState({
                token: "",
            });
        } else {
            this.setState({
                token: sessionStorage.getItem("token"),
            });
        }

        if (localStorage.getItem("checkboxes") == null) {
            this.setState({
                checkboxes : []
            })
        } else {
            this.setState({
                checkboxes: this.getCheckboxes(localStorage.getItem("checkboxes"))
            })
        }

        console.log(this.state.token);
        this.setState({
            data: getProject(this.state.token,this.state.project_id)
        });

        const requestIssues: any = getProjectIssues(this.state.token, this.state.project_id);
        requestIssues.then((issues: any) => {
            console.log(issues);
            this.setState({
                issues: issues
            });

        }).catch((err: any) => {
            console.log("fakk");
        });

        console.log("Requesting members");
        
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
                                    <option value="number" selected={this.selectedSort("number")}>Role</option>
                                    <option value="name" selected={this.selectedSort("name")}>Name</option>
                                </select>
                            </table>

                            <table>Filter by:
                                <input type="checkbox" name="" id="0" checked={this.state.checkboxes[0]} onChange={this.handleCheckboxChange} />Developer 
                                <input type="checkbox" name="" id="1" checked={this.state.checkboxes[1]} onChange={this.handleCheckboxChange} />Maintainer 
                                <input type="checkbox" name="" id="2" checked={this.state.checkboxes[2]} onChange={this.handleCheckboxChange} />Owner
                                <input type="checkbox" name="" id="3" checked={this.state.checkboxes[3]} onChange={this.handleCheckboxChange} />Bots
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
