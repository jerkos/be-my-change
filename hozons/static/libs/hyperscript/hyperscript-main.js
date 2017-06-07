var h = require('hyperscript'); // or 'virtual-hyperscript'
var hh = require('hyperscript-helpers')(h);  // ← Notice the (h)
// to use the short syntax, you need to introduce them to the current scope
var div  = hh.div,
    span = hh.span,
    h1   = hh.h1;
