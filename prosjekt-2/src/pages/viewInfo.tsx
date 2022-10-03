import React from "react";
import { ListFormat } from "typescript";
import { CommitsView } from "../components/commits";
import { MembersList } from "../components/User"
import { getProject, getProjectIssues, getMembers, getCommits, getCommitsByAllBranches, getNumberOfCommitsByAllBranches, getBranches } from "../services/api";
// import { ProjectType, IssuesType, MembersType } from "../services/api";
import './css/viewInfo.css';


class ViewInfo extends React.Component<{}, { token: any, data: any, issues: any, members: string[][], sorting_members: string, checkboxes: any, commits: any, commitsByBranch: any, xaxis: any }> {
    constructor(props: any) {
        super(props);

        this.state = {
            token: localStorage.getItem("token") || "",
            data: " ",
            issues: null,
            members: [],
            sorting_members: " ",
            checkboxes: [false, false, false, false],
            commits: [],
            commitsByBranch: [],
            xaxis: "person"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeGraph = this.handleChangeGraph.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }



    handleChange(event: any) {
        this.setState({
            sorting_members: event.target.value
        });
    }

    handleChangeGraph(event: any) {
        this.setState({
            xaxis: event.target.value
        });
    }

    handleCheckboxChange(event: any) {
        const id = parseInt(event.target.id);

        let checkboxes = this.state.checkboxes;
        checkboxes[id] = event.target.checked;

        this.setState({
            checkboxes
        });
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
        // console.log(this.state.token);
        this.setState({
            data: getProject(this.state.token)
        });

        // console.log(this.state.data);


        const data: any = getProject(this.state.token);

        // const requestIssues: any = getProjectIssues(this.state.token);
        // requestIssues.then((issues: any) => {
        //     // console.log(issues);
        //     this.setState({
        //         issues: issues
        //     });

        // }).catch((err: any) => {
        //     console.log("fakk issues");
        // });

        const requestMembers: any = getMembers(this.state.token);
        console.log(requestMembers);
        
        requestMembers.then((members: string[][]) => {
            this.setState({
                members: members
            });
            console.log(members);
            

        }).catch((err: any) => {
            console.log("Failed Request (getMembers)");
        });

        const requestCommits: any = getCommits(this.state.token);
        requestCommits.then((commits: any) => {
            this.setState({
                commits: commits
            });
        }).catch((err: any) => {
            console.log("Failed Request (getCommits)");
        });

        const requestCommitsByAllBranches: any = getCommitsByAllBranches(this.state.token);
        requestCommitsByAllBranches.then((commitsByBranch: any) => {
            console.log(commitsByBranch);
            this.setState({
                commitsByBranch: commitsByBranch
            });
        }).catch((err: any) => {
            console.log("Failed Request (getCommitsByAllBranches)");
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
                        <MembersList members={this.state.members} sort={this.state.sorting_members} filterBy={this.state.checkboxes} />
                        <form>
                            <label>Sort by:
                                <select name={this.state.sorting_members} onChange={this.handleChange}>
                                    <option value="number">Role</option>
                                    <option value="name">Name</option>
                                </select>
                            </label>

                            <label>Filter by:
                                Developer<input type="checkbox" name="sjdkfjsd" id="0" onChange={this.handleCheckboxChange} />
                                Maintainer<input type="checkbox" name="" id="1" onChange={this.handleCheckboxChange} />
                                Owner<input type="checkbox" name="" id="2" onChange={this.handleCheckboxChange} />
                                Bots<input type="checkbox" name="" id="3" onChange={this.handleCheckboxChange} />
                            </label>
                        </form>
                    </div>
                    <div className="column commits">
                        <label>Show graph:
                            <select name={this.state.xaxis} onChange={this.handleChangeGraph}>
                                <option value="person">Commits per person</option>
                                <option value="branch">Commits per branch</option>
                            </select>
                        </label>
                        <CommitsView commits={this.state.commits} commitsByBranch={this.state.commitsByBranch} xaxis={this.state.xaxis} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewInfo;
