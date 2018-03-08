import 'whatwg-fetch'
window.jQuery = require("jquery");
window.$ = require("jquery");

const oldFetch = window.fetch;

window.fetch = (url, data={}) => oldFetch(url, {...data, credentials: 'include'});

import './css/common.less';
import '../node_modules/materialize-css/dist/css/materialize.min.css';

require("materialize-css");

