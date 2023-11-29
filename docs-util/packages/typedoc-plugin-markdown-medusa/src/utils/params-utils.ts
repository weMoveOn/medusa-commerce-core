import { ReflectionKind } from "typedoc"
import { ReflectionParameterType } from "../types"

export function flattenParams(
  current: ReflectionParameterType
): ReflectionParameterType[] {
  if (!current.type || !("declaration" in current.type)) {
    return []
  }
  return (
    current.type?.declaration?.children?.reduce(
      (acc: ReflectionParameterType[], child: ReflectionParameterType) => {
        const childObj = {
          ...child,
          name: `${current.name}.${child.name}`,
        } as ReflectionParameterType
        return parseParams(childObj, acc)
      },
      []
    ) || []
  )
}

export function parseParams(
  current: ReflectionParameterType,
  acc: ReflectionParameterType[]
): ReflectionParameterType[] {
  const shouldFlatten =
    current.type &&
    "declaration" in current.type &&
    current.type?.declaration?.kind === ReflectionKind.TypeLiteral &&
    current.type?.declaration?.children
  return shouldFlatten
    ? [...acc, current, ...flattenParams(current)]
    : [...acc, current]
}
