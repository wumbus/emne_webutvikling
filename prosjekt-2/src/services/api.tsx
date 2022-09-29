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
  )
    .then((res) => {
      if (res.ok) {
        // True if HTTP status code is 200-299
        console.log(res.ok)
        console.log(res)
        localStorage.setItem("connection_established", "true");
      } else {
        console.log("whyyyy")
        localStorage.setItem("connection_established", "false");

      }
    })
    .catch((err) => {
      localStorage.setItem("connection_established", "false");
    });
};

export const getProjectIssues = async (token: string, project_id: string) => {
  const res = await fetch(
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/issues?private_token=${token}`
  );
  const data: any = await res.json();
  const issuesArray: Array<any> = [];

  data.forEach((issue: IssuesType) => {
    const { iid, title, assignee } = issue;
    console.log(iid, title, assignee["username"]);
    issuesArray.push([iid.toString(), title, assignee["username"]]);
  });
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
    membersArray.push([username, name, avatar_url, access_level.toString()]);
  });
  return membersArray;
};
