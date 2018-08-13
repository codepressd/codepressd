import * as _ from 'lodash';

/**
 * Camelizes a string
 */
export const camelize = (str: string) => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        })
        .replace(/\s+/g, "");
};

/**
 * Like `map`, but iterates over the fields in an object as if it were a dictionary. All fields are assumed to be of a single type,
 * and the type system isn't strong enough to help us here by giving a compiler error if that isn't true.
 * The function optionally passes a second parameter with the field names / keys; only the values themselves are mapped over though.
 */
export const mapObject = <Output>(o: object, func: (a: any, fieldName: string) => any): Output => {
    const obj = _.cloneDeep(o) as any;
    for (const key of Object.keys(obj)) {
        obj[key] = func(obj[key], key);
    }
    return obj as Output;
};


export const mapOver4 = <A, B, C, D, E>(
    arrayOfQuads: [A, B, C, D][],
    func: (firstValue: A) => E,
): [E, B, C, D][] => {
    return _.map(arrayOfQuads, ([a, b, c, d]) => [func(a), b, c, d]) as [E, B, C, D][];
};