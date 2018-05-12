
export function getUserActions(date) {
    let url = '/user-actions';
    if (date) {
        url += `?date=${date}`;
    }
    return fetch(url).then(response => response.json())
}

export function createUserAction(body) {
    return fetch('/user-actions/', {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => response.json());
}

export function updateUserAction(body) {
    return fetch('/user-actions/', {
        method: 'PUT',
        body: JSON.stringify(body)
    }).then(response => response.json())
}

export function realiseAction(userActionId) {
    return fetch(`/user-actions/${userActionId}/done`)
        .then(response => response.json());
}

export function deleteAction(userActionId) {
    return fetch(`/user-actions/${userActionId}`, {
        method: 'DELETE'
    }).then(response => response.json());
}

export function getUserActionParticipants(userActionId) {
    return fetch(`/user-actions/${userActionId}/participants`)
        .then(response => response.json())
}

export function likeAction(actionId) {
    return fetch(`/user-actions/${actionId}/like`)
        .then(response => response.json())
}