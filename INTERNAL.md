# Internal

> Overview of the code base of object-crumble

This document has been generated automatically by
[baldrick-doc-ts](https://github.com/flarebyte/baldrick-doc-ts)

## Diagram of the dependencies

```mermaid
classDiagram
class `model.ts`
class `obj-abstractor.ts`{
  - applyRulesToPrimitiveEntry()
  - applyRulesToArrayEntry()
  +abstractObject()
}

class `obj-mutator.ts`{
  - identityRule()
  - stringToMutateValueRule()
  - booleanToMutateValueRule()
  +mutatorRules()
  +mutateObject()
}

class `obj-path-utils.ts`{
  +findFieldValue()
  - getParentPath()
  - getKeyOfPath()
  +pathsOfSelfOrAncestors()
  - copyObjField()
  - splitAlongPath()
  - mergeTwoPathStack()
  - mergeAlongPath()
  +setFieldValue()
  +transformFieldValue()
}
class `obj-utils.ts`{
  +cloneValue()
}
class `string-abstractor.ts`{
  +someUrl()
  +anyOfString()
}
class `type-checker.ts`{
  +isPrimitive()
  +isString()
  +isCrumbleArray()
  +isCrumbleObject()
}
class `./model.js`{
  +CrumbleValue()
  +CrumblePrimitive()
  +CrumbleObject()
  +StringAbstractionRule()
  +MutateValueRule()
  +MutateStringRule()
  +CrumbleFieldMutation()
  +OakObjApplicableMutation()
  +CrumbleAbstractedValue()
}
class `./type-checker.js`{
  +isPrimitive()
  +isCrumbleObject()
  +isCrumbleArray()
  +isString()
}
class `./obj-path-utils.js`{
  +transformFieldValue()
}
`obj-abstractor.ts`-->`./model.js`
`obj-abstractor.ts`-->`./type-checker.js`
`obj-mutator.ts`-->`./obj-path-utils.js`
`obj-mutator.ts`-->`./model.js`
`obj-path-utils.ts`-->`./model.js`
`obj-path-utils.ts`-->`./type-checker.js`
`string-abstractor.ts`-->`./model.js`
`type-checker.ts`-->`./model.js`
```
