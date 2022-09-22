type ProjectType = {
  id: number,
  description: string | null,
  name: string
}

// glpat-9CzoD9y7CQx2ujy4Ubmx

export const getProject = async(token : string) => {
  const res = await fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/17464?private_token=${token}`);
  const data: ProjectType = await res.json();
  const {id, name} = data;
  console.log(id, name, data);
}

