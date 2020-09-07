import React from 'react';
import Question from './components/Question';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let dataQcm = {
    id: 1,
    title: "Framework React",
    question: "React est-il un framework ?",
    c1: "oui",
    c2: "non",
    response: "c2",
    status: "open",
    success: false,
    choice: null,
    badge: "medium"

}


// describe('<Question /> test submit', () => {
//     it("<Question /> tests initialize contains", () => {
//         const question = mount(<Question {...dataQcm} />);
//         expect(question).toHaveLength(1);
//     });
// });
