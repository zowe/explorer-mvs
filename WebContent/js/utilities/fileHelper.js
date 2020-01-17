
export function parseFileName(file) {
    if (file === '') {
        return { DSName: '', DSMember: '' };
    }

    let end = file.indexOf('(');
    if (end === -1) {
        end = file.length;
    }
    return { DSName: file.substring(0, end),
        DSMember: file.substring(file.indexOf('(') + 1, file.indexOf(')')) };
}

export function hasMember(file) {
    return file !== undefined && file.indexOf('(') > 1;
}

export function updateDSName(file, newDSName) {
    return `${newDSName}(${parseFileName(file).DSMember})`;
}
