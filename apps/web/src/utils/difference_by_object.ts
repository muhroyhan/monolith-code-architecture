import { isEqual } from 'es-toolkit'

const differenceByObject = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
): Record<string, any> => {
  const payload: Record<string, any> = {}

  // Loop only through keys present in obj2
  for (const key of Object.keys(obj2)) {
    // If the key is missing in obj1, OR the value has deeply changed
    if (!(key in obj1) || !isEqual(obj1[key], obj2[key])) {
      payload[key] = obj2[key]
    }
  }

  return payload
}

export { differenceByObject }
