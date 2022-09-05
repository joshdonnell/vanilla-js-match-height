import MatchHeight from "../dist/index";

let test = new MatchHeight('.hello', {
    parent: '.parent-1',
    byRow: true,
    timeOut: 5000
});

test.debug();

new MatchHeight('.my-class');