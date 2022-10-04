import React, { useContext } from 'react';
import { ThemeContext, ThemeProvider, themes } from '../services/themeContext';
import styles from '../pages/css/viewInfo.module.css';
/**
 * A helper function that converts a given value into its corresponding role in GitLab
 *
 * @param value The role's number value
 * @returns     The role's title
 */
function title(value: number) {
	if (value == 40) {
		return "Maintainer";
	} else if (value == 50) {
		return "Owner";
	} else if (value == 30) {
		return "Developer";
	}
}

/**
 * A function that produces a list of the members in the corresponding order it should be displayed.
 * This takes into account both the filtering option (so it will only return members with the role "Maintainer"
 * if the corresponding checkbox is ticked off) and the sort option that sorts either on role or alphabetically by name.
 *
 * @param members   A list the members in the project
 * @param sort      A value deciding either to sort by "name" or by role ("number")
 * @param filterBy  An array of booleans describing which roles to filter by
 * @returns     A list of members in the order they are to be displayed
 */
export function MembersList(props: { members: any; sort: any; filterBy: any }) {
	const membersOrg = props.members;
	const sorting = props.sort;
	const filterBy = props.filterBy;

	let members: any = [];
	if (membersOrg[0] != 1) {
		// Checks if members is set to the standard one or if there are actually members
		if (filterBy[0]) {
			membersOrg.forEach((member: any) => {
				if (member[3] == "30" && !members.includes(member)) {
					members.push(member);
				}
			});
		}
		if (filterBy[1]) {
			membersOrg.forEach((member: any) => {
				if (member[3] == "40" && !members.includes(member)) {
					members.push(member);
				}
			});
		}
		if (filterBy[2]) {
			membersOrg.forEach((member: any) => {
				if (member[3] == "50" && !members.includes(member)) {
					members.push(member);
				}
			});
		}
		if (filterBy[3]) {
			// Bots
			membersOrg.forEach((member: any) => {
				// console.log(member[0]);

				if (member[0].includes("_bot") && !members.includes(member)) {
					members.push(member);
				}
			});
		}

		// if none are selected show all
		if (!(filterBy[0] || filterBy[1] || filterBy[2] || filterBy[3])) {
			membersOrg.forEach((member: any) => {
				members.push(member);
			});
		}
	}

	// Handles the sorting
	if (sorting == "number") {
		members.sort((a: any, b: any) => b[3] - a[3]);
	} else if (sorting == "name") {

		members.sort((a: any, b: any) => {
			let aName = a[1].toLowerCase(),
				bName = b[1].toLowerCase();

			if (aName < bName) {
				return -1;
			}
			else if (aName > bName) {
				return 1;
			}
			return 0;
		});
	};


	// retrieve the context
	let theme = useContext(ThemeContext);
	console.log(theme);

	return (

		<table style={{ borderColor: theme.borderColor }}>
			<thead>
				<tr>
					<th>Avatar</th>
					<th>Name</th>
					<th>User name</th>
					<th>Role</th>
				</tr>
			</thead>
			<tbody>

				{members.map((member: any) => (
					<MemberItem key={member[0]} value={member} />
				))}
			</tbody>

		</table>
	);
}


/**
 * A function that gets information about a particular member and returns a table row 
 * element with the information in a readable manner.
 *
 * @param props     An array with the member's information
 * @returns         A table row element with the member's information in a readable manner
 */
export function MemberItem(props: any) {
	return (
		<tr className={styles.fancy}>
			<td className={styles.fancy}>
				<img src={props.value[2]} alt="Avatar" />
			</td>
			<td className={styles.fancy}>{props.value[1]} </td>
			<td className={styles.fancy}>{props.value[0]} </td>
			<td className={styles.fancy}>{title(props.value[3])}</td>
		</tr>
	);
}
