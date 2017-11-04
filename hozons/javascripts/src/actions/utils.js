
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