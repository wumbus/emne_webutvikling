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

export function CommitsView(props: { commits: any, xaxis: any }) {
    const commits = props.commits;
    const xaxis = props.xaxis;

    let barData = {
        labels: ["katt", "hund", "fisk"],
        datasets: [{
            backgroundColor: "rgba(87, 121, 234, 0.6)",
            data: [1, 5, 3]
        }]
    };

    if (xaxis == "commiter") {
        // find all comitters
        let committers: any = [];
        commits.forEach((commit: any) => {
            committers.push(commit[5]);
        });
        const uniqueCommitters: any = new Set(committers)
        // console.log(uniqueCommitters);

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

    } else if (xaxis == "branches") {

    }




    ChartJS.register(CategoryScale, LinearScale, BarElement);

    return (
        <div>
            <Bar data={barData} />
            <p>{commits[0]}</p>
        </div>

        // {commits.map((commit: any) =>
        //     <CommitItem key={commit[0]} value={commit} />)}
    );
}

// function CommitItem(props: any) {
//     return (<li>
//         {props.value[1]} ({props.value[0]})</li>);
// }