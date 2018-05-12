export function gatherInformations(url) {
    const fullUrl = `/gather-informations?url=${url}`;
    return fetch(fullUrl).then(response => response.json());
}