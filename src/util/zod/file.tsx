import { z, ZodEffects, ZodNumber, ZodObject, ZodOptional, ZodString } from 'zod';

// ----------------------
// Custom File Class
// ----------------------

export class File {
  public uri: string;
  public name: string;
  public size: number;
  public type?: string;
  public mediaCode?: string;

  constructor({ name, type, size, uri, mediaCode }: { name: string; type: string; size: number; uri: string; mediaCode?: string }) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.uri = uri;
    this.mediaCode = mediaCode;
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

  toURL() {
    return this.uri
  }
}



// ----------------------
// Schema Builder
// ----------------------

class FileSchemaBuilder {
  private maxSize = 5 * 1024 * 1024;
  private maxFilesCount: number | null = 1;
  private mimeType: string[] = [];
  private extensionPattern: RegExp | null = null;

  setMaxSize(size: number) {
    this.maxSize = size;
    return this;
  }

  mime(types: string[]) {
    this.mimeType = types;
    return this;
  }

  maxFiles(count: number) {
    this.maxFilesCount = count;
    return this;
  }

  patternExtension(regex: RegExp) {
    this.extensionPattern = regex;
    return this;
  }

  private getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
  }

  build() {
    const baseFileSchema = z
      .instanceof(File)
      .refine((file) => file.size <= this.maxSize, {
        message: `File size must be less than ${this.maxSize / 1024 / 1024}MB`,
      })
      .refine((file) => {
        return (
          this.mimeType.length === 0 || (file.type && this.mimeType.includes(file.type))
        );
      }, {
        message: `File type must be one of: ${this.mimeType.join(', ')}`,
      })
      .refine((file) => {
        if (!this.extensionPattern) return true;
        const ext = this.getFileExtension(file.name);
        return this.extensionPattern.test(ext);
      }, {
        message: `File extension does not match the required pattern`,
      });

    if (this.maxFilesCount && this.maxFilesCount > 1) {
      return z.array(baseFileSchema).refine((files) => files.length <= this.maxFilesCount!, {
        message: `You can upload up to ${this.maxFiles} files.`,
      });
    }

    return baseFileSchema;
  }
}

export const fileSchema = () => new FileSchemaBuilder();

