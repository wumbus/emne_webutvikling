import React from "react";

export type ProjectType = {
    id: number,
    description: string | null,
    name: string,
    creator_id: number
}

export type IssuesType = {
    iid: number,
    title: string,
    assignee: any,
    username: string
}

class Assignee extends React.Component {

    constructor(props: any, username: string) {
        super(props);
        this.state = { username: username};
    }
}

// glpat-9CzoD9y7CQx2ujy4Ubmx

export const getProject = async (token: string) => {
    const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/17464?private_token=${token}`);
    const data: ProjectType = await res.json();
    //   var dataParsed = await res.json();

    const { id, name, creator_id } = data;
    console.log(id, name, creator_id, data);

    //   return dataParsed;
    return data;
}

export const getProjectIssues = async (token: string) => {
    const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/17464/issues?private_token=${token}`);
    const data: any = await res.json();
    //   var dataParsed = await res.json();

    const issuesArray: Array<any>  = [];

    data.forEach((issue: IssuesType) => {
        const { iid, title, assignee } = issue;
        console.log(iid, title, assignee["username"]);
        issuesArray.push([iid.toString(), title, assignee["username"]]);
    });


    // const { iid, title, assignee } = data;
    // console.log(iid, title, assignee, data);

    //   return dataParsed;
    return issuesArray;
}

