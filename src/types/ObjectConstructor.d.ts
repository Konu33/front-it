import ObjectKeys from '../utils/object-keys';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}
