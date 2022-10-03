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

// Projext id
// 17464

// Acces tokens
// glpat-9CzoD9y7CQx2ujy4Ubmx Cecilie
// glpat-wsMyuXMF-aYEBu9rXcED Jimmy

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
  return await fetch(
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}?private_token=${token}`
  )
    .then((res) => {
      if (res.ok) { // True if HTTP status code is in the inteval of 200-299
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return false;
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

export const getCommits = async (token: string, project_id: string) => {
  const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/repository/commits?per_page=100&private_token=${token}`);
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


export const getBranches = async (token: string, project_id: string) => {
  const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/repository/branches?private_token=${token}`);
  const data: any = await res.json();

  const BranchesArray: Array<any> = [];

  data.forEach((branch: BranchesType) => {
      const { name } = branch
      // console.log(iid, title, assignee["username"]);
      BranchesArray.push(name);
  });
  // console.log(BranchesArray);
  return BranchesArray;
}

export const getCommitsByBranch = async (token: string, project_id: string, branch_name: string) => {
  // console.log("Branch_name:" + branch_name);
  
  const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/repository/commits?per_page=100&ref_name=${branch_name}&private_token=${token}`);
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

export const getCommitsByAllBranches = async (token: string, project_id: string) => {
  let branches = ["main"];
  let commitsByBranch: any = [];
  // let commitsByBranch: any = {};

  const requestBranches: any = getBranches(token,project_id);
  requestBranches.then((bran: Array<string>) => {
      // console.log("Bran:" + bran);
      branches = bran;

      for (let i = 0; i < branches.length; i++) {
          // console.log("branch: " + branches[i]);
          const requestCommits: any = getCommitsByBranch(token,project_id, branches[i]);
          requestCommits.then((commits: any) => {
              commitsByBranch.push([branches[i], commits]);
              // commitsByBranch[branches[i]] = commits;
          }).catch((err: any) => {
              console.log("Problem with getCommitsByBranch");
          });
      }
      // console.log(commitsByBranch);
  }).catch((err: any) => {
      console.log("Problem with getBranches");
  });
  // console.log(commitsByBranch);

  return commitsByBranch;
}

export const getNumberOfCommitsByAllBranches = async (token: string, project_id: string) => {
  let branches = ["main"];
  let commitsByBranch: Array<any> = [];
  // let commitsByBranch: any = {};

  const requestBranches: any = getBranches(token,project_id);
  requestBranches.then((bran: any) => {
      // console.log("Bran:" + bran);
      branches = bran;

      for (let i = 0; i < branches.length; i++) {
          // console.log("branch: " + branches[i]);
          const requestCommits: any = getCommitsByBranch(token, project_id, branches[i]);
          requestCommits.then((commits: any) => {
              commitsByBranch.push(commits.length);
              // commitsByBranch[branches[i]] = commits;
          }).catch((err: any) => {
              console.log("Problem with getCommitsByBranch");
          });
      }
      // console.log(commitsByBranch);
  }).catch((err: any) => {
      console.log("Problem with getBranches");
  });
  // console.log(commitsByBranch);

  return commitsByBranch;
}

