import 'whatwg-fetch'

window.jQuery = require("jquery");
window.$ = require("jquery");

window.fetchJsonData = (url, data={}) => fetch(url, {...data, credentials: 'include'}).then(response => response.json())

require("materialize-css");