# Object-crumble

![npm](https://img.shields.io/npm/v/object-crumble)

![Build status](https://github.com/flarebyte/object-crumble/actions/workflows/main.yml/badge.svg)

![npm bundle size](https://img.shields.io/bundlephobia/min/object-crumble)

![Dependencies](https://status.david-dm.org/gh/flarebyte/object-crumble.svg)

![npm type definitions](https://img.shields.io/npm/types/object-crumble)

![node-current](https://img.shields.io/node/v/object-crumble)

![NPM](https://img.shields.io/npm/l/object-crumble)

> Creative ways to cook your objects

The main motivation is to boost the writing of unit tests by simplifying the process of creating new data content. This is achieved by mutating programmatically existing data:

- Written in `Typescript`.
- Uses JSON-like object as an input.
- Can be used with any testing framework (Jest, ...)
- A simpler and experimental alternative to property testing. __No need for a schema__. You should still consider, property based testing framework like[fast-check](https://dubzzz.github.io/fast-check.github.com/) that can help find bugs in unexplored code paths.


## Usage

Convert any object to an abstract representation of the object structure

    abstractObject({name: "Jane", homepage: "http://mywebsite.com" })

will return:

    [
        {
        "path": "name",
        "kind": "string",
        },
        {
        "path": "homepage",
        "kind": "url",
        }
    ]

Mutates an object applying a mutation.

    const mutation = {
            path: 'name',
            kind: 'string',
            mutationName: 'string => empty',
          };
          
          mutateObject(mutatorRules)(
            mutation
          )({
            name: 'Picasso',
            firstName: 'Pablo',
          });

will return empty field for `name`:

```
{
    name: '',
    firstName: 'Pablo'
}

```

A more exhaustive documentation of the api is [available](API.md)

## Documentation and links

-   [Code Maintenance](MAINTENANCE.md)
-   [Code Of Conduct](CODE_OF_CONDUCT.md)
-   [Api for object-crumble](API.md)
-   [Contributing](CONTRIBUTING.md)
-   [Contributors](https://github.com/flarebyte/object-crumble/graphs/contributors)
-   [Dependencies](https://github.com/flarebyte/object-crumble/network/dependencies)

## Installation

This package is [ESM only][esm].

    yarn add object-crumble
