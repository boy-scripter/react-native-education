export function getDirtyValues(values: any, dirtyFields: any): any {
  const dirtyValues: any = {};

  for (const key in dirtyFields) {
    if (dirtyFields[key] === true) {
      dirtyValues[key] = values[key];
    } else if (typeof dirtyFields[key] === 'object' && values[key]) {
      // Recursively get nested dirty values
      dirtyValues[key] = getDirtyValues(values[key], dirtyFields[key]);
    }
  }

  return dirtyValues;
}
