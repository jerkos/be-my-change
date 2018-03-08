export function allTags() {
    return fetch('/tags/all').then(response => response.json())
}