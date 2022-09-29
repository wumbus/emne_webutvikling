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

export type MembersType = {
    username: string,
    name: string,
    avatar_url: string,
    access_level: number
}

export type CommitsType = {
    id: string,
    created_at: string,
    title: string,
    message: number,
    committer_name: string,
    committer_email: string
}

export type BranchesType = {
    name: string
}


// glpat-9CzoD9y7CQx2ujy4Ubmx

export const getProject = async (token: string) => {
    const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/17464?private_token=${token}`);
    const data: ProjectType = await res.json();
    //   var dataParsed = await res.json();

    const { id, name, creator_id } = data;
    // console.log(id, name, creator_id, data);

    //   return dataParsed;
    return data;
}

export const getProjectIssues = async (token: string) => {
    const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/17464/issues?private_token=${token}`);
    const data: any = await res.json();
    //   var dataParsed = await res.json();
    // console.log(data);

    const issuesArray: Array<any> = [];

    data.forEach((issue: IssuesType) => {
        const { iid, title, assignee } = issue;
        // console.log(iid, title, assignee["username"]);
        issuesArray.push([iid.toString(), title, assignee["username"]]);
    });


    const { iid, title, assignee } = data;
    // console.log(iid, title, assignee, data);

    //   return dataParsed;
    return issuesArray;
}


export const getMembers = async (token: string) => {
    const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/17464/members/all?private_token=${token}`);
    const data: any = await res.json();

    const membersArray: Array<any> = [];

    data.forEach((member: MembersType) => {
        const { username, name, avatar_url, access_level } = member;
        // console.log(iid, title, assignee["username"]);
        membersArray.push([username, name, avatar_url, access_level.toString()]);
    });
    return membersArray;
}

export const getCommits = async (token: string) => {
    const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/17464/repository/commits?private_token=${token}`);
    const data: any = await res.json();

    const commitsArray: Array<any> = [];

    data.forEach((commit: CommitsType) => {
        const { id, created_at, title, message, committer_name, committer_email } = commit;
        // console.log(iid, title, assignee["username"]);
        commitsArray.push([id, created_at, title, message, committer_name, committer_email]);
    });
    // console.log(commitsArray);

    return commitsArray;
}


export const getBranches = async (token: string) => {
    const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/17464/repository/branches?private_token=${token}`);
    const data: any = await res.json();

    const BranchesArray: Array<any> = [];

    data.forEach((branch: BranchesType) => {
        const { name } = branch
        // console.log(iid, title, assignee["username"]);
        BranchesArray.push(name);
    });
    console.log(BranchesArray);
    return BranchesArray;
}

export const getCommitsByBranch = async (token: string, branch_name: string) => {
    console.log("Branch_name:" + branch_name);
    
    const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/17464/repository/commits?ref_name=${branch_name}&private_token=${token}`);
    const data: any = await res.json();

    const commitsArray: Array<any> = [];

    data.forEach((commit: CommitsType) => {
        const { id, created_at, title, message, committer_name, committer_email } = commit;
        // console.log(iid, title, assignee["username"]);
        commitsArray.push([id, created_at, title, message, committer_name, committer_email]);
    });
    console.log(commitsArray);

    return commitsArray;
}

export const getCommitsByAllBranches = async (token: string) => {
    let branches = ["main"];
    let commitsByBranch: any = [];

    const requestBranches: any = getBranches(token);
    requestBranches.then((bran: Array<string>) => {
        console.log("Bran:" + bran);
        branches = bran;

        for (let i = 0; i < branches.length; i++) {
            console.log("branch: " + branches[i]);
            const requestCommits: any = getCommitsByBranch(token, branches[i]);
            requestCommits.then((commit: any) => {
                commitsByBranch.push(commit);
            }).catch((err: any) => {
                console.log("Problem with getCommitsByBranch");
            });
        }
        console.log(commitsByBranch);
    }).catch((err: any) => {
        console.log("Problem with getBranches");
    });
    console.log(branches);

    return commitsByBranch;
}






