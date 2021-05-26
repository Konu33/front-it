export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, unknown>;

export type OverrideClassesProp<
  S extends ((props?: P) => ClassNameMap) | ((props: P) => ClassNameMap),
  P extends object = {}
> =
  | Partial<Record<keyof ReturnType<S>, string | undefined>>
  | ((classes: Record<keyof ReturnType<S>, string>) => Partial<Record<keyof ReturnType<S>, string | undefined>>);
