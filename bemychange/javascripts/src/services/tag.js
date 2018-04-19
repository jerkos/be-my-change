export function allTags() {
    return fetch('/tags/all').then(response => response.json())
}

export function changeTags(actionId, body) {
    return fetch(`/tags/change-tag/${actionId}`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(response => response.json());
}