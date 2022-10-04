import React, { FC, useState, useEffect } from "react";
import { getProject } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from './css/LoginScreen.module.css';

type LoginScreenType = {
  token: string;
  project_id: number | "";
  rememberMe: boolean;
  feedback: string
}
const LoginScreen: FC = () => {
  const [state, setState] = useState<LoginScreenType>({
    token: "",
    project_id: Number(),
    rememberMe: true,
    feedback: ""
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (input.name === "project_id") {
      setState((state) => {return { ...state, project_id: input.value === "" ? "" : Number(input.value) }});
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
    if (res) {
      navigate("/viewInfo", {replace: true})
    }
    else{
      setState((state) => {return { ...state, feedback: "Please submit a valid Project ID with an authorized Access token" }});
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token") || "";
    const project_id = Number(sessionStorage.getItem("project_id")) || 0;
    setState((state) => {return { ...state, token: token, project_id: project_id }});
  }, []);
  
  return (
    <main className={styles.LoginScreen}>
      <br/>
      <h2> GitLab Project Statistics  </h2>
      <div className={styles.container}>
        <form onSubmit={handleFormSubmit}>
        <h3>Access Controll</h3>

          <div className={styles.field}>
          <label className={styles.label}> Project ID: </label>
            <input 
              className={styles.input}
              name="project_id"
              value={state.project_id}
              placeholder="Enter a Project ID"
              onChange={handleChange}
            /> {/* Placeholder vises ikke fordi verdien enten er et tall eller 0? */}
          </div>

          <div className={styles.field}>
          <label className={styles.label}> Access token: </label>
            <input
              className={styles.input}
              name="token"
              value={state.token}
              placeholder="Enter a affiliated Acces token"
              onChange={handleChange}
            />
          </div>
          
          <div>
            <button className={styles.submit} type="submit">Submit</button>
          </div>
        </form>
      </div>
      <br/>
      <div className={styles.userFeedback}>
        <label className={styles.feedback} >{state.feedback}</label>
      </div>
    </main>

//Gitlab colors:
//#8C929D  #E2432A  #FC6D27  #FCA326
//Grey     Red      Orange   Yellow

/* 

 <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
*/
    
  );
}

export default LoginScreen;
