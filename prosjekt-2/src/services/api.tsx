/**
 * A type that stores the information we want from the GetMembers call.
 */
export type MembersType = {
  username: string;
  name: string;
  avatar_url: string;
  access_level: string;
};

export type CommitsType = {
  id: string,
  created_at: string,
  title: string,
  message: string,
  committer_name: string,
  committer_email: string
}

export type BranchesType = {
  name: string
}

/**
 * Attempts to make a successful connection with the GitLab project using the provided access token.
 * 
 * @param token   The access token 
 * @param project_id  The id of the project we want to access information from
 * @returns   True if the connection is successfully established, false if not
 */
export const getResponse = async (token: string, project_id: string) => {
  return await fetch(
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}?private_token=${token}`
  )
    .then((res) => {
      if (res.ok) { // True if HTTP status code is in the inteval of 200-299
        console.log(res);
        
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return false;
    });
};

/**
 * Fetches the members from the requested project and stores the information in a MembersType.
 * 
 * @param token   The access token
 * @param project_id The id of the project we want to access information from
 * @returns   An array of the members in the project
 */
export const getMembers = async (token: string, project_id: string) => {
  const res = await fetch(
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/members/all?private_token=${token}`
  );
  const data: MembersType[] = await res.json();
  const membersArray: string[][]= [];

  data.forEach((member: MembersType) => {
    const { username, name, avatar_url, access_level } = member;
    membersArray.push([username, name, avatar_url, access_level.toString()]);
  });

  
  return membersArray;
};

export const getCommits = async (token: string, project_id: string) => {
  const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/repository/commits?per_page=100&private_token=${token}`);
  const data: CommitsType[] = await res.json();
  const commitsArray: string[][] = [];

  data.forEach((commit: CommitsType) => {
      const { id, created_at, title, message, committer_name, committer_email } = commit;
      commitsArray.push([id, created_at, title, message, committer_name, committer_email]);
  });

  return commitsArray;
}


export const getBranches = async (token: string, project_id: string) => {
  const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/repository/branches?private_token=${token}`);
  const data: BranchesType[] = await res.json();
  const BranchesArray: string[] = [];

  data.forEach((branch: BranchesType) => {
      const { name } = branch
      BranchesArray.push(name);
  });
  return BranchesArray;
}

export const getCommitsByBranch = async (token: string, project_id: string, branch_name: string) => {
  
  const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}/repository/commits?per_page=100&ref_name=${branch_name}&private_token=${token}`);
  const data: CommitsType[] = await res.json();

  const commitsArray: string[][] = [];

  data.forEach((commit: CommitsType) => {
      const { id, created_at, title, message, committer_name, committer_email } = commit;
      commitsArray.push([id, created_at, title, message, committer_name, committer_email]);
  });

  return commitsArray;
}

export const getCommitsByAllBranches = async (token: string, project_id: string) => {
  let branches = ["main"];
  let commitsByBranch: any = [];

  const requestBranches: Promise<string[]> = getBranches(token,project_id);
  requestBranches.then((bran: Array<string>) => {
      branches = bran;

      for (let i = 0; i < branches.length; i++) {
          const requestCommits: Promise<string[][]> = getCommitsByBranch(token,project_id, branches[i]);
          requestCommits.then((commits: string[][]) => {
              commitsByBranch.push([branches[i], commits]);
          }).catch((err: any) => {
              console.log("Problem with getCommitsByBranch");
          });
      }
  }).catch((err: any) => {
      console.log("Problem with getBranches");
  });
  return commitsByBranch;
}

