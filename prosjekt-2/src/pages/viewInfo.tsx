import React from "react";
import { ListFormat } from "typescript";
import { CommitsView } from "../components/commits";
import { MembersList } from "../components/User"
import { getProject, getProjectIssues, getMembers, getCommits, getCommitsByAllBranches, getNumberOfCommitsByAllBranches, getBranches } from "../services/api";
import styles from './css/viewInfo.module.css';



class ViewInfo extends React.Component<{}, { token: any, project_id:any, data: any, issues: any, members: string[][], sorting_members: string, checkboxes: any, commits: any, commitsByBranch: any, xaxis: any }> {
    constructor(props: any) {
        super(props);

        this.state = {
            token: localStorage.getItem("token") || "",
            project_id: localStorage.getItem("project_id")||0,
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
        //console.log(this.state.token);
        this.setState({
            data: getProject(this.state.token,this.state.project_id)
        });

        //console.log(this.state.data);

        const data: any = getProject(this.state.token,this.state.project_id); // <-- blir ikke brukt ?

        /* const requestIssues: any = getProjectIssues(this.state.token, this.state.project_id);
        requestIssues.then((issues: any) => {
            console.log(issues);
            this.setState({
                issues: issues
            });

        }).catch((err: any) => {
            console.log("fakk issues");
        });
        */

       const requestMembers: any = getMembers(this.state.token,this.state.project_id);
        console.log(requestMembers);
        
        requestMembers.then((members: string[][]) => {
            this.setState({
                members: members
            });
            console.log(members);
            

        }).catch((err: any) => {
            console.log("Failed Request (getMembers)");
        });

        const requestCommits: any = getCommits(this.state.token,this.state.project_id);
        requestCommits.then((commits: any) => {
            this.setState({
                commits: commits
            });
        }).catch((err: any) => {
            console.log("Failed Request (getCommits)");
        });

        const requestCommitsByAllBranches: any = getCommitsByAllBranches(this.state.token,this.state.project_id);
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
            <main> 
                <div className={styles.viewInfo}>

                    <div className={styles.info1}>
                        <h1>Welcome to Project</h1>
                        <h3>{this.state.project_id}</h3>
                    </div>

                    <div className={styles.info2}>
                        <div className={styles.columnMembers}>
                            <p className={styles.memberliste}>Project Members</p>
                            <form className={styles.form}>
                                <table>Sort by: &nbsp;
                                    <select name={this.state.sorting_members} onChange={this.handleChange}>
                                        <option value="number">Role</option>
                                        <option value="name">Name</option>
                                    </select>
                                </table>

                                <table>Filter by: &nbsp;
                                    <input type="checkbox" name="" id="0" onChange={this.handleCheckboxChange} />Developer 
                                    <input type="checkbox" name="" id="1" onChange={this.handleCheckboxChange} />Maintainer 
                                    <input type="checkbox" name="" id="2" onChange={this.handleCheckboxChange} />Owner
                                    <input type="checkbox" name="" id="3" onChange={this.handleCheckboxChange} />Bots
                                </table>
                            </form>
                            <MembersList members={this.state.members} sort={this.state.sorting_members} filterBy={this.state.checkboxes} /> 
                        </div>
                    </div>

                    <div className={styles.info3}>
                        <div className={styles.columnCommits}>
                            <p className={styles.graph}> Project Statistics </p> 
                            <label>View graph: &nbsp;
                                <select name={this.state.xaxis} onChange={this.handleChangeGraph}>
                                    <option value="person">Commits per person</option>
                                    <option value="branch">Commits per branch</option>
                                </select>
                            </label>
                            <CommitsView commits={this.state.commits} commitsByBranch={this.state.commitsByBranch} xaxis={this.state.xaxis} />
                        </div>
                    </div>

                </div>
            </main>

            
        );
    }
}

export default ViewInfo;
