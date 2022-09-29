import React from "react";

function title(value: number) {
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

    // console.log(sorting);
    // console.log(filterBy);
    // console.log(membersOrg);
    // console.log(membersOrg[0]);

    let members: any = [];
    if (filterBy[0]) {
        membersOrg.forEach((member: any) => {
            if (member[3] == "30") {
                members.push(member)
            }
        });
    }
    if (filterBy[1]) {
        membersOrg.forEach((member: any) => {
            if (member[3] == "40") {
                members.push(member)
            }
        });
    }
    if (filterBy[2]) {
        membersOrg.forEach((member: any) => {
            if (member[3] == "50") {
                members.push(member)
            }
        });
    }
    if (filterBy[3]) {
        // Bots
        membersOrg.forEach((member:any) => {
            console.log(member[0]);
            
            if (member[0].includes("_bot")) {
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

    // console.log(members);


    if (sorting == "number") {
        // console.log("fakk 2");
        members.sort((a: any, b: any) => b[3] - a[3]);
    } else if (sorting == "name") {
        members.sort();
    }



    return (
        <ul>
            {members.map((member: any) =>
                <MemberItem key={member[0]} value={member} />)}
        </ul>
    );
}

export function MemberItem(props: any) {
    return (<li> <img src={props.value[2]} alt="Avatar" />
        {props.value[1]} ({props.value[0]}) <br /> {title(props.value[3])}</li>);
}

