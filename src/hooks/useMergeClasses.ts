import {useMemo} from 'react';

// useMergeClasses(...) - uses memo() because nothing can be broken here - we are just merging some <string, string> objects.
export default function useMergeClasses<ClassKeys extends string>(
  ...args: (
    | ((classes: Record<ClassKeys, string>) => Partial<Record<ClassKeys, string>> | undefined)
    | Partial<Record<ClassKeys, string>>
    | undefined
  )[]
): Record<ClassKeys, string> {
  return useMemo(() => {
    return args.reduce((stylesObject: Record<ClassKeys, string>, arg) => {
      return Object.assign(stylesObject, typeof arg === 'function' ? arg(stylesObject) : arg);
    }, {} as Record<ClassKeys, string>);
  }, [args]);
}
