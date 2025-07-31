// Helper type: deeply remove __typename
export type stripTypename<T> = T extends (infer U)[]
  ? stripTypename<U>[]
  : T extends object
    ? {
        [K in keyof T as K extends '__typename' ? never : K]: stripTypename<T[K]>
      }
    : T;

// Function to remove __typename from any input
export function stripTypename<T>(input: T): stripTypename<T> {
  if (Array.isArray(input)) {
    return input.map(stripTypename) as stripTypename<T>;
  }

  if (input !== null && typeof input === 'object') {
    const result = {} as any;
    for (const key in input) {
      if (key !== '__typename' && Object.prototype.hasOwnProperty.call(input, key)) {
        result[key] = stripTypename((input as any)[key]);
      }
    }
    return result as stripTypename<T>;
  }

  return input as stripTypename<T>;
}
