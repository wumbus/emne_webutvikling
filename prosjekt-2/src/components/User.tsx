import React from "react";

function title(value : number) {
    if (value == 40) {
        return "Maintainer"
    } else if (value == 50) {
        return "Owner"
    } else if (value == 30) {
        return "Developer"
    }
}

export function MembersList(props: {members: any, sort: any}) {
    const members = props.members;
    const sorting = props.sort;

    console.log(sorting)


    if (sorting == "number") {
        console.log("fakk 2");
        members.sort((a:any,b:any) => b[3] - a[3]);
    } else if (sorting == "name") {
        members.sort();
    }

    return(
        <ul>
           {members.map((member: any) => 
           <MemberItem key={member[0]} value={member} />)}
        </ul>    
    );
}

export function MemberItem(props: any) {
    return (<li> <img src={props.value[2]} alt="Avatar" />
        {props.value[1]} ({props.value[0]}) <br/> {title(props.value[3])}</li>);
}

