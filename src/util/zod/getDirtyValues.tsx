import {FieldValues} from 'react-hook-form';

export function getDirtyValues(values: any, dirtyFields: any): any {
  if (!dirtyFields) return {};

  return Object.entries(dirtyFields).reduce((acc, [key, isDirty]) => {
    if (isDirty === true) {
      acc[key] = values[key]; // ✅ use from `values`
    } else if (typeof isDirty === 'object' && values[key] !== undefined) {
      const nested = getDirtyValues(values[key], isDirty);
      if (Object.keys(nested).length > 0) {
        acc[key] = nested;
      }
    }
    return acc;
  }, {} as any);
}
