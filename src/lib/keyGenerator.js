export function generateUniqueKey(urls, backgroundNum, pattern) {
    const names = [];
    for(let url of urls) {
        const tempUrl = url.split('/');
        tempUrl.splice(0, 4);
        const fileName = tempUrl.join('').replace('.svg', '');
        names.push(fileName);
    }
    names.push(backgroundNum);
    names.push(pattern);
    return names.join('');
}