import React, { useState } from "react";
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


//create your forceUpdate hook
export function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}


export function CommitsView(props: { commits: any, commitsByBranch: any, xaxis: any}) {

    const commits = props.commits;
    const xaxis = props.xaxis;
    console.log("xaxis: " + xaxis);
    
    const commitsByBranch = props.commitsByBranch;
    // const branches = props.branches;

    console.log(commits);
    // default dataset
    let barData = {
        labels: ["katt", "hund", "fisk"],
        datasets: [{
            backgroundColor: "rgba(87, 121, 234, 0.6)",
            data: [1, 5, 3]
        }]
    };

    if (xaxis == "person") {
        // find all comitters
        let committers: any = [];
        commits.forEach((commit: any) => {
            committers.push(commit[5]);
        });
        const uniqueCommitters: any = new Set(committers)

        console.log(uniqueCommitters);

        let countCommits: any = [];
        for (const email of uniqueCommitters) {
            let count = 0;
            commits.forEach((commit: any) => {
                if (commit[5] == email) {
                    count++;
                }
            });
            countCommits.push(count);
        }

        // console.log(countCommits);
        let barColors = ["red", "green", "blue", "orange", "brown"];

        const data = {
            labels: ["katt", "hund", "fisk"],
            datasets: [{
                backgroundColor: "rgba(87, 121, 234, 0.6)",
                data: [1, 5, 3]
            }]
        }

        barData = {
            labels: Array.from(uniqueCommitters),
            datasets: [{
                backgroundColor: "rgba(87, 121, 234, 0.6)",
                data: countCommits
            }]
        }

        const options = {
            // responsive: true,
            // maintainAspectRatio: false,
            title: {
                display: true,
                text: "Commits",
                fontSize: 25,
            }
        };

        const options2 = {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "Bar + Line Chart",
                fontSize: 25,
            },
            scales: {
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Months",
                        },
                        stacked: "true",
                    },
                ],
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Values",
                        },
                        stacked: "true",
                    },
                ],
            },
        };

        const options3 = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Data Orgranized In Bars',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }

    } else if (xaxis == "branch") {
        try {
            console.log(commitsByBranch);
            console.log(commitsByBranch.length); 
            
            console.log(Array.isArray(commitsByBranch));
            console.log(commitsByBranch.length); 

            let countCommits: any = [];
            let branchNames: any = [];
            commitsByBranch.forEach((cbb:any) => {
                // number of commits in a branch
                countCommits.push(cbb[1].length);
                // the name of the branch in question
                branchNames.push(cbb[0]);
            });

            barData = {
                labels: branchNames,
                datasets: [{
                    backgroundColor: "rgba(87, 121, 234, 0.6)",
                    data: countCommits
                }]
            }


        } catch (error) {
            console.log("Dette funket dårlig");
            
        }

    }




    ChartJS.register(CategoryScale, LinearScale, BarElement);

    const forceUpdate = useForceUpdate();

    return (
        <div>
            <Bar data={barData} />
            <p>{commits[0]}</p>
            <button onClick={forceUpdate}>
                Click to re-render
            </button>
        </div>

        // {commits.map((commit: any) =>
        //     <CommitItem key={commit[0]} value={commit} />)}
    );
}

// function CommitItem(props: any) {
//     return (<li>
//         {props.value[1]} ({props.value[0]})</li>);
// }