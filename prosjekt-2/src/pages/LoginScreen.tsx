import React, { FC, useState, useEffect } from "react";
import { getProject } from "../services/api";
import { useNavigate } from "react-router-dom";

/**
 * A type used to store the token and project id.
 **/
type LoginScreenType = {
	token: string;
	project_id: number;
	rememberMe: boolean;
};

/**
 * Gets the information needed to be displayed on the front page and displays it.
 *
 * @returns
 */
const LoginScreen: FC = () => {
	const [state, setState] = useState<LoginScreenType>({
		token: "",
		project_id: 0,
		rememberMe: true,
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
	const handleFormSubmit = async (event: any) => {
		event.preventDefault();
		const { token, project_id } = state;
		sessionStorage.setItem("token", token);
		sessionStorage.setItem("project_id", project_id.toString());

		const res = await getProject(token, project_id.toString()); //endre getProject til getResponse ?
		if (res) navigate("/viewInfo", { replace: true });
		console.log(res);
	};

  /**
   * Updates token and project_id after render.
   */
	useEffect(() => {
		const token = sessionStorage.getItem("token") || "";
		const project_id = Number(sessionStorage.getItem("project_id")) || 0;
		setState((state) => {
			return { ...state, token: token, project_id: project_id };
		});
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
};

export default LoginScreen;
