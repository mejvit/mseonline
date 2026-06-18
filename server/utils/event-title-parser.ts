export function parseTitle(title: string) {
    const hyphenPosition = title.indexOf('—');
    if (hyphenPosition === -1) {
        return {
            place: null,
            title: title
        };
    }
    return {
        place: title.substring(0, hyphenPosition).trim(),
        title: title.substring(hyphenPosition).replace('—', '').trim()
    };
}