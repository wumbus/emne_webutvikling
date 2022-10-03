import React from "react";

export function title(value: number) {
    if (value == 40) {
        return "Maintainer"
    } else if (value == 50) {
        return "Owner"
    } else if (value == 30) {
        return "Developer"
    }
}

export function MembersList(props: { members: any, sort: any, filterBy: any }) {
    const membersOrg = props.members;
    const sorting = props.sort;
    const filterBy = props.filterBy;

    console.log(sorting);
    console.log(filterBy);
    console.log(membersOrg);
    console.log(membersOrg[0]);

    let members: any = [];
    if (membersOrg[0] != 1) { // Checks if members is set to the standard one or if there are actually members
        if (filterBy[0]) {
            membersOrg.forEach((member: any) => {
                if (member[3] == "30" && !members.includes(member)) {
                    members.push(member)
                }
            });
        }
        if (filterBy[1]) {
            membersOrg.forEach((member: any) => {
                if (member[3] == "40" && !members.includes(member)) {
                    members.push(member)
                }
            });
        }
        console.log(filterBy[2]);
    
        if (filterBy[2]) {
            membersOrg.forEach((member: any) => {
                if (member[3] == "50" && !members.includes(member)) {
                    members.push(member)
                }
            });
        }
        if (filterBy[3]) {
            // Bots
            membersOrg.forEach((member:any) => {
                console.log(member[0]);
                
                if (member[0].includes("_bot")  && !members.includes(member)) {
                    members.push(member)
                }
            });
        }
    
        // if none are selected show all
        if (!(filterBy[0] || filterBy[1] || filterBy[2] || filterBy[3])) {
            membersOrg.forEach((member: any) => {
                members.push(member)
            });
        }
    
    }
    
    console.log(members);


    if (sorting == "number") {
        console.log("fakk 2");
        members.sort((a: any, b: any) => b[3] - a[3]);
    } else if (sorting == "name") {
        members.sort();
    }



    return (
        <table>
            <th>Avatar</th>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            {members.map((member: any) =>
                <MemberItem key={member[0]} value={member} />)}
        </table>
    );
}

export function MemberItem(props: any) {
    return (<tr> <td><img src={props.value[2]} alt="Avatar" /> </td>
       <td>{props.value[1]} </td> <td>{props.value[0]} </td> <td>{title(props.value[3])}</td></tr>);
}

