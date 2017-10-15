import 'whatwg-fetch'
window.jQuery = require("jquery");
window.$ = require("jquery");

window.fetchJsonData = (url, data={}) => 
fetch(url, {...data, credentials: 'include'})
.then(response => response.json())

import './css/common.less';
import '../node_modules/materialize-css/dist/css/materialize.min.css';

require("materialize-css");

