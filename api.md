# API of object-crumble

> List of functions and variables for `object-crumble`

__Functions:__

* [abstractObject](API.md#abstractObject)
* [anyOfString](API.md#anyOfString)
* [mutateObject](API.md#mutateObject)
* [someUrl](API.md#someUrl)


__Variables:__

* [mutatorRules](API.md#mutatorRules)

## abstractObject

⎔ Convert any object to an abstract representation of the object structure
```
abstractObject({name: "Jane"})
```

### Parameters

* rules: Array of `StringAbstractionRule`: a list of rules used to infer the kind of value of each property in the object

* prefix: `string`: path of the object in the enclosing object, or empty if none

### Returns

an array of `CrumbleAbstractedValue` representing each `path` `kind` pair.


See [obj-abstractor.ts - L58](https://github.com/flarebyte/object-crumble/blob/main/src/obj-abstractor.ts#L58)

## anyOfString

⎔ Detect a a string from a given list of string

### Parameters

* name: `string`: the keyword to return if the detection happens

* options: Array of `string`: a list of string that would satisfy the detection

### Returns

the `name` keyword or false


See [string-abstractor.ts - L19](https://github.com/flarebyte/object-crumble/blob/main/src/string-abstractor.ts#L19)

## mutateObject

⎔ Mutates an object applying a list of mutation.
We are using currying to provide the list of mutations rules.
Only a single mutation is applied to facilitate the studying of the impact.

### Parameters

* rules: Array of `CrumbleFieldMutation`: a list of rules used to infer the kind of value of each property in the object

### Returns

a `CrumbleObject` representing most javascript objects


See [obj-mutator.ts - L104](https://github.com/flarebyte/object-crumble/blob/main/src/obj-mutator.ts#L104)

## someUrl

⎔ Detect an url

### Parameters

* value: `string`: the text to check

### Returns

the `url` keyword or false


See [string-abstractor.ts - L9](https://github.com/flarebyte/object-crumble/blob/main/src/string-abstractor.ts#L9)

## mutatorRules

Array of `CrumbleFieldMutation`

Basic mutator rules that can be used out of the box

See [obj-mutator.ts - L38](https://github.com/flarebyte/object-crumble/blob/main/src/obj-mutator.ts#L38)