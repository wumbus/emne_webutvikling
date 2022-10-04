import React from "react";
import { CommitsView } from "../components/commits";
import { MembersList } from "../components/User"
import { getProject, getProjectIssues, getMembers, getCommits, getCommitsByAllBranches, getNumberOfCommitsByAllBranches, getBranches } from "../services/api";
import styles from './css/viewInfo.module.css';


/**
 * viewInfo displays all the information we gather from the project in a readable manner.
 */
class ViewInfo extends React.Component<{}, { token: any, project_id: any, data: any, issues: any, members: string[][], sorting_members: string, checkboxes: any, commits: any, commitsByBranch: any, xaxis: any }> {
    constructor(props: any) {
        super(props);

        this.state = {
            token: sessionStorage.getItem("token") || "",
            project_id: sessionStorage.getItem("project_id") || 0,
            data: " ",
            issues: null,
            sorting_members: localStorage.getItem("sort") || "",
            checkboxes: this.getCheckboxes(localStorage.getItem("checkboxes")),
            members: [],
            commits: [],
            commitsByBranch: [],
            xaxis: "person"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeGraph = this.handleChangeGraph.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.getCheckboxes = this.getCheckboxes.bind(this);

    }

    /**
     * Helper function that converts the checkbox string that is stored in localStorage to an array of boolean values.
     * 
     * @param checkbox  The string of the boolean values separated by commas
     * @returns     An array of boolean values
     */
    getCheckboxes(checkbox: any) {
        if (checkbox == null) {
            return [];
        } else {
            let checkbox_list_string = checkbox.split(",");
            let checkbox_list: any = [];
            checkbox_list_string.forEach((element: string) => {
                if (element === "true") {
                    checkbox_list.push(true);
                } else if (element === "false") {
                    checkbox_list.push(false);
                }
            });
            console.log(checkbox_list);
            return checkbox_list;
        }
    }

    /**
     * Helper function that allows the selected parameter in each option of the select to be decided based on what is stored in localStorage.
     * 
     * @param value     The option's name
     * @returns     True if the option should be the selected option
     */
    selectedSort(value: string) {
        if (this.state.sorting_members == value) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * On change, it updates the selected way of sorting.
     * 
     * @param event     Select is changed
     */
    handleChange(event: any) {
        this.setState({
            sorting_members: event.target.value
        });

        localStorage.setItem("sort", event.target.value);
    }

    handleChangeGraph(event: any) {
        this.setState({
            xaxis: event.target.value
        });
    }

    /**
     * On change, the boolean values for checkboxes are updated.
     * 
     * @param event     A checkbox is checked or unchecked
     */
    handleCheckboxChange(event: any) {
        const id = parseInt(event.target.id);

        let checkboxes = this.state.checkboxes;
        checkboxes[id] = event.target.checked;

        this.setState({
            checkboxes
        });

        localStorage.setItem("checkboxes", checkboxes);
    }

    /**
     * Gets the values stored in local and session storage and updates the state.
     */
    componentDidMount() {

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
                checkboxes: []
            })
        } else {
            this.setState({
                checkboxes: this.getCheckboxes(localStorage.getItem("checkboxes"))
            })
        }

        this.setState({
            data: getProject(this.state.token, this.state.project_id) // Should be removed right?
        });

        // const data: any = getProject(this.state.token,this.state.project_id); // <-- blir ikke brukt ?

        // const requestIssues: any = getProjectIssues(this.state.token, this.state.project_id);
        //console.log(this.state.data);



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

        const requestMembers: any = getMembers(this.state.token, this.state.project_id);
        console.log(requestMembers);

        requestMembers.then((members: string[][]) => {
            this.setState({
                members: members
            });
            console.log(members);


        }).catch((err: any) => {
            console.log("Failed Request (getMembers)");
        });

        const requestCommits: any = getCommits(this.state.token, this.state.project_id);
        requestCommits.then((commits: any) => {
            this.setState({
                commits: commits
            });
        }).catch((err: any) => {
            console.log("Failed Request (getCommits)");
        });

        const requestCommitsByAllBranches: any = getCommitsByAllBranches(this.state.token, this.state.project_id);
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
                            <p className={styles.memberlist}>Project Members</p>
                            <form className={styles.form}>
                                <table>Sort by: &nbsp;
                                    <select name={this.state.sorting_members} onChange={this.handleChange}>
                                        <option value="number" selected={this.selectedSort("number")}>Role</option>
                                        <option value="name" selected={this.selectedSort("name")}>Name</option>
                                    </select>
                                </table>

                                <table>Filter by: &nbsp;
                                    <input type="checkbox" name="" id="0" checked={this.state.checkboxes[0]} onChange={this.handleCheckboxChange} />Developer &nbsp;
                                    <input type="checkbox" name="" id="1" checked={this.state.checkboxes[1]} onChange={this.handleCheckboxChange} />Maintainer &nbsp;
                                    <input type="checkbox" name="" id="2" checked={this.state.checkboxes[2]} onChange={this.handleCheckboxChange} />Owner &nbsp;
                                    <input type="checkbox" name="" id="3" checked={this.state.checkboxes[3]} onChange={this.handleCheckboxChange} />Bots &nbsp;
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
