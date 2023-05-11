import MatchHeight from "../dist/index.js";

let test = new MatchHeight('.hello', {
    parent: '.parent-1',
    byRow: true,
    timeOut: 0
});

test.debug();

new MatchHeight('.my-class');