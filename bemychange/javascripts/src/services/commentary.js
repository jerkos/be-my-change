export function getCommentaries(userActionId, isJournal = false) {
    let url = `/commentaries/${userActionId}`;
    if (isJournal) {
        url += '?is_journal=True'
    }
    return fetch(url).then(response => response.json())
}

export function saveCommentary(commentaryId, body) {
    const url = `/commentaries/${commentaryId}`;
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => response.json());
}

export function updateCommentary(commentaryId, body) {
    const url = `/commentaries/${commentaryId}`;
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body)
    }).then(response => response.json());
}
