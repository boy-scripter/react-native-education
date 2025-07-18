import {z, ZodObject, ZodRawShape} from 'zod';

export class File {
  name: string;
  type: string;
  size: number;
  uri?: string;

  constructor(params: {name: string; type: string; size: number; uri: string}) {
    this.name = params.name;
    this.type = params.type;
    this.size = params.size;
    this.uri = params.uri;
  }
  isImage(): boolean {
    return this.type.startsWith('image/');
  }

  getExtension(): string | null {
    const match = this.name.match(/\.(\w+)$/);
    return match ? match[1].toLowerCase() : null;
  }

  getSizeInMB(): number {
    return this.size / 1024 / 1024;
  }
}

class FileConstraints {
  _type: string[] | null;
  _size: number;
  _pattern: RegExp | null;

  constructor() {
    this._type = ['image/jpeg', 'image/png']; // defaults
    this._size = 5 * 1024 * 1024; // default 5MB
    this._pattern = null; // default 5MB
  }
}

class FileSchemaBuilder {
  private readonly constraints: FileConstraints;

  constructor(constraints?: FileConstraints) {
    this.constraints = new FileConstraints();
  }

  type(acceptedTypes: string[]): this {
    this.constraints._type = acceptedTypes;
    return this;
  }

  pattern(regex: RegExp): this {
    this.constraints._pattern = new RegExp(regex);
    return this;
  }

  size(maxBytes: number): this {
    this.constraints._size = maxBytes;
    return this;
  }

  array() {
    return z.array(this.single());
  }

  single(): ZodObject<ZodRawShape> {
    return z.object({
      name: z.string().min(1, 'File name is required'),
      type: z.string().refine(
        val => {
          const typeMatch = this.constraints._type ? this.constraints._type.includes(val) : true;
          const patternMatch = this.constraints._pattern ? this.constraints._pattern.test(val) : true;
          console.log(typeMatch,patternMatch)
          return typeMatch && patternMatch ;
        },
        {message: `Unsupported file type`},
      ),
      size: z.number().max(this.constraints._size, {message: `File must be under ${this.constraints._size / 1024 / 1024}MB`}),
      uri: z.string().url('Unable to read files').optional(),
    })
  }
}

export const fileSchema = () => new FileSchemaBuilder();
