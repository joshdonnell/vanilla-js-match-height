let mix = require('laravel-mix');

mix.js('vanilla-js-match-height.js', 'dist/index.js')
.js('test/index.js', 'test/dist/test.js');