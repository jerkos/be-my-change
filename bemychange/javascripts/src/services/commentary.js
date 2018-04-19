export function getCommentaries(userActionId, isJournal = false) {
    let url = `/commentaries/${userActionId}`;
    if (isJournal) {
        url += '?is_journal=True'
    }
    return fetch(url).then(response => response.json())
}