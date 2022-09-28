import React from "react";

export type ProjectType = {
  id: number;
  description: string | null;
  name: string;
  creator_id: number;
  message: string;
};

export type IssuesType = {
  iid: number;
  title: string;
  assignee: any;
  username: string;
};

export type MembersType = {
  username: string;
  name: string;
  avatar_url: string;
  access_level: number;
};

// glpat-9CzoD9y7CQx2ujy4Ubmx

// export const getProject = async (token: string, project_id: string) => {
//     const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}?private_token=${token}`);
//     const data: ProjectType = await res.json();
//     //   var dataParsed = await res.json();

//     const { id, name, creator_id } = data;
//     console.log(id, name, creator_id, data);

//     //   return dataParsed;
//     return data;
// }

export const getProject = async (token: string, project_id: string) => {
  await fetch(
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}?private_token=${token}`
  ).then((res) => {

    let statusCode = res.status,
        success = res.ok

    res.json().then((data : ProjectType) => {
      //   var dataParsed = await res.json();
      
      return data.message


      //   return dataParsed;
    });
  })
  .catch( err => {

  })
};

export const getProjectIssues = async (token: string, project_id: string) => {
  const res = await fetch(
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/issues?private_token=${token}`
  );
  const data: any = await res.json();
  //   var dataParsed = await res.json();

  const issuesArray: Array<any> = [];

  data.forEach((issue: IssuesType) => {
    const { iid, title, assignee } = issue;
    console.log(iid, title, assignee["username"]);
    issuesArray.push([iid.toString(), title, assignee["username"]]);
  });

  // const { iid, title, assignee } = data;
  // console.log(iid, title, assignee, data);

  //   return dataParsed;
  return issuesArray;
};

export const getMembers = async (token: string, project_id: string) => {
  const res = await fetch(
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/members/all?private_token=${token}`
  );
  const data: any = await res.json();

  const membersArray: Array<any> = [];

  data.forEach((member: MembersType) => {
    const { username, name, avatar_url, access_level } = member;
    // console.log(iid, title, assignee["username"]);
    membersArray.push([username, name, avatar_url, access_level.toString()]);
  });

  // const { iid, title, assignee } = data;
  // console.log(iid, title, assignee, data);

  //   return dataParsed;
  return membersArray;
};
