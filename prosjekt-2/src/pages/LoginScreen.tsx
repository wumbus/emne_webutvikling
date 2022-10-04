import React, { FC, useState, useEffect, DetailedHTMLProps, FormHTMLAttributes, FormEvent } from "react";
import { getProject } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from './css/LoginScreen.module.css';

/**
 * A type used to store the token and project id.
 **/
type LoginScreenType = {
  token: string;
  project_id: number | "";
  rememberMe: boolean;
  feedback: string
}
/**
 * Gets the information needed to be displayed on the front page and displays it.
 *
 */
const LoginScreen: FC = () => {
  const [state, setState] = useState<LoginScreenType>({
    token: "",
    project_id: 0,
    rememberMe: true,
    feedback: ""
  });

  const navigate = useNavigate();

  /**
 * On change, whichever of project_id or token that was updated will get its state updated.
 *
 * @param event   New character is typed into either input field
 */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.name === "project_id") {
      setState((state) => {
        return { ...state, project_id: Number(input.value) };
      });
    } else if (input.name === "token") {
      setState((state) => {
        return { ...state, token: input.value };
      });
    }
  };


  /**
   * Attempts to secure a connection with the requested project using the given access token. On successful connection, redirection to viewInfo page is allowed.
   *
   * @param event   Button is clicked
   */
  const handleFormSubmit = async (event:FormEvent<HTMLFormElement>  ) => {
    event.preventDefault();
    const { token, project_id } = state;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("project_id", project_id.toString());

    const res = await getProject(token, project_id.toString()) //endre getProject til getResponse ?
    if (res) {
      navigate("/viewInfo", { replace: true })
    }
    else {
      setState((state) => { return { ...state, feedback: "Please submit a valid Project ID with an authorized Access token" } });
    }
  }

  /**
    * Updates token and project_id after render.
    */
  useEffect(() => {
    const token = sessionStorage.getItem("token") || "";
    const project_id = Number(sessionStorage.getItem("project_id")) || 0;
    setState((state) => { return { ...state, token: token, project_id: project_id } });
  }, []);

  return (
    <main className={styles.LoginScreen}>
      <br />
      <h2> GitLab Project Statistics  </h2>
      <div className={styles.container}>
        <form onSubmit={handleFormSubmit}>
          <h3>Access Controll</h3>

          <div className={styles.field}>
            <label className={styles.label}> Project ID: </label>
            {state.project_id == 0
              ? <input type="number"
                className={styles.input}
                name="project_id"
                placeholder="Enter a Project ID"
                onChange={handleChange}
              />
              : <input type="number"
                className={styles.input}
                name="project_id"
                defaultValue={state.project_id}
                placeholder="Enter a Project ID"
                onChange={handleChange}
              />}
          </div>

          <div className={styles.field}>
            <label className={styles.label}> Access token: </label>
            <input
              className={styles.input}
              name="token"
              defaultValue={state.token}
              placeholder="Enter access token"
              onChange={handleChange}
            />
          </div>

          <div>
            <button className={styles.submit} type="submit">Submit</button>
          </div>
        </form>
      </div>
      <br />
      <div className={styles.userFeedback}>
        <label className={styles.feedback} >{state.feedback}</label>
      </div>
    </main>

    //Gitlab colors:
    //#8C929D  #E2432A  #FC6D27  #FCA326
    //Grey     Red      Orange   Yellow

  );
}

export default LoginScreen;
