/**
 * Dynamic Template Parser Utility
 * 
 * Purpose: Recursively parses template strings containing dynamic placeholders like {{generatorName(arg1, arg2)}}
 * and replaces them with dynamically generated test data (e.g., dynamic timestamps, random IDs, dynamic dates).
 */
import { generators } from '../generators'

/**
 * Parses a single string value to see if it matches a generator function placeholder.
 * Example input: "{{futureDate(5)}}" -> calls generators.futureDate('5')
 * 
 * @param {any} value - The input value to parse.
 * @returns {any} Evaluated dynamic generator result or the original value if no placeholder matches.
 */
const parseDynamicValue = (value) => {
  // Return immediately if value is not a string (numbers, booleans, null, etc.)
  if (typeof value !== 'string')
    return value

  // Regular expression matching mustache-style template placeholders: {{functionName(arg1, arg2)}}
  const regex = /\{\{(\w+)\((.*?)\)\}\}/

  const match = value.match(regex)

  // If the string does not contain {{functionName(...)}}, return original string
  if (!match)
    return value

  // Destructure matched groups: full match, functionName, and raw comma-separated arguments
  const [, functionName, rawArgs] = match

  // Lookup the corresponding generator function in ../generators
  const fn = generators[functionName]

  // If generator function does not exist in registry, fallback to returning raw string
  if (!fn)
    return value

  // Split and trim arguments into an array if args exist, otherwise default to empty array
  const args = rawArgs
    ? rawArgs
        .split(',')
        .map(arg => arg.trim())
    : []

  // Execute generator function with parsed arguments
  return fn(...args)
}

/**
 * Recursively parses any JavaScript data structure (Objects, Arrays, Primitives).
 * Replaces any string matching {{generatorName(...)}} embedded anywhere inside the object tree.
 * 
 * @param {any} obj - The object, array, or primitive data structure to parse.
 * @returns {any} Cleaned object with all dynamic placeholders resolved.
 */
export const parseDynamicObject = (obj) => {
  // Handle Arrays: recursively parse each array element
  if (Array.isArray(obj)) {
    return obj.map(parseDynamicObject)
  }

  // Handle Objects: recursively parse key-value pairs
  if (
    obj !== null &&
    typeof obj === 'object'
  ) {
    const parsed = {}

    Object.keys(obj).forEach((key) => {
      parsed[key] = parseDynamicObject(obj[key])
    })

    return parsed
  }

  // Handle Primitives (Strings, Numbers, Booleans): parse dynamic value
  return parseDynamicValue(obj)
}