
function getUserActions(date) {
    let url = '/user-actions';
    if (date) {
        url += `?date=${date}`;
    }
    return fetch(url).then(response => response.json())
}