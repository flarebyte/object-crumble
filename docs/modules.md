[object-crumble](README.md) / Exports

# object-crumble

## Table of contents

### Variables

- [mutatorRules](modules.md#mutatorrules)

### Other Functions

- [abstractObject](modules.md#abstractobject)
- [mutateObject](modules.md#mutateobject)

### String abstractor Functions

- [anyOfString](modules.md#anyofstring)
- [someUrl](modules.md#someurl)

## Variables

### mutatorRules

• **mutatorRules**: `CrumbleFieldMutation`[]

Basic mutator rules that can be used out of the box

#### Defined in

[obj-mutator.ts:38](https://github.com/flarebyte/object-crumble/blob/94df795/src/obj-mutator.ts#L38)

## Other Functions

### abstractObject

▸ `Const` **abstractObject**(`rules`, `prefix?`): (`value`: `CrumbleObject`) => `CrumbleAbstractedValue`[]

Convert any object to an abstract representation of the object structure
```
abstractObject({name: "Jane"})
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `rules` | `StringAbstractionRule`[] | `undefined` | a list of rules used to infer the kind of value of each property in the object |
| `prefix` | `string` | `''` | path of the object in the enclosing object, or empty if none |

#### Returns

`fn`

an array of `CrumbleAbstractedValue` representing each `path` `kind` pair.

▸ (`value`): `CrumbleAbstractedValue`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `CrumbleObject` |

##### Returns

`CrumbleAbstractedValue`[]

#### Defined in

[obj-abstractor.ts:58](https://github.com/flarebyte/object-crumble/blob/94df795/src/obj-abstractor.ts#L58)

___

### mutateObject

▸ `Const` **mutateObject**(`rules`): (`mutation`: `OakObjApplicableMutation`) => (`content`: `CrumbleObject`) => `CrumbleObject`

Mutates an object applying a list of mutation.
We are using currying to provide the list of mutations rules.
Only a single mutation is applied to facilitate the studying of the impact.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rules` | `CrumbleFieldMutation`[] | a list of rules used to infer the kind of value of each property in the object |

#### Returns

`fn`

a `CrumbleObject` representing most javascript objects

▸ (`mutation`): (`content`: `CrumbleObject`) => `CrumbleObject`

##### Parameters

| Name | Type |
| :------ | :------ |
| `mutation` | `OakObjApplicableMutation` |

##### Returns

`fn`

▸ (`content`): `CrumbleObject`

##### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `CrumbleObject` |

##### Returns

`CrumbleObject`

#### Defined in

[obj-mutator.ts:104](https://github.com/flarebyte/object-crumble/blob/94df795/src/obj-mutator.ts#L104)

___

## String abstractor Functions

### anyOfString

▸ `Const` **anyOfString**(`name`, `options`): (`value`: `string`) => `string` \| ``false``

Detect a a string from a given list of string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the keyword to return if the detection happens |
| `options` | `string`[] | a list of string that would satisfy the detection |

#### Returns

`fn`

the `name` keyword or false

▸ (`value`): `string` \| ``false``

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

##### Returns

`string` \| ``false``

#### Defined in

[string-abstractor.ts:19](https://github.com/flarebyte/object-crumble/blob/94df795/src/string-abstractor.ts#L19)

___

### someUrl

▸ `Const` **someUrl**(`value`): `string` \| ``false``

Detect an url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the text to check |

#### Returns

`string` \| ``false``

the `url` keyword or false

#### Defined in

[string-abstractor.ts:9](https://github.com/flarebyte/object-crumble/blob/94df795/src/string-abstractor.ts#L9)
