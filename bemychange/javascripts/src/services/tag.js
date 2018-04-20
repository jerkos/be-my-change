export function allTags() {
    return fetch('/tags/all').then(response => response.json())
}

export function changeTags(actionId, body, tagMappingId) {
    let url = `/tags/change-tag/${actionId}`;
    if (tagMappingId) {
        url += `&tag_mapping_id=${tagMappingId}`;
    }
    return fetch(url,
        {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(response => response.json());
}

export function deleteTag(tagId) {
    return fetch(`/tag/${tagId}`, {
        method: 'DELETE'
    }).then(response => response.json());
}

export function createTag(body) {
    return fetch(`/tags/`, {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => response.json());
}

export function updateTag(tagId, body) {
    return fetch(`/tags/${tagId}`, {
        method: 'PUT',
        body: JSON.stringify(body)
    }).then(response => response.json());
}