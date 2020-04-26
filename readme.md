# array-to-tree-promise

> Convert a plain array of nodes (with pointers to parent nodes) to a nested data structure with promises.

Solves a problem with conversion of retrieved from a database sets of data to a nested data structure (i.e. navigation tree).

## Installation

```bash
npm install array-to-tree-promise
```

## Usage

```js
const arrayToTree = require('array-to-tree-promise');

let dataOne = [
  {
    id: 1,
    name: 'Portfolio',
    parent_id: undefined
  },
  {
    id: 2,
    name: 'Web Development',
    parent_id: 1
  },
  {
    id: 3,
    name: 'Recent Works',
    parent_id: 2
  },
  {
    id: 4,
    name: 'About Me',
    parent_id: undefined
  }
];

arrayToTree(dataOne);

/*
 * Output:
 *
 * Portfolio
 *   Web Development
 *     Recent Works
 * About Me
 */

let dataTwo = [
  {
    _id: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c',
    name: 'Portfolio',
    parent: null
  },
  {
    _id: 'ec666030-7f8f-11e3-ae96-0123456789ab',
    name: 'Web Development',
    parent: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c'
  },
  {
    _id: 'ec66fc70-7f8f-11e3-ae96-000000000000',
    name: 'Recent Works',
    parent: 'ec666030-7f8f-11e3-ae96-0123456789ab'
  },
  {
    _id: '32a4fbed-676d-47f9-a321-cb2f267e2918',
    name: 'About Me',
    parent: null
  }
];

arrayToTree(dataTwo, {
  parentProperty: 'parent',
  customID: '_id'
});

/*
 * Output:
 *
 * Portfolio
 *   Web Development
 *     Recent Works
 * About Me
 */
```

## API

### `arrayToTree(data, [options])`

Convert a plain array of nodes (with pointers to parent nodes) to a a nested data structure.

#### Parameters

- **Array** `data`: An array of data
- **Object** `options`: An object containing the following fields:
  - `parentProperty` (String): A name of a property where a link to a parent node could be found. Default: 'parent_id'.
  - `childrenProperty` (String): A name of a property where children nodes are going to be stored. Default: 'children'.
  - `customID` (String): An unique node identifier. Default: 'id'.

#### Return

- **Array**: Result of transformation

## License

Origin Source-Template @ [Philipp Alferov](https://github.com/alferov)
MIT © [Stefan Jesner](https://github.com/Fischbrot)