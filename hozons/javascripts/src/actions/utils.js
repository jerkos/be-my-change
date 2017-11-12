
export function fillUptag(tags, val='') {
    for (let tag of tags) {
        let value = val ? val + '-' + tag.id : tag.id + '';
        tag.tag_slug = value;

        if (tag.sons && tag.sons.length) {
            fillUptag(tag.sons, value);
        }
    }
}

export function getTagsNumber(actions, result) {
    function plusOne(key) {
        if (!Object.keys(result).includes(key)) {
            result[key] = 0;
        }
        result[key] += 1;
    }

    for (let action of actions) {
        console.log(action);
        const targetTag = action.tag;
        if (!targetTag) {
            return;
        }
        plusOne(targetTag);

        let val = targetTag.split('-');
        val.pop();
        while (val.length !== 0) {
            plusOne(val.join('-'));
            val.pop();
        }
    }
}

export function updateSidebarTags(state) {
    //if (!this.state.tagSlugToCreate) {
    //    return;
    //}
    const newTags = state.tagsToCreate.slice(1).split('/');
    let existingTags = state.tags;
    let currRank = 1;

    let tagsSlug = '';
    const tagsToCreate = [];

    for (const newTag of newTags) {
        const tag = existingTags.find(existingTag => existingTag.name === newTag);

        if (! tag) {
            const obj = {
                name: newTag,
                parent_id: +(tagsSlug.split('-').slice(-1)) || null,
                rank: currRank,
            };
            tagsToCreate.push(obj);
            // existingTags.push(obj);

            // updated later to test ?
            //this.store.updateState({tags: existingTags}, 'SIDEBAR_TO_UPDATE');
        }
        const newId = !tag ? 0 : tag.id;
        tagsSlug = tagsSlug ? (tagsSlug + '-' + newId) : tagsSlug + newId;
        existingTags = tag ? (tag.sons || []) : [];
        currRank ++;
    }
    return {tagsSlug, tagsToCreate, actualizedTags: existingTags};
}