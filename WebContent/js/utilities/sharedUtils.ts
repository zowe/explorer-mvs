/*
* Each name segment (qualifier) is 1 to 8 characters, the first of which must be alphabetic (A to Z) or national (# @ $).
* The remaining seven characters are either alphabetic, numeric (0 - 9), national, a hyphen (-). Name segments are separated by a period (.).
* Data set names must not exceed 44 characters, including all name segments and periods.
* https://www.ibm.com/docs/en/zos/2.1.0?topic=sets-data-set-names
*/
export default function validateName(type, nameToValidate) {
    let regex = '';

    switch (type) {
        case 'dataset':
            regex = /^([A-Z#@$][A-Z0-9#@$-]{0,7}(\.[A-Z#@$][A-Z0-9#@$-]{0,7})*)/g;
            break;
        case 'datasetMember':
            regex = /^([A-Z#@$][A-Z0-9#@$-]{0,7})/g;
            break;
        default: /* renameDatasetMember */
            regex = /^(\([A-Z#@$][A-Z0-9#@$-]{0,7}\))/g;
    }
    return nameToValidate.length <= 44 ? nameToValidate.match(regex) : null;
}
