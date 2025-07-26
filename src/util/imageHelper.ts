import { File } from "./zod";


const isValidUrl = (value: string): boolean => {
  return /^https?:\/\//i.test(value);
};

export function imageOverloading(finalSource?: string | number | File) {
  let imageSource: any = undefined;

  if (typeof finalSource === 'string' && isValidUrl(finalSource)) {
    imageSource = { uri: finalSource };
  } else if (typeof finalSource === 'number') {
    imageSource = finalSource;
  } else if (typeof finalSource === 'object' && finalSource !== null && 'uri' in finalSource && typeof finalSource.uri === 'string') {
    imageSource = { uri: finalSource.uri };
  }

  return imageSource
}
