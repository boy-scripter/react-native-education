import {z, ZodEffects, ZodNumber, ZodObject, ZodOptional, ZodString} from 'zod';

// ----------------------
// Custom File Class
// ----------------------

export class File {
  name: string;
  type: string;
  size: number;
  uri?: string;
  metadata?: Record<string, any>;

  constructor(params: {name: string; type: string; size: number; uri: string; metadata?: Record<string, any>}) {
    this.name = params.name;
    this.type = params.type;
    this.size = params.size;
    this.uri = params.uri;
    this.metadata = params.metadata;
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

  toJSON() {
    return {
      name: this.name,
      type: this.type,
      size: this.size,
      uri: this.uri,
    };
  }
}

// ----------------------
// Constraints Class
// ----------------------

class FileConstraints {
  _type: string[] | null;
  _size: number;
  _pattern: RegExp | null;

  constructor() {
    this._type = ['image/jpeg', 'image/png']; // default types
    this._size = 5 * 1024 * 1024; // default 5MB
    this._pattern = null;
  }
}

// ----------------------
// Schema Builder
// ----------------------

class FileSchemaBuilder {
  private readonly constraints: FileConstraints;

  constructor() {
    this.constraints = new FileConstraints();
  }

  type(acceptedTypes: string[]): this {
    this.constraints._type = acceptedTypes;
    return this;
  }

  pattern(regex: RegExp): this {
    this.constraints._pattern = regex;
    return this;
  }

  size(maxBytes: number): this {
    this.constraints._size = maxBytes;
    return this;
  }

  array() {
    return z.array(this.single());
  }

  single(): ZodObject<{
    name: ZodString;
    type: ZodEffects<ZodString, string, string>;
    size: ZodNumber;
    uri: ZodOptional<ZodString>;
  }> {
    return z.object({
      name: z.string().min(1, 'File name is required'),
      type: z.string().refine(
        val => {
          const typeMatch = this.constraints._type ? this.constraints._type.includes(val) : true;

          const patternMatch = this.constraints._pattern ? this.constraints._pattern.test(val) : true;

          return typeMatch && patternMatch;
        },
        {message: `Unsupported file type`},
      ),
      size: z.number().max(this.constraints._size, {
        message: `File must be under ${this.constraints._size / 1024 / 1024}MB`,
      }),
      uri: z.string().url('Invalid file URI').optional(),
    });
  }
}

// ----------------------
// Exported Factory
// ----------------------

export const fileSchema = () => new FileSchemaBuilder();
