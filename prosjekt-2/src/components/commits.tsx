import React from "react";

export function CommitsView(props: { commits: any, xaxis:any }) {
    const commits = props.commits;
    const xaxis = props.xaxis;

    // find all comitters
    let committers:any = [];
    commits.forEach((commit:any) => {
        committers.push(commit[5]);
    });
    const uniqueCommitters:any = new Set(committers)
    console.log(uniqueCommitters);
    
    let countCommits:any = [];
    for (const email of uniqueCommitters) {
        let count = 0;
        commits.forEach((commit:any) => {
            if (commit[5] == email) {
                count++;
            }
        });
        countCommits.push(count);
    }
    
    console.log(countCommits);
    

    if (xaxis == "commiter") {
     
    }

    return(
        <p>{commits[0]}</p>
        // {commits.map((commit: any) =>
        //     <CommitItem key={commit[0]} value={commit} />)}
    );
}

// function CommitItem(props: any) {
//     return (<li>
//         {props.value[1]} ({props.value[0]})</li>);
// }