# Internal

> Overview of the code base of object-crumble

This document has been generated automatically by
[baldrick-doc-ts](https://github.com/flarebyte/baldrick-doc-ts)

## Diagram of the dependencies

```mermaid
classDiagram
class `index.ts`
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
class `./model`{
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
class `./type-checker`{
  +isPrimitive()
  +isCrumbleObject()
  +isCrumbleArray()
  +isString()
}
class `./obj-path-utils`{
  +transformFieldValue()
}
`obj-abstractor.ts`-->`./model`
`obj-abstractor.ts`-->`./type-checker`
`obj-mutator.ts`-->`./obj-path-utils`
`obj-mutator.ts`-->`./model`
`obj-path-utils.ts`-->`./model`
`obj-path-utils.ts`-->`./type-checker`
`string-abstractor.ts`-->`./model`
`type-checker.ts`-->`./model`
```
