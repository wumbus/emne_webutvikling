import { table } from "console";
import React from "react";
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';

import getCheckboxes from './viewInfo';

/*test("test checkboxes", () => {
    expect(new getCheckboxes(true)).toBe("true")
});

*/

it("renders without crashing", () =>{
    const div= document.createElement("div");
    ReactDOM.render(<table></table>, div)

})




