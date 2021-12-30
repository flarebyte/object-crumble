# API of object-crumble

> API of object-crumble



## abstractObject

See [obj-abstractor.ts - L58](src/obj-abstractor.ts)

Convert any object to an abstract representation of the object structure
```
abstractObject({name: "Jane"})
```

### Parameters

* rules: Array of `StringAbstractionRule`: a list of rules used to infer the kind of value of each property in the object

* prefix: `string`: path of the object in the enclosing object, or empty if none

### Returns

an array of `CrumbleAbstractedValue` representing each `path` `kind` pair.


## anyOfString

See [string-abstractor.ts - L19](src/string-abstractor.ts)

Detect a a string from a given list of string

### Parameters

* name: `string`: the keyword to return if the detection happens

* options: Array of `string`: a list of string that would satisfy the detection

### Returns

the `name` keyword or false


## mutateObject

See [obj-mutator.ts - L104](src/obj-mutator.ts)

Mutates an object applying a list of mutation.
We are using currying to provide the list of mutations rules.
Only a single mutation is applied to facilitate the studying of the impact.

### Parameters

* rules: Array of `CrumbleFieldMutation`: a list of rules used to infer the kind of value of each property in the object

### Returns

a `CrumbleObject` representing most javascript objects


## someUrl

See [string-abstractor.ts - L9](src/string-abstractor.ts)

Detect an url

### Parameters

* value: `string`: the text to check

### Returns

the `url` keyword or false
