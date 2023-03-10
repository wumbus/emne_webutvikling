import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { CommitsView } from "../components/commits";
import { MembersList } from "../components/User"
import { getMembers, getCommits, getCommitsByAllBranches } from "../services/api";
import styles from './css/viewInfo.module.css';
import { ThemeContext, ThemeProvider, themes } from '../services/themeContext';


/**
 * viewInfo displays all the information we gather from the project in a readable manner.
 */
class ViewInfo extends React.Component<{}, { token: string, project_id: string, members: string[][], sorting_members: string, checkboxes: Array<boolean>, commits: string[][], commitsByBranch: string[][], xaxis: string, theme: { background: string; textColor: string; borderColor: string; } }> {
    constructor(props: any) {
        super(props);

        this.state = {
            token: sessionStorage.getItem("token") || "",
            project_id: sessionStorage.getItem("project_id") || "0",
            sorting_members: localStorage.getItem("sort") || "",
            checkboxes: this.getCheckboxes(localStorage.getItem("checkboxes")),
            members: [],
            commits: [],
            commitsByBranch: [],
            xaxis: "person",
            theme: themes.light
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeGraph = this.handleChangeGraph.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.getCheckboxes = this.getCheckboxes.bind(this);
        this.changeTheme = this.changeTheme.bind(this);

    }

    /**
     * Helper function that converts the checkbox string that is stored in localStorage to an array of boolean values.
     * 
     * @param checkbox  The string of the boolean values separated by commas
     * @returns     An array of boolean values
     */
    getCheckboxes(checkbox: string | null) {
        if (checkbox == null) {
            return [];
        } else {
            let checkbox_list_string = checkbox.split(",");
            let checkbox_list: boolean[] = [];
            checkbox_list_string.forEach((element: string) => {
                if (element === "true") {
                    checkbox_list.push(true);
                } else if (element === "false") {
                    checkbox_list.push(false);
                }
            });
            return checkbox_list;
        }
    }

    /**
     * On change, it updates the selected way of sorting.
     * 
     * @param event     Select is changed
     */
    handleChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            sorting_members: event.target.value
        });

        localStorage.setItem("sort", event.target.value);
    }

    handleChangeGraph(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            xaxis: event.target.value
        });
    }

    /**
     * Switches the theme between dark and light 
     */
    changeTheme() {
        this.setState({
            theme:
                this.state.theme === themes.dark
                    ? themes.light
                    : themes.dark,
        });
    }



    /**
     * On change, the boolean values for checkboxes are updated.
     * 
     * @param event     A checkbox is checked or unchecked
     */
    handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
        const id = parseInt(event.target.id);

        let checkboxes = this.state.checkboxes;
        checkboxes[id] = event.target.checked;

        this.setState({
            checkboxes
        });

        localStorage.setItem("checkboxes", checkboxes.toString());
    }

    /**
     * A helper function to ensure that token always is a string
     * @returns access token as a string always
     */
    helperString() {
        let tok: string | null = sessionStorage.getItem("token")
        if (tok == null) {
            return " "
        } else {
            return tok;
        }
    }

    /**
     * Gets the values stored in local and session storage and updates the state.
     */
    componentDidMount() {

        this.setState({
            token: this.helperString(),
        });


        if (localStorage.getItem("checkboxes") == null) {
            this.setState({
                checkboxes: []
            })
        } else {
            this.setState({
                checkboxes: this.getCheckboxes(localStorage.getItem("checkboxes"))
            })
        }

        const requestMembers: Promise<string[][]> = getMembers(this.state.token, this.state.project_id);
        requestMembers.then((members: string[][]) => {
            this.setState({
                members: members
            });
        }).catch((err: any) => {
            console.log("Failed Request (getMembers)");
        });

        const requestCommits: Promise<string[][]> = getCommits(this.state.token, this.state.project_id);
        requestCommits.then((commits: string[][]) => {
            this.setState({
                commits: commits
            });
        }).catch((err: any) => {
            console.log("Failed Request (getCommits)");
        });

        const requestCommitsByAllBranches: Promise<string[][]> = getCommitsByAllBranches(this.state.token, this.state.project_id);
        requestCommitsByAllBranches.then((commitsByBranch: string[][]) => {
            this.setState({
                commitsByBranch: commitsByBranch
            });
        }).catch((err: any) => {
            console.log("Failed Request (getCommitsByAllBranches)");
        });

    }


    render() {
        let theme = this.state.theme;
        return (
            <ThemeProvider value={theme}>
                <main>
                    <div className={styles.viewInfo} style={{ background: theme.background, color: theme.textColor }}>

                        <div className={styles.info1}>
                            <h1>Welcome to Project</h1>
                            <h3>{this.state.project_id}</h3>
                            <Link className={styles.buttonBack} to={'/'}>Back to access page</Link>
                            <button className={styles.buttonBack} onClick={this.changeTheme}>Change theme</button>
                        </div>

                        <div className={styles.info2}>
                            <div className={styles.columnMembers}>
                                <p className={styles.memberlist}>Project Members</p>
                                <form className={styles.form}>
                                    <table className="clean">
                                        <tbody>
                                            <tr>
                                                <td><label>
                                                    Sort by: &nbsp;
                                                    <select name={this.state.sorting_members} onChange={this.handleChange} defaultValue={this.state.sorting_members}>
                                                        <option value="number">Role</option>
                                                        <option value="name">Name</option>
                                                    </select>
                                                </label></td>
                                            </tr>
                                            <tr>
                                                <td><label>
                                                    Filter by: &nbsp;
                                                    <input type="checkbox" name="" id="0" checked={this.state.checkboxes[0]} onChange={this.handleCheckboxChange} />Developer &nbsp;
                                                    <input type="checkbox" name="" id="1" checked={this.state.checkboxes[1]} onChange={this.handleCheckboxChange} />Maintainer &nbsp;
                                                    <input type="checkbox" name="" id="2" checked={this.state.checkboxes[2]} onChange={this.handleCheckboxChange} />Owner &nbsp;
                                                    <input type="checkbox" name="" id="3" checked={this.state.checkboxes[3]} onChange={this.handleCheckboxChange} />Bots &nbsp;
                                                </label></td>
                                            </tr>
                                        </tbody>


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
            </ThemeProvider>

        );
    }
}

ViewInfo.contextType = ThemeContext;

export default ViewInfo;
