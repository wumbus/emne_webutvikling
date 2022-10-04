import React from "react";
import renderer from 'react-test-renderer';

import { MembersList, title } from './User';

test("Returns correct role", () => {
    expect(title(40)).toBe("Maintainer")
});


test("Snapshot for memberslist", () => {

    const members_given : any = [['Vahideh Rezaei', 'https://secure.gravatar.com/avatar/5a096b00ec3bbd22d9f3d761c3f23cfa?s=80&d=identicon', '40'],
    ['cldahl', 'Cecilie Le Duc Dahl', 'https://secure.gravatar.com/avatar/11b6eb38d8e618e9202a6f944526b065?s=80&d=identicon', '40'], 
    ['lisebul', 'Lise Birgitte Ullevålseter', 'https://secure.gravatar.com/avatar/6845d366a85cc4850f6771518755afbf?s=80&d=identicon', '40'],
    ['jimmynl', 'Jimmy Ngo Luong', 'https://secure.gravatar.com/avatar/b98569d860ff48aa6a8212857469a82e?s=80&d=identicon', '40'],
    ['project_17464_bot', 'Maintainer test token', 'https://secure.gravatar.com/avatar/a877b6393c1fa870c6d3c4cb9c6f34d8?s=80&d=identicon', '40'],
    ['group_28525_bot', 'Jonatan devver', 'https://secure.gravatar.com/avatar/e0b7100e71618df8efdd8d28f32410fc?s=80&d=identicon', '30']];


    let filterBy : any = [false, true, false, false];

    let tree : any = renderer.create(<MembersList members={members_given} sort="name" filterBy={filterBy}/>);

    expect(tree).toMatchSnapshot();
})

let filter: any = [true, false, false, false]



test("Snapshot for memberslist, developer", () => {

    const members: any = [['group_28525_bot', 'Jonatan devver', 'https://secure.gravatar.com/avatar/e0b7100e71618df8efdd8d28f32410fc?s=80&d=identicon', '30']];
    let filterBy : any = [true, false, false, false];

    let tree : any = renderer.create(<MembersList members={members} sort="name" filterBy={filterBy}/>);

    expect(tree).toMatchSnapshot();
})


test("Returns correct role", () => {
    expect(title(30)).toBe("Developer")
});








