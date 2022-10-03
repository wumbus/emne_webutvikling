/**
 * A type that stores the information we want from the GetIssues call.
 */
export type IssuesType = {
  iid: number;
  title: string;
  assignee: any;
  username: string;
};

/**
 * A type that stores the information we want from the GetMembers call.
 */
export type MembersType = {
  username: string;
  name: string;
  avatar_url: string;
  access_level: number;
};

/**
 * Attempts to make a successful connection with the GitLab project using the provided access token.
 * 
 * @param token   The access token 
 * @param project_id  The id of the project we want to access information from
 * @returns   True if the connection is successfully established, false if not
 */
export const getProject = async (token: string, project_id: string) => {
  return await fetch(
    `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${project_id}?private_token=${token}`
  )
    .then((res) => {
      if (res.ok) {
        // True if HTTP status code is 200-299
        console.log(res.ok)
        //console.log(res)
        return true;
      } else {
        console.log("whyyyy")
        return false;
      }
    })
    .catch((err) => {
      return false;
    });
};

/**
 * Fetches the issues from the requested project and stores the information in an IssueType.
 *  
 * @param token   The access token
 * @param project_id  The id of the project we want to access information from
 * @returns   An array of the issues in the project
 */
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
  const data: any = await res.json();

  const membersArray: Array<any> = [];

  data.forEach((member: MembersType) => {
    const { username, name, avatar_url, access_level } = member;
    membersArray.push([username, name, avatar_url, access_level.toString()]);
  });
  console.log(membersArray);
  
  return membersArray;
};
