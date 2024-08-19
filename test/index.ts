import MatchHeight from '../dist/index.js'

let test = new MatchHeight('.hello', {
  parent: '.parent-1',
  byRow: true,
  timeOut: 1000,
})

test.debug()

new MatchHeight('.my-class')
