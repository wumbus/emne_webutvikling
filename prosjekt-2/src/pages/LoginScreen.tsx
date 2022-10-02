import React, { FC, useState, useEffect } from "react";
import { getProject } from "../services/api";
import { useNavigate } from "react-router-dom";

type LoginScreenType = {
  token: string;
  project_id: number;
  rememberMe: boolean;
}
const LoginScreen: FC = () => {
  const [state, setState] = useState<LoginScreenType>({
    token: "",
    project_id: 0,
    rememberMe: true,
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (input.name === "project_id") {
      setState((state) => {return { ...state, project_id: Number(input.value) }});
    } else if (input.name === "token") {
      setState((state) => {return { ...state, token: input.value }});
    }
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const { token, project_id } = state;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("project_id", project_id.toString());
    
    const res = await getProject(token, project_id.toString()) //endre getProject til getResponse ?
    if (res) navigate("/viewInfo", {replace: true})
    console.log(res);
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token") || "";
    const project_id = Number(sessionStorage.getItem("project_id")) || 0;
    setState((state) => {return { ...state, token: token, project_id: project_id }});
  }, []);
  
  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Project ID:{" "}
        <input
          name="project_id"
          value={state.project_id}
          onChange={handleChange}
        ></input>
      </label>
      <br />
      <label>
        Access Token:{" "}
        <input
          name="token"
          value={state.token}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginScreen;
