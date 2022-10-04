import React from "react";
// npm i react-chartjs-2 chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export function CommitsView(props: { commits: any, commitsByBranch: any, xaxis: any }) {
    // initiate props
    const commits = props.commits;
    const xaxis = props.xaxis;
    const commitsByBranch = props.commitsByBranch;

    // default dataset - shown if all else fails
    let barData = {
        labels: ["katt", "hund", "fisk"],
        datasets: [{
            backgroundColor: "rgba(87, 121, 234, 0.6)",
            data: [2, 5, 3]
        }]
    };

    if (xaxis == "person") {
        // find all comitters aka. all the different emails
        // find all emails in all the commits
        let committers: Array<string> = [];
        commits.forEach((commit: any) => {
            committers.push(commit[5]);
        });
        // find the unique emails
        const uniqueCommitters = new Set<string>(committers)

        // count number of commits per email
        let countCommits: Array<number> = [];
        uniqueCommitters.forEach(function (email: string) {
            let count = 0;
            commits.forEach((commit: any) => {
                if (commit[5] == email) {
                    count++;
                }
            });
            countCommits.push(count);
        });

        // Number of commits (data / Y-axis) ber email (labels / X-axis)
        barData = {
            labels: Array.from(uniqueCommitters),
            datasets: [{
                backgroundColor: "#fc6e2794",  //Hover -> #fca32696 ?
                data: countCommits
            }]
        }

    } else if (xaxis == "branch") {
        try {

            let countCommits: any = [];
            let branchNames: any = [];
            commitsByBranch.forEach((cbb: any) => {
                // number of commits in a branch
                countCommits.push(cbb[1].length);
                // the name of the branch in question
                branchNames.push(cbb[0]);
            });

            // number of commits (data / Y-axis) per branch (labels / X-axis)
            barData = {
                labels: branchNames,
                datasets: [{
                    backgroundColor: "#fc6e2794",  //Hover -> #fca32696 ?
                    data: countCommits
                }]
            }
        } catch (error) {
            console.log("Dette funket dårlig");

        }
    }

    // register relevant chart.js elements
    ChartJS.register(CategoryScale, LinearScale, BarElement);

    // show the graph as a bar-graph
    return (
        <div>
            <Bar data={barData} />
        </div>
    );
}
